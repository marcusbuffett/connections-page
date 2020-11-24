import React, { useState } from "react"
import { Link } from "gatsby"

import { c, s } from "src/styles"
import { boldHeaderStyles, purpleHue } from "src/app_styles"
import Layout from "src/components/Layout"
import Spacer from "src/components/Spacer"
import AutoInput from "src/components/AutoInput"
import { useImmer } from "use-immer"
import DashedLine from "src/components/DashedLine"
import { useStyletronChain } from "src/utils/useStyletronChain"
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd"
import { Menu } from "react-feather"
import { introCopy } from "src/copy"

const CreationPage = ({}: { creation?: boolean }) => {
  const css = useStyletronChain()
  const bodyStyling = c(s.fontFamily('"Rubik", sans-serif'))
  const offWhite = s.hsl(purpleHue, 50, 95)
  const [name, setName] = useState("")
  const [twitterScreenName, setTwitterScreenName] = useState("")
  const [interests, setInterests] = useImmer([
    "programming",
    "stoicism",
    "rationality",
    "speedcubing",
    "digital painting",
  ])

  const inlineStyles = c(s.whitespace("pre-wrap"))
  const paragraphSpacer = <Spacer height={24} />
  return (
    <Layout
      showFooter={false}
      header={
        <>
          Humans need connection, not followers.
          <br />
          <div className={css(boldHeaderStyles)}>You</div> are human.
        </>
      }
      body={
        <>
          <div className={css(c(bodyStyling))}>{introCopy}</div>
          {paragraphSpacer}
          <div className={css()}>
            Fill in your name, twitter handle, and some of your interests.
            You'll get a page you can link to from your social media bio,
            website, etc. Here's <Link to="/marcus">an example</Link> of what a
            page looks like.
          </div>
          <Spacer height={32} />
          <div
            className={css(
              s.bg(s.hsl(purpleHue, 50, 5, 10)),
              s.br(4),
              s.px(44),
              s.py(44),
              s.column
            )}
          >
            <div
              className={css(
                s.fontSize(18),
                s.weightSemiBold,
                s.fg(s.hsl(purpleHue, 50, 95))
              )}
            >
              Edit interests
            </div>
            <Spacer height={24} />
            <DragDropContext onDragEnd={() => {}}>
              <Droppable droppableId="droppable">
                {(provided: any) => (
                  <div
                    ref={provided.innerRef}
                    className={css(s.column, s.alignStart)}
                    {...provided.droppableProps}
                  >
                    {interests.map((interest: any, i) => {
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
                                  provided.draggableProps.style,
                                  s.mb(12),
                                  s.row,
                                  s.alignCenter
                                )}
                              >
                                <div className={css(s.size(24), s.center)}>
                                  <Menu
                                    size={18}
                                    color="hsla(0, 0%, 100%, 40%)"
                                  />
                                </div>
                                <Spacer width={12} />
                                <AutoInput
                                  placeholder=""
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
                                      color={"hsla(0, 0%, 100%, 80%)"}
                                    />
                                  )}
                                  lineOffset={4}
                                  style={c(
                                    inlineStyles,
                                    s.whitespace("nowrap"),
                                    s.fg("hsla(0, 0%, 100%, 80%)"),
                                    s.minWidth(40),
                                    s.weightSemiBold
                                  )}
                                ></AutoInput>
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
          </div>
          <Spacer height={18} />
          <div
            className={css(
              c(
                s.bg(s.hsl(purpleHue, 50, 5)),
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
                s.fg(s.hsl(purpleHue, 50, 95))
              )
            )}
          >
            <div className={css()}>Preview Page</div>
          </div>
        </>
      }
    />
  )
}

export default CreationPage
