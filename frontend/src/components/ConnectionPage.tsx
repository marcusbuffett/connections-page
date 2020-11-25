import React, { useEffect, useState } from "react"
// import superagent from "superagent"
import caseConverter from "superagent-case-converter"
import axios from "axios"

import { c, s } from "src/styles"
import {
  backgroundColor,
  bodyStyles,
  boldHeaderStyles,
  headerStyles,
  inlineStyles,
  interestStyles,
  purpleHue,
} from "src/app_styles"
import Layout from "src/components/Layout"
import Spacer from "src/components/Spacer"
import { useIsMobile } from "src/utils/useIsMobile"
import { useStyletronChain } from "src/utils/useStyletronChain"
import { Twitter } from "react-feather"
import { Page } from "src/models"
import { introCopy } from "src/copy"
import { formatInterests } from "src/utilities"
import applyCaseMiddleware from "axios-case-converter"

const darkPurple = s.hsl(purpleHue, 80, 20)
const ConnectionPage = ({ id }: { creation?: boolean; id: string }) => {
  console.log("id:", id)
  const css = useStyletronChain()
  const offWhite = s.hsl(purpleHue, 50, 95)
  const isMobile = useIsMobile()
  const paragraphSpacer = <Spacer height={24} />
  const [page, setPage] = useState(null as Page)
  useEffect(() => {
    applyCaseMiddleware(axios.create())
      .get(`/api/pages/${id}`)
      .then(res => {
        console.log("res.data:", res.data)
        const page = res.data as Page
        if (page) {
          setPage(res.data)
        }
      })
      .catch(e => {
        // setError(
        // "There was an error with getting your page. Are you sure your twitter handle is correct?"
        // )
      })
    // superagent
    // // TODO: change this...
    // .get(`/api/pages/${id}`)
    // .accept("json")
    // .use(caseConverter)
    // .end((err, res) => {
    // console.log("err:", err)
    // console.log("res.body:", res.body)
    // if (!err) {
    // }
    // })
  }, [])
  if (!page) {
    return <div className={css(s.pageHeight, s.bg(backgroundColor))}></div>
  }
  const { firstName, channels } = page
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
          <div className={css(bodyStyles)}>{introCopy}</div>
          {paragraphSpacer}
          <div className={css(bodyStyles)}>
            By creating and linking to this page, {firstName} is stating that
            they welcome new connections of the latter kind; they're available
            to talk and listen. You can reach them on these channels:
          </div>
          <Spacer height={18} />
          <div className={css(s.column, s.alignStart)}>
            {twitter && (
              <a
                className={css(s.fg(darkPurple), s.clickable, s.weightRegular)}
                href={`https://twitter.com/messages/compose?recipient_id=${twitter.userId}`}
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
                  Message @{twitter.screenName}
                </div>
              </a>
            )}
          </div>
          <Spacer height={24} />
          <div className={css(bodyStyles)}>
            Talk about a project you’re working on, an event in your life, a
            book you’ve read, your current mood, thoughts on the world, etc. You
            can also ask about one of {firstName}’s interests. {firstName} is
            interested in{" "}
            {formatInterests(
              page.interests,
              css(inlineStyles),
              css(interestStyles)
            )}
            <pre className={css(c(s.inlineBlock))}>.</pre>
          </div>
        </>
      }
    />
  )
}

export default ConnectionPage
