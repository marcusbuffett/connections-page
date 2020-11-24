import { useWindowSize } from "rooks"

export const useIsMobile = () => {
  const { innerWidth } = useWindowSize()
  return innerWidth < 500
}
