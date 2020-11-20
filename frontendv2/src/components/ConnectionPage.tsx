import React, { useState } from "react"
import { Link } from "gatsby"

import { useStyletron } from "styletron-react"
import { c, s } from "src/styles"
import { editColor, purpleHue } from "src/app_styles"
import Layout from "src/components/Layout"
import Spacer from "src/components/Spacer"
import AutoInput from "src/components/AutoInput"
import { useImmer } from "use-immer"
import { intersperse } from "src/utils/intersperse"
import { useIsMobile } from "src/utils/useIsMobile"
import DashedLine from "src/components/DashedLine"

const ConnectionPage = ({ creation }: { creation?: boolean }) => {
  const [css] = useStyletron()
  const bodyStyling = c(s.fontFamily('"Rubik", sans-serif'))
  const offWhite = s.hsl(purpleHue, 50, 95)
  // const { name, channels } = {
  // name: "Marcus",
  // channels: [],
  // }
  const [name, setName] = useState("Marcus")
  const [interests, setInterests] = useImmer([
    "programming",
    "stoicism",
    "rationality",
    "speedcubing",
    "digital painting",
  ])

  const isMobile = useIsMobile()
  const inlineStyles = c(s.whitespace("pre-wrap"))
  const paragraphSpacer = <Spacer height={24} />
  return (
    <Layout>
      <div
        className={css(
          c(
            s.fullWidth,
            s.pageHeight,
            s.bg(s.hsl(purpleHue, 25, 50)),
            s.column,
            s.alignCenter
          )
        )}
      >
        <div
          className={css(
            c(
              s.fullWidth,
              s.bg(s.hsl(purpleHue, 50, 85)),
              s.center,
              s.height(isMobile ? 200 : 300),
              s.fontSize(isMobile ? 24 : 32),
              s.weightRegular,
              s.fg(s.hsl(purpleHue, 80, 20)),
              s.px(40)
            )
          )}
        >
          <div className={css(c(s.textAlign("center"), s.px(20)))}>
            Humans need connection, not followers.
            <br />
            <AutoInput
              onChange={e => {
                setName(e.target.value)
              }}
              dashedLine={w => (
                <DashedLine width={w} dasharray="8" strokeWidth={4} />
              )}
              lineOffset={6}
              style={c(
                s.weightSemiBold,
                s.inlineBlock,
                s.fg(editColor),
                s.whitespace("nowrap"),
                s.minWidth(40)
              )}
              value={name}
            ></AutoInput>{" "}
            is human.
          </div>
        </div>
        <div
          className={css(
            c(
              s.width("min(calc(100vw - 32px), 700px)"),
              s.grow,
              s.fg(offWhite),
              s.fontSize(isMobile ? 14 : 20),
              s.weightRegular,
              s.py(72)
            )
          )}
        >
          <div className={css(c(bodyStyling))}>
            We could all use a little more connection. By creating and linking
            to this page, {name} is stating that they welcome new connections;
            they're available to talk and listen. You can reach them on the
            following channels:
          </div>
          {paragraphSpacer}
          <div className={css(c(bodyStyling))}>
            Start the conversation with a project you’re working on, an event in
            your life, a book you’ve read, your current mood, thoughts on the
            world, etc. Don’t be afraid to talk as if the two of you are already
            close friends.
          </div>
          {paragraphSpacer}
          <div className={css(c())}>
            Can’t think of anything? Maybe just ask what {name} has been up to
            recently. Or you can ask about some of {name}’s interests. {name} is
            interested in{" "}
            {
              <span>
                {intersperse(
                  interests.map((interest, i) => {
                    return (
                      <span className={css(c(s.px(4)))}>
                        <AutoInput
                          key={i}
                          value={interest}
                          onChange={e => {
                            e.persist()
                            setInterests(draft => {
                              if (e.target) {
                                draft[i] = e.target.value
                              }
                            })
                          }}
                          dashedLine={w => (
                            <DashedLine
                              width={w}
                              dasharray="8"
                              strokeWidth={3}
                            />
                          )}
                          lineOffset={4}
                          style={c(
                            inlineStyles,
                            s.whitespace("nowrap"),
                            s.fg(editColor),
                            s.minWidth(40),
                            s.weightSemiBold
                          )}
                        ></AutoInput>
                      </span>
                    )
                  }),
                  i => {
                    if (interests.length === 2) {
                      return <span className={css(c(inlineStyles))}> and </span>
                    }
                    if (i === interests.length - 2) {
                      return (
                        <span className={css(c(inlineStyles))}>, and </span>
                      )
                    }
                    return <span className={css(c(inlineStyles))}>, </span>
                  }
                )}
              </span>
            }
            <pre className={css(c(s.inlineBlock))}>.</pre>
          </div>
          {paragraphSpacer}
          <div className={css(c())}>
            Think the world needs more connections and less surface-level
            interaction?{" "}
            <span
              className={css(
                c(s.weightSemiBold, s.borderBottom(`1px solid ${offWhite}`))
              )}
            >
              Create your own page
            </span>{" "}
            and put it somewhere people will find it (social media bio, your
            website, email signature, etc).
          </div>
        </div>
        <div
          className={css(
            c(
              s.fullWidth,
              s.bg(s.hsl(purpleHue, 50, 5)),
              s.height(48),
              s.row,
              s.fontSize(12),
              s.alignCenter,
              s.justifyCenter,
              s.fg(s.hsl(purpleHue, 20, 65))
            )
          )}
        >
          Made with ❤️ by Marcus Buffett
        </div>
      </div>
    </Layout>
  )
}

export default ConnectionPage
