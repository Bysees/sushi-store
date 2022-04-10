import { useEffect, useRef } from "react"

export const useMouseDebounce = (callback, delay = 1000) => {

  const timeoutId = useRef(null)

  const onMouseLeaveHandler = () => {
    timeoutId.current = setTimeout(callback, delay)
  }

  const onMouseOverHandler = () => {
    clearTimeout(timeoutId.current)
  }

  useEffect(() => {
    return () => clearTimeout(timeoutId.current)
  })

  return { onMouseLeaveHandler, onMouseOverHandler }
}