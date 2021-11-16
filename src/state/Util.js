export const getValues = ((state, initialState) => {
  var o = {}
  for (const [key] of Object.entries(initialState)) {
    o[key] = state[key]
  }
  return o
})
