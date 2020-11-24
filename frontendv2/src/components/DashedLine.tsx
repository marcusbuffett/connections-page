import React from "react"
import { editColor } from "src/app_styles"

const DashedLine = ({ dasharray, strokeWidth, width, color }) => {
  return (
    <svg
      viewBox={`0 0 ${width} ${strokeWidth}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="0"
        y1="0"
        x2={width}
        y2="0"
        stroke={color || editColor}
        strokeWidth={strokeWidth}
        strokeDasharray={dasharray}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

export default DashedLine
