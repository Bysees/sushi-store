import { useCallback, useState } from "react"

export const useToogle = (boolean) => {

  const [value, setValue] = useState(boolean)

  const setTrue = useCallback(() => setValue(v => true), [])
  const setFalse = useCallback(() => setValue(v => false), [])

  return [value, setTrue, setFalse]
}