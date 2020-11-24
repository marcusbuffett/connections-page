import React from "react"
import ConnectionPage from "src/components/ConnectionPage"
import CreationPage from "src/components/CreationPage"
import { Router } from "@reach/router"

export default () => {
  return (
    <Router>
      <ConnectionPage path="/:id" />
    </Router>
  )
}
