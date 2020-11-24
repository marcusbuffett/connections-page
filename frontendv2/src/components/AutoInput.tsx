import React, {
  useRef,
  useState,
  forwardRef,
  useLayoutEffect,
  useContext,
} from "react"
import _ from "lodash"

import { useStyletron } from "styletron-react"
import { c, s } from "src/styles"
import { useBoundingclientrect, useTimeout } from "rooks"
import DashedLine from "src/components/DashedLine"
import { FontsLoadedContext } from "src/components/FontsLoadedContext"

export interface AutoInputProps {}

const AutoInput = forwardRef<any, any>((props, ref) => {
  const { style, value, placeholder } = props
  const { dashedLine, lineOffset } = props
  const spanRef = useRef(null)
  const displayValue = value === "" ? placeholder : value

  const [spanWidth, setSpanWidth] = useState(0)

  const fontsLoaded = useContext(FontsLoadedContext)
  const updateInputFieldWidth = () => {
    if (spanRef.current) {
      let rect = spanRef.current.getBoundingClientRect()
      if (props.value === "speedcubing") {
      }
      setSpanWidth(rect.width)
    }
  }
  useLayoutEffect(updateInputFieldWidth, [fontsLoaded, value])
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
        {displayValue}
      </span>
      <input
        ref={ref}
        placeholder={placeholder}
        value={props.value}
        onChange={props.onChange}
        className={css(c(style, s.width(spanWidth), s.px(0), s.inlineBlock))}
      />
      <div
        className={css(
          c(
            s.absolute,
            s.bottom(0),
            s.mb(-lineOffset),
            s.left(0),
            s.fullWidth,
            s.fontSize(0)
          )
        )}
      >
        {dashedLine(spanWidth)}
      </div>
    </div>
  )
})

export default AutoInput
