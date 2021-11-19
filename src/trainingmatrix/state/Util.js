export const getValues = ((state, initialState) => {
  var o = {}
  for (const [key] of Object.entries(initialState)) {
    o[key] = state[key]
  }
  return o
})

export const getTheColor = ((currcertID) => {
  var color = 'green'
  switch (currcertID) {
    case 0:
      color = 'white'
      break;
    case 1:
      color = 'red'
      break;
    case 2:
      color = 'goldenrod'
      break;
    case 3:
      color = 'green'
      break;
    case 4:
      color = 'blue'
      break;
    case 5:
      color = 'purple'
      break;
    default:
      break;
  }
  return color;
})
