export const getValues = ((state, initialState) => {
  var o = {}
  for (const [key] of Object.entries(initialState)) {
    o[key] = state[key]
  }
  return o
})

export const getTheColor = ((certification) => {
  //console.log(certification)
  var color = 'green'
  switch (certification) {
    case 'notapplicable':
      color = 'white'
      break;
    case 'intraining':
      color = 'red'
      break;
    case 'developing':
      color = 'goldenrod'
      break;
    case 'certified':
      color = 'green'
      break;
    case 'trainer':
      color = 'blue'
      break;
    case 'mastertrainer':
      color = 'purple'
      break;
    default:
      break;
  }
  return color;
})

export const getTheColor2 = ((currcertID) => {
  //console.log(certification)
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
