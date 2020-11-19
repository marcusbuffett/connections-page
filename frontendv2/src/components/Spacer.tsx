import { styled } from "styletron-react"

const Spacer = styled("div", (props: { height?: number; width?: number }) => {
  let styles: any = {
    flexShrink: 0,
    flexGrow: 0,
  }
  if (props.height) {
    styles.height = `${props.height}px`
  }
  if (props.width) {
    styles.width = `${props.width}px`
  }
  return styles
})

export default Spacer
