import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import { Redirect } from "@reach/router"
import { useNavigate } from "@reach/router"
import axios from "axios"
import applyCaseMiddleware from "axios-case-converter"

import { c, s } from "src/styles"
import {
  bodyStyles,
  boldHeaderStyles,
  interestStyles,
  purpleHue,
} from "src/app_styles"
import Layout from "src/components/Layout"
import Spacer from "src/components/Spacer"
import AutoInput from "src/components/AutoInput"
import { useImmer } from "use-immer"
import DashedLine from "src/components/DashedLine"
import { useStyletronChain } from "src/utils/useStyletronChain"
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd"
import { AlertTriangle, Menu, Plus, Trash, X } from "react-feather"
import { introCopy } from "src/copy"
import produce from "immer"
import _ from "lodash"
import shuffleSeed from "shuffle-seed"
import { formatInterests } from "src/utilities"
import { useIsMobile } from "src/utils/useIsMobile"
import { Page } from "src/models"

const seed = _.random(true)
console.log("seed:", seed)
const exampleInterests = [
  "speedcubing",
  "digital painting",
  "ice sculpting",
  "western philosophy",
  "birdwatching",
  "liar's dice",
  "D&D",
  "running",
  "stoicism",
  "Greek history",
  "economics",
  "self-improvement",
  "fantasy novels",
  "rationalism",
  "geneology",
  "architecture",
  "glassblowing",
  "injury prevention",
  "tennis",
  "bully pits",
  "game theory",
  "calisthenics",
  "webcomics",
]

let shuffledInterests = shuffleSeed.shuffle(exampleInterests, seed)

const CreationPage = ({}: { creation?: boolean }) => {
  const css = useStyletronChain()
  const offWhite = s.hsl(purpleHue, 50, 95)
  const [name, setName] = useState("")
  const [twitterScreenName, setTwitterScreenName] = useState("")
  const [error, setError] = useState(null)
  const [interests, setInterests] = useImmer(["", "", ""])
  const filteredInterests = _.filter(interests, i => i !== "")
  useEffect(() => {
    if (filteredInterests.length === interests.length && interests.length < 8) {
      setInterests(i => {
        i.push("")
        return i
      })
    }
  }, [interests])

  const navigate = useNavigate()
  const inlineStyles = c(s.whitespace("pre-wrap"))
  const labelStyles = c(s.fg(s.hsl(0, 0, 100, 60)), s.fontSize(12))
  const inputLabelStyles = c(labelStyles)
  const editInputStyles = c(
    s.fg(s.hsl(purpleHue, 50, 92)),
    s.whitespace("nowrap"),
    s.weightRegular,
    s.py(4),
    s.pr(12),
    s.fontSize(18),
    { "::placeholder": c(s.opacity(1.0), s.fg(s.hsl(purpleHue, 0, 100, 65))) }
  )
  const isMobile = useIsMobile()
  const editInputDash = w => (
    <DashedLine
      width={w}
      dasharray={"4"}
      strokeWidth={3}
      color={"hsla(0, 0%, 100%, 30%)"}
    />
  )
  const paragraphSpacer = <Spacer height={24} />
  return (
    <Layout
      showFooter={false}
      header={
        <>
          Humans need connection, not followers.
          <br />
          You are human.
        </>
      }
      body={
        <>
          <div className={css(c(bodyStyles))}>{introCopy}</div>
          {paragraphSpacer}
          <div className={css(bodyStyles)}>
            The aim of this project is to enable people to be more transparently
            open to connections of the latter kind. You'll get a page that looks{" "}
            <Link
              to="/marcus"
              className={css(
                s.weightSemiBold,
                // s.keyedProp("text-decoration")("underline")
                s.borderBottom("1px solid hsla(0, 0%, 100%, 60%)")
              )}
            >
              like this
            </Link>
            , which you can link from your social media, website, etc. It's a
            slightly more structured way to say “come say hi”.
          </div>
          {paragraphSpacer}
          <div className={css(bodyStyles)}>
            No ads, no sign-up. Just an experiment in stemming the tide of
            isolation that has risen as screens have taken a central role in our
            lives.
          </div>
          <Spacer height={32} />
          <div
            className={css(
              s.bg(s.hsl(purpleHue, 50, 5, 10)),
              s.br(4),
              s.px(isMobile ? 24 : 44),
              s.py(32),
              s.column
            )}
          >
            <div
              className={css(
                inputLabelStyles,
                s.stif(name == "", s.opacity(0.0)),
                s.transition("opacity")
              )}
            >
              First name
            </div>
            <AutoInput
              placeholder="First name"
              value={name}
              onChange={e => {
                setName(e.target.value)
              }}
              dashedLine={editInputDash}
              lineOffset={4}
              style={c(editInputStyles)}
            />
            <Spacer height={36} />
            <div
              className={css(
                inputLabelStyles,
                s.stif(twitterScreenName == "", s.opacity(0.0))
              )}
            >
              Twitter handle
            </div>
            <AutoInput
              placeholder="Twitter username"
              value={twitterScreenName}
              autocapitalize="none"
              spellCheck={false}
              autocorrect="off"
              onChange={e => {
                setTwitterScreenName(e.target.value)
              }}
              dashedLine={editInputDash}
              lineOffset={4}
              style={c(editInputStyles)}
            />
            <Spacer height={48} />
            <div
              className={css(
                labelStyles,
                s.fontSize(18),
                s.fg(s.hsl(0, 0, 100, 80))
              )}
            >
              Interests
            </div>
            <Spacer height={16} />
            <div className={css(s.column, s.alignStart)}>
              {interests.map((interest: any, i) => {
                return (
                  <div
                    className={css(
                      s.fontSize(16),
                      s.bg(s.hsl(purpleHue, 0, 0, 40)),
                      s.fullWidth,
                      s.br(2),
                      s.px(8),
                      s.pl(16),
                      s.mb(12),
                      s.row,
                      s.justifyBetween,
                      s.alignCenter
                    )}
                  >
                    <div className={css(s.grow)}>
                      <input
                        placeholder={`ex. ${shuffledInterests[i]}`}
                        key={i}
                        autoCapitalize="none"
                        value={interest}
                        onChange={e => {
                          e.persist()
                          setInterests(draft => {
                            if (e.target) {
                              draft[i] = e.target.value
                            }
                          })
                        }}
                        style={c(editInputStyles, s.py(14), s.fullWidth, {
                          "::placeholder": c(
                            s.opacity(1.0),
                            s.fg(s.hsl(purpleHue, 0, 100, 50))
                          ),
                        })}
                      />
                    </div>
                    <Spacer width={8} />
                    <div
                      className={css(s.clickable, s.size(24), s.center)}
                      onClick={() => {
                        setInterests(interests => {
                          _.pullAt(interests, [i])
                          return interests
                        })
                      }}
                    >
                      <Trash size={18} color="hsla(0, 0%, 100%, 75%)" />
                    </div>
                  </div>
                )
              })}
            </div>
            <Spacer height={12} />
            {!_.isEmpty(filteredInterests) && (
              <div className={css(s.opacity(0.8), s.fontSize(14))}>
                “{_.isEmpty(name) ? "..." : name} is interested in{" "}
                {formatInterests(
                  filteredInterests,
                  css(inlineStyles),
                  css(interestStyles)
                )}
                ”
              </div>
            )}
            <Spacer height={48} />
            {error && (
              <>
                <div
                  className={css(
                    s.bg(s.white(80)),
                    s.row,
                    s.fg(s.black(85)),
                    s.relative,
                    s.fontSize(14),
                    s.py(20),
                    s.px(20),
                    s.alignCenter,
                    s.br(2),
                    s.justifyBetween
                  )}
                >
                  <div className={css()}>{error}</div>
                  <AlertTriangle color={s.hsl(0, 50, 40)} />
                </div>
                <Spacer height={12} />
              </>
            )}
            <div
              className={css(
                c(
                  s.bg(s.hsl(purpleHue, 50, 0, 65)),
                  s.py(12),
                  s.row,
                  s.px(20),
                  s.fontSize(18),
                  s.caps,
                  s.clickable,
                  s.alignCenter,
                  s.justifyCenter,
                  s.selfEnd,
                  s.br(2),
                  s.weightSemiBold,
                  s.fg(s.hsl(0, 0, 100, 75))
                )
              )}
            >
              <div
                className={css()}
                onClick={() => {
                  if (filteredInterests.length === 0) {
                    setError("Please set at least one interest")
                    return
                  }
                  if (name === "") {
                    setError("Please fill in your first name")
                    return
                  }
                  if (twitterScreenName === "") {
                    setError(
                      "Please fill in your twitter handle so people can message you"
                    )
                    return
                  }
                  applyCaseMiddleware(axios.create())
                    .post(`/api/pages`, {
                      firstName: name,
                      twitterScreenName,
                      interests: filteredInterests,
                    })
                    .then(res => {
                      console.log("res.data:", res.data)
                      const page = res.data as Page
                      if (page) {
                        navigate(`/${page.identifier}`)
                      }
                    })
                    .catch(e => {
                      setError(
                        "There was an error with getting your page. Are you sure your twitter handle is correct?"
                      )
                    })
                }}
              >
                See Your Page
              </div>
            </div>
          </div>
          <Spacer height={18} />
        </>
      }
    />
  )
}

export default CreationPage
