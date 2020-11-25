import React from "react"
import { intersperse } from "src/utils/intersperse"

export const formatInterests = (interests, bodyStyling, interestStyling) => {
  return (
    <span>
      {intersperse(
        interests.map((interest, i) => {
          return (
            <span key={interest} className={interestStyling}>
              {interest}
            </span>
          )
        }),
        i => {
          if (interests.length === 2) {
            return <span className={bodyStyling}> and </span>
          }
          if (i === interests.length - 2) {
            return <span className={bodyStyling}>, and </span>
          }
          return <span className={bodyStyling}>, </span>
        }
      )}
    </span>
  )
}
