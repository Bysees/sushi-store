import { useEffect, useRef } from 'react'

export const useMouseDebounce = (
  callback: () => void,
  trigger: boolean,
  delay = 1000
) => {
  const timeoutId = useRef<number | undefined>(undefined)

  const onMouseLeaveHandler = () => {
    if (trigger) {
      timeoutId.current = window.setTimeout(callback, delay)
    }
  }

  const onMouseOverHandler = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
      timeoutId.current = undefined
    }
  }

  useEffect(() => {
    if (trigger) {
      timeoutId.current = window.setTimeout(callback, delay)
    }

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }
    }
  }, [trigger, callback, delay])

  return { onMouseLeaveHandler, onMouseOverHandler }
}
