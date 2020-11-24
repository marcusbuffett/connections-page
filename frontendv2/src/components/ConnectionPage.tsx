import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import superagent from "superagent"
import caseConverter from "superagent-case-converter"

import { useStyletron } from "styletron-react"
import { c, s } from "src/styles"
import {
  backgroundColor,
  boldHeaderStyles,
  editColor,
  headerColor,
  headerStyles,
  purpleHue,
} from "src/app_styles"
import Layout from "src/components/Layout"
import Spacer from "src/components/Spacer"
import AutoInput from "src/components/AutoInput"
import { useImmer } from "use-immer"
import { intersperse } from "src/utils/intersperse"
import { useIsMobile } from "src/utils/useIsMobile"
import DashedLine from "src/components/DashedLine"
import { useStyletronChain } from "src/utils/useStyletronChain"
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd"
import { Menu, Minus, Twitter } from "react-feather"
import { Page } from "src/models"
import { introCopy } from "src/copy"

const darkPurple = s.hsl(purpleHue, 80, 20)
const ConnectionPage = ({
  creation,
  id,
}: {
  creation?: boolean
  id: string
}) => {
  console.log("id:", id)
  const css = useStyletronChain()
  const offWhite = s.hsl(purpleHue, 50, 95)
  const interestColor = offWhite
  const isMobile = useIsMobile()
  const inlineStyles = c(s.whitespace("pre-wrap"))
  const paragraphSpacer = <Spacer height={24} />
  const [page, setPage] = useState(null as Page)
  useEffect(() => {
    superagent
      // TODO: change this...
      .get(`/api/pages/marcus`)
      .accept("json")
      .use(caseConverter)
      .end((err, res) => {
        console.log("err:", err)
        console.log("res.body:", res.body)
        if (!err) {
          setPage(res.body)
        }
      })
  }, [])
  if (!page) {
    return null
  }
  const { interests, firstName, channels } = page
  console.log("channels:", channels)
  const twitter = channels["twitter"]
  return (
    <Layout
      showFooter
      header={
        <div className={css(headerStyles(isMobile))}>
          <div className={css(s.textAlign("center"))}>
            Humans need connection, not followers.
            <br />
            <div className={css(boldHeaderStyles)}>{firstName}</div>{" "}
            {firstName === "" ? "are" : "is"} human.
          </div>
        </div>
      }
      body={
        <>
          <div className={css()}>{introCopy}</div>
          {paragraphSpacer}
          <div className={css()}>
            By creating and linking to this page, {firstName} is stating that
            they welcome new connections of the latter kind; they're available
            to talk and listen. You can reach them on these channels:
          </div>
          <Spacer height={18} />
          <div className={css(s.column, s.alignStart)}>
            {twitter && (
              <a
                className={css(s.fg(darkPurple), s.clickable, s.weightRegular)}
                href="https://twitter.com/messages/compose?recipient_id=marcusbuffett"
              >
                <div
                  className={css(
                    s.row,
                    s.alignCenter,
                    s.py(8),
                    s.px(12),
                    s.bg(offWhite),
                    s.br(2),
                    s.fontSize(16),
                    s.shadow(0, 2, 3, 0, s.hsl(0, 0, 0, 20))
                  )}
                >
                  <Twitter fill={darkPurple} color={darkPurple} size={18} />
                  <Spacer width={8} />
                  Message @{twitter.handle}
                </div>
              </a>
            )}
          </div>
          <Spacer height={24} />
          <div className={css()}>
            Talk about a project you’re working on, an event in your life, a
            book you’ve read, your current mood, thoughts on the world, etc. You
            can also ask about one of {firstName}’s interests. {firstName} is
            interested in{" "}
            {
              <span>
                {intersperse(
                  page.interests.map((interest, i) => {
                    return (
                      <span
                        key={interest}
                        className={css(
                          inlineStyles,
                          s.whitespace("nowrap"),
                          s.fg(interestColor),
                          s.minWidth(40),
                          s.weightSemiBold
                        )}
                      >
                        {interest}
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
        </>
      }
    />
  )
}

export default ConnectionPage
