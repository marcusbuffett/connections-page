#![feature(decl_macro)]
#![feature(try_trait)]

#[macro_use]
extern crate rocket;

use reqwest::header::AUTHORIZATION;
use rocket::State;
use rocket::{http::Status, response::Responder};
use rocket_contrib::json::Json;
use serde::{Deserialize, Serialize};
use sled_extensions::bincode::Tree;
use sled_extensions::DbExt;
use std::env;
use std::option::NoneError;

#[derive(thiserror::Error, Debug)]
pub enum ServerError {
    #[error("reqwest error")]
    ReqwestError(#[from] reqwest::Error),
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
            ServerError::ReqwestError(_) => Err(Status::InternalServerError),
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
    channels: Channels,
}

#[derive(Deserialize, Serialize, Clone)]
struct PageRequest {
    first_name: String,
    interests: Vec<String>,
    twitter_screen_name: String,
}
#[derive(Deserialize, Serialize, Clone)]
struct Channels {
    twitter: Twitter,
}

#[derive(Deserialize, Serialize, Clone)]
struct Twitter {
    user_id: u64,
    screen_name: String,
}

type EndpointResult<T> = Result<T, ServerError>;

#[get("/pages/<page_id>")]
fn get_page(db: State<Database>, page_id: String) -> EndpointResult<Json<Page>> {
    Ok(Json(db.pages.get(page_id.as_bytes())??))
}

#[post("/pages", data = "<page_request>")]
fn create_page(db: State<Database>, page_request: Json<PageRequest>) -> EndpointResult<Json<Page>> {
    let page = Page {
        first_name: page_request.first_name.clone(),
        interests: page_request.interests.clone(),
        channels: Channels {
            twitter: Twitter {
                user_id: fetch_twitter_id(page_request.twitter_screen_name.clone())?,
                screen_name: page_request.twitter_screen_name.clone(),
            },
        },
    };
    db.pages
        .insert(page.first_name.as_bytes(), page.clone())
        .unwrap();
    Ok(Json(page))
}

#[derive(Debug, Serialize, Deserialize)]
struct TwitterUser {
    id: u64,
    screen_name: String,
}

fn fetch_twitter_id(username: String) -> Result<u64, ServerError> {
    let body = reqwest::blocking::Client::new()
        .get(&format!(
            "https://api.twitter.com/1.1/users/lookup.json?screen_name={}",
            username
        ))
        .header(
            AUTHORIZATION,
            env::var("TWITTER_BEARER_TOKEN").expect("Should have twitter token"),
        )
        .send()?
        .json::<Vec<TwitterUser>>()?;
    if let Some(user) = body.first() {
        Ok(user.id)
    } else {
        Err(ServerError::NotFound)
    }
}

#[test]
fn test_fetch_twitter_id() {
    dotenv::from_path("prod.env").ok();
    assert_eq!(
        fetch_twitter_id("marcusbuffett".to_owned()).expect("Should not error"),
        823743974
    );
}

fn main() -> Result<(), ServerError> {
    let db = sled_extensions::Config::default()
        .path("./sled_data")
        .open()
        .expect("Failed to open sled db");
    let db = Database {
        pages: db
            .open_bincode_tree("pagesv6")
            .expect("failed to open pages tree"),
    };
    dotenv::from_path("prod.env").ok();
    db.pages.insert(
        b"marcus",
        Page {
            first_name: "Marcus".to_string(),
            interests: vec!["programming", "philosophy", "digital painting"]
                .iter()
                .map(|s| s.to_string())
                .collect(),
            channels: Channels {
                twitter: Twitter {
                    user_id: 823743974,
                    screen_name: "marcusbuffett".to_owned(),
                },
            },
        },
    )?;
    rocket::ignite()
        .manage(db)
        .mount("/api/", routes![get_page, create_page])
        .launch();
    Ok(())
}
