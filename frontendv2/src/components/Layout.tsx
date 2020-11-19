import React from "react"
import "src/resets.css"
import "src/globals.css"
import { c, s } from "src/styles"
import { useStyletron } from "styletron-react"
import Helmet from "react-helmet"

const Layout = ({ children }) => {
  const [css] = useStyletron()
  return (
    <div className={css(c(s.lineHeight(1.4)))}>
      <Helmet>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      {children}
    </div>
  )
}

export default Layout
