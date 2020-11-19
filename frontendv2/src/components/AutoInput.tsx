import React, { useRef, useState, forwardRef, useLayoutEffect } from "react"
import _ from "lodash"

import { useStyletron } from "styletron-react"
import { c, s } from "src/styles"
import { useInterval } from "rooks"
import DashedLine from "src/components/DashedLine"

export interface AutoInputProps {}

const AutoInput = forwardRef<any, any>((props, ref) => {
  const { style, value } = props
  const { dashedLine, lineOffset } = props
  const spanRef = useRef(null)
  const [spanWidth, setSpanWidth] = useState(0)
  const propsNoStyles = _.cloneDeep(props)
  propsNoStyles["style"] = undefined

  const updateInputFieldWidth = () => {
    console.log("Updating input fld ref")
    if (spanRef.current) {
      let rect = spanRef.current.getBoundingClientRect()
      if (props.value === "speedcubing") {
        console.log("rect:", rect)
      }
      setSpanWidth(rect.width)
    }
  }
  useInterval(updateInputFieldWidth, 500, true)
  useLayoutEffect(updateInputFieldWidth)
  const [css] = useStyletron()
  return (
    <div className={css(c(s.relative, s.inlineBlock))}>
      <span
        ref={spanRef}
        className={css(
          c(
            style,
            s.absolute,
            s.opacity(0),
            s.keyedProp("pointerEvents")("none")
          )
        )}
      >
        {value}
      </span>
      <input
        ref={ref}
        {...propsNoStyles}
        className={css(c(style, s.width(spanWidth), s.px(0), s.inlineBlock))}
      />
      <div
        className={css(
          c(s.absolute, s.top(lineOffset), s.left(0), s.fullWidth)
        )}
      >
        {dashedLine()}
      </div>
    </div>
  )
})

export default AutoInput
