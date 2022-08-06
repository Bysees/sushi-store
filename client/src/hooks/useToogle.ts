import { useCallback, useState } from 'react'

export const useToogle = (
  value: boolean
): [boolean, () => void, () => void] => {
  const [_value, setValue] = useState<boolean>(value)

  const setTrue = useCallback(() => setValue((_v) => true), [])
  const setFalse = useCallback(() => setValue((_v) => false), [])

  return [_value, setTrue, setFalse]
}
