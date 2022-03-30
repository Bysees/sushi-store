export const combinePreloadedStates = (object) => {
  const fields = Object.entries(object)
  const state = {}

  fields.forEach(([key, callback]) => {
    const callbackResult = callback()
    if (callbackResult) {
      state[key] = callbackResult
    }
  })

  return state
}