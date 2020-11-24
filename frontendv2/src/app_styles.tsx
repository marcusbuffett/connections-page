import { c, s } from "src/styles"

export const purpleHue = 240
export const saturation = 40
export const backgroundColor = s.hsl(purpleHue, 28, 45)
export const headerColor = s.hsl(purpleHue, 80, 95)
export const editColor = s.hsl(purpleHue, 80, 25)
export const youColor = s.hsl(purpleHue, 60, 80)
export const offWhite = s.hsl(purpleHue, 50, 95)
export const interestColor = offWhite

export const containerStyles = s.width("min(calc(100vw - 48px), 700px)")
export const bodyStyles = c(
  s.fontFamily('"Rubik", sans-serif'),
  s.lineHeight(1.4)
)
export const interestStyles = c(
  s.whitespace("wrap"),
  s.fg(interestColor),
  s.minWidth(40),
  s.weightSemiBold
)
export const inlineStyles = c(s.whitespace("pre-wrap"))

export const headerStyles = (isMobile: boolean) =>
  c(
    s.fullWidth,
    s.center,
    s.fontSize(isMobile ? 24 : 32),
    s.lineHeight(1.2),
    s.weightRegular,
    s.fg(headerColor),
    s.px(12)
  )

export const boldHeaderStyles = c(
  s.weightSemiBold,
  s.inlineBlock,
  s.whitespace("nowrap"),
  s.minWidth(40)
)
