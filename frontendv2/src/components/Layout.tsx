import React, { useEffect, useState } from "react"
import "src/resets.css"
import "src/globals.css"
import { c, s } from "src/styles"
import { useStyletron } from "styletron-react"
import Helmet from "react-helmet"
import FontFaceObserver from "fontfaceobserver"
import { FontsLoadedContext } from "src/components/FontsLoadedContext"
import { useStyletronChain } from "src/utils/useStyletronChain"
import {
  backgroundColor,
  containerStyles,
  headerStyles,
  offWhite,
  purpleHue,
} from "src/app_styles"
import { useIsMobile } from "src/utils/useIsMobile"
import Spacer from "src/components/Spacer"

const Layout = ({
  header,
  body,
  showFooter,
}: {
  header: any
  body: any
  showFooter: boolean
}) => {
  const css = useStyletronChain()
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
        setFontsLoaded(fontsLoaded + 1)
      },
      () => {
        console.log("FONTS FAILED TO LOAD")
        // setFontsLoaded(fontsLoaded)
      }
    )
  }, [])
  const isMobile = useIsMobile()

  return (
    <FontsLoadedContext.Provider value={fontsLoaded}>
      <div className={css(s.lineHeight(1.4))}>
        <Helmet>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        <div
          className={css(
            s.fullWidth,
            s.pageHeight,
            s.column,
            s.alignCenter,
            s.bg(backgroundColor)
          )}
        >
          <Spacer height={128} />
          <div className={css(headerStyles(isMobile))}>
            <div className={css(s.textAlign("center"))}>{header}</div>
          </div>
          <Spacer height={72} />
          <div
            className={css(
              // s.shadow(0, -8, 30, 0, s.hsl(0, 0, 0, 20)),
              s.flex,
              s.center,
              s.alignStart,
              s.fullWidth,
              s.grow
            )}
          >
            <div
              className={css(
                s.width("min(calc(100vw - 48px), 700px)"),
                s.fg(offWhite),
                s.fontSize(isMobile ? 16 : 20),
                s.column,
                s.py(isMobile ? 48 : 72)
              )}
            >
              {body}
            </div>
          </div>
          {showFooter && (
            <div
              className={css(
                c(
                  s.fullWidth,
                  s.bg(s.hsl(purpleHue, 50, 5)),
                  s.row,
                  s.fontSize(12),
                  s.py(12),
                  s.px(12),
                  s.alignStart,
                  s.column,
                  s.justifyCenter,
                  s.weightRegular,
                  s.fg(s.hsl(purpleHue, 20, 85)),
                  s.center
                )
              )}
            >
              <span className={css(containerStyles, s.textAlign("center"))}>
                <span className={css()}>
                  Learn more about this project here
                </span>
                , or{" "}
                <span
                  className={css(
                    c(s.weightSemiBold, s.borderBottom(`1px solid ${offWhite}`))
                  )}
                >
                  create your own page
                </span>
                .
              </span>
            </div>
          )}
        </div>
      </div>
    </FontsLoadedContext.Provider>
  )
}

export default Layout
