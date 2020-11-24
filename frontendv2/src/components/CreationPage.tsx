import React, { useState } from "react"
import { Link } from "gatsby"

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
import { Menu, Trash, X } from "react-feather"
import { introCopy } from "src/copy"
import produce from "immer"
import _ from "lodash"
import shuffleSeed from "shuffle-seed"
import { formatInterests } from "src/utilities"

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
console.log("shuffledInterests:", shuffledInterests)

const CreationPage = ({}: { creation?: boolean }) => {
  const css = useStyletronChain()
  const offWhite = s.hsl(purpleHue, 50, 95)
  const [name, setName] = useState("")
  const [twitterScreenName, setTwitterScreenName] = useState("")
  const [interests, setInterests] = useImmer(["", "", "", "", ""])
  const filteredInterests = _.filter(interests, i => i !== "")
  console.log("interests:", interests)

  const inlineStyles = c(s.whitespace("pre-wrap"))
  const labelStyles = c(s.fg(s.hsl(0, 0, 100, 60)), s.fontSize(12))
  const inputLabelStyles = c(labelStyles)
  const editInputStyles = c(
    s.fg(s.hsl(purpleHue, 50, 92)),
    s.whitespace("nowrap"),
    s.minWidth(120),
    s.weightRegular,
    s.py(4),
    s.pr(12),
    s.fontSize(18),
    { "::placeholder": c(s.opacity(1.0), s.fg(s.hsl(purpleHue, 0, 100, 65))) }
  )
  const editInputDash = w => (
    <DashedLine
      width={w}
      dasharray={"4"}
      strokeWidth={3}
      color={"hsla(0, 0%, 100%, 30%)"}
    />
  )
  const [dndIteration, setDndIteration] = useState(0)
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
            The aim of this project is to enable people to be transparent about
            their openness to connections of the latter kind. You'll get a page
            that looks{" "}
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
            , which you can link from your social media, website, etc. It's just
            a more structured way to say “come say hi”.
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
              s.px(44),
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
              placeholder="Twitter screen name"
              value={twitterScreenName}
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
            <Spacer height={12} />
            <DragDropContext
              key={dndIteration}
              onDragEnd={result => {
                const { destination, source } = result
                console.log("result:", result)
                if (!destination) {
                  return
                }
                setInterests(interests => {
                  let [movedInterest] = _.pullAt(interests, source.index)
                  interests.splice(destination.index, 0, movedInterest)
                  return interests
                })
                setDndIteration(dndIteration + 1)
              }}
            >
              <Droppable droppableId="droppable">
                {(provided: any) => (
                  <div
                    ref={provided.innerRef}
                    className={css(s.column, s.alignStart)}
                    {...provided.droppableProps}
                  >
                    {interests.map((interest: any, i) => {
                      // console.log("interest:", interest)
                      // console.log("i:", i)
                      return (
                        <Draggable key={i} draggableId={interest} index={i}>
                          {provided => {
                            return (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={css(
                                  s.fontSize(16),
                                  s.bg(s.hsl(purpleHue, 0, 0, 40)),
                                  s.br(2),
                                  s.py(8),
                                  s.px(8),
                                  provided.draggableProps.style,
                                  s.mb(12),
                                  s.row,
                                  s.alignCenter
                                )}
                              >
                                <div
                                  className={css(
                                    s.size(24),
                                    s.center,
                                    s.keyedProp("cursor")("move")
                                  )}
                                >
                                  <Menu
                                    size={18}
                                    color="hsla(0, 0%, 100%, 40%)"
                                  />
                                </div>
                                <Spacer width={8} />
                                <AutoInput
                                  placeholder={`ex. ${shuffledInterests[i]}`}
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
                                  dashedLine={w => null}
                                  lineOffset={4}
                                  style={c(editInputStyles, {
                                    "::placeholder": c(
                                      s.opacity(1.0),
                                      s.fg(s.hsl(purpleHue, 0, 100, 50))
                                    ),
                                  })}
                                />
                                <Spacer width={8} />
                                <div
                                  className={css(
                                    s.clickable,
                                    s.size(24),
                                    s.center
                                  )}
                                  onClick={() => {
                                    setDndIteration(dndIteration + 1)
                                    setInterests(interests => {
                                      _.pullAt(interests, [i])
                                      return interests
                                    })
                                  }}
                                >
                                  <Trash
                                    size={18}
                                    color="hsla(0, 0%, 100%, 40%)"
                                  />
                                </div>
                              </div>
                            )
                          }}
                        </Draggable>
                      )
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <Spacer height={12} />
            <div className={css()}>
              “{name} is interested in{" "}
              {formatInterests(
                filteredInterests,
                css(inlineStyles),
                css(interestStyles)
              )}
              ”
            </div>
            <Spacer height={24} />
            <div
              className={css(
                c(
                  s.bg(s.hsl(purpleHue, 50, 0, 65)),
                  s.py(12),
                  s.row,
                  s.px(20),
                  s.fontSize(18),
                  s.caps,
                  s.alignCenter,
                  s.justifyCenter,
                  s.selfEnd,
                  s.br(2),
                  s.weightSemiBold,
                  s.fg(s.hsl(0, 0, 100, 85))
                )
              )}
            >
              <div className={css()}>See your Page</div>
            </div>
          </div>
          <Spacer height={18} />
        </>
      }
    />
  )
}

export default CreationPage
