import { c } from "src/styles"
import { useStyletron } from "styletron-react"

export const useStyletronChain = () => {
  const [css] = useStyletron()
  return (...args) => {
    return css(c(...args))
  }
}
