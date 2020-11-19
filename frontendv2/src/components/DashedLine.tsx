import React from "react"
import { editColor } from "src/app_styles"

const DashedLine = props => {
  return (
    <svg viewBox="0 0 30 2" xmlns="http://www.w3.org/2000/svg">
      <line
        x1="0"
        y1="0"
        x2="30"
        y2="0"
        stroke={editColor}
        strokeWidth={1}
        stroke-dasharray="6"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

export default DashedLine
