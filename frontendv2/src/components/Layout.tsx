import React, { useEffect, useState } from "react"
import "src/resets.css"
import "src/globals.css"
import { c, s } from "src/styles"
import { useStyletron } from "styletron-react"
import Helmet from "react-helmet"
import FontFaceObserver from "fontfaceobserver"
import { FontsLoadedContext } from "src/components/FontsLoadedContext"

const Layout = ({ children }) => {
  const [css] = useStyletron()
  const [fontsLoaded, setFontsLoaded] = useState(0)
  let fonts = [
    new FontFaceObserver("Rubik", { weight: 400 }),
    new FontFaceObserver("Rubik", { weight: 300 }),
    new FontFaceObserver("Rubik", { weight: 500 }),
    new FontFaceObserver("Rubik", { weight: 600 }),
  ]
  useEffect(() => {
    Promise.all(fonts.map(f => f.load())).then(
      f => {
        console.log("f:", f)
        console.log("FONTS LOADED")
        setFontsLoaded(fontsLoaded + 1)
      },
      () => {
        console.log("FONTS FAILED TO LOAD")
        // setFontsLoaded(fontsLoaded)
      }
    )
  }, [])

  return (
    <FontsLoadedContext.Provider value={fontsLoaded}>
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
    </FontsLoadedContext.Provider>
  )
}

export default Layout
