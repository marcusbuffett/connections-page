#![feature(decl_macro)]
#![feature(try_trait)]

#[macro_use]
extern crate rocket;

use rocket::State;
use rocket::{http::Status, response::Responder};
use rocket_contrib::json::Json;
use serde::{Deserialize, Serialize};
use sled_extensions::bincode::Tree;
use sled_extensions::DbExt;
use std::option::NoneError;

#[derive(thiserror::Error, Debug)]
pub enum ServerError {
    #[error("sled db error")]
    SledError(#[from] sled_extensions::Error),
    #[error("resource not found")]
    NotFound,
}

impl From<NoneError> for ServerError {
    fn from(_: NoneError) -> Self {
        ServerError::NotFound
    }
}

impl<'a> Responder<'a> for ServerError {
    fn respond_to(self, _: &rocket::Request) -> Result<rocket::Response<'a>, Status> {
        match self {
            Self::SledError(_) => Err(Status::InternalServerError),
            Self::NotFound => Err(Status::NotFound),
        }
    }
}

struct Database {
    pages: Tree<Page>,
}

#[derive(Deserialize, Serialize, Clone)]
struct Page {
    first_name: String,
    interests: Vec<String>,
    channels: Vec<Channel>,
}

#[derive(Deserialize, Serialize, Clone)]
enum Channel {
    Twitter,
    SMS,
}

type EndpointResult<T> = Result<T, ServerError>;

#[get("/pages/<page_id>")]
fn get_page(db: State<Database>, page_id: String) -> EndpointResult<Json<Page>> {
    Ok(Json(db.pages.get(page_id.as_bytes())??))
}

#[post("/pages", data = "<page>")]
fn create_page(db: State<Database>, page: Json<Page>) -> EndpointResult<Json<Page>> {
    db.pages
        .insert(page.first_name.as_bytes(), page.clone())
        .unwrap();
    Ok(Json(page.0))
}

fn main() -> Result<(), ServerError> {
    let db = sled_extensions::Config::default()
        .path("./sled_data")
        .open()
        .expect("Failed to open sled db");
    let db = Database {
        pages: db
            .open_bincode_tree("pagesv5")
            .expect("failed to open pages tree"),
    };
    db.pages.insert(
        b"Marcus",
        Page {
            first_name: "".to_string(),
            interests: vec!["programming", "philosophy", "digital painting"]
                .iter()
                .map(|s| s.to_string())
                .collect(),
            channels: vec![],
        },
    )?;
    rocket::ignite()
        .manage(db)
        .mount("/api/", routes![get_page, create_page])
        .launch();
    Ok(())
}
