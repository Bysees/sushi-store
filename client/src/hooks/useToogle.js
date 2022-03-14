import { useCallback, useState } from "react"

export const useToogle = (boolean) => {

  const [value, setValue] = useState(boolean)

  const onTrue = useCallback(() => setValue(v => true), [])
  const onFalse = useCallback(() => setValue(v => false), [])

  return [value, onTrue, onFalse]
}