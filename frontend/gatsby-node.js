exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  if (page.path.match(/^\/connectionPage\//)) {
    page.matchPath = "/*"
    createPage(page)
  }
}
