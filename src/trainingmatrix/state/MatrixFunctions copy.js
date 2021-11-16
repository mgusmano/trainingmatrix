import * as types from './MatrixTypes';
//import * as types from './Types';

import { API, graphqlOperation } from 'aws-amplify'
// import { listOperators} from '../../graphql/queries'
// import { listSkills } from '../../graphql/queries'
// import { listCertifications} from '../../graphql/queries'
import { updateSkill, updateOperator } from '../graphql/mutations'

export const setRowsArray = (dispatch, payload) => {
  dispatch({type: types.SET_ROWSARRAY, payload: payload});
}
export const setColsArray = (dispatch, payload) => {
  dispatch({type: types.SET_COLSARRAY, payload: payload});
}

export const showTopDialog = (dispatch, payload) => {
  dispatch({type: types.SET_SHOWTOPDIALOG, payload: payload});
}
export const setTop = (dispatch, payload) => {
  dispatch({type: types.SET_TOP, payload: payload});
}

export const setMain = (dispatch, payload) => {
  dispatch({type: types.SET_MAIN, payload: payload});
}
export const showSkillDialog = (dispatch, payload) => {
  dispatch({type: types.SET_SHOWSKILLDIALOG, payload: payload});
}

export const showOperatorDialog = (dispatch, payload) => {
  dispatch({type: types.SET_SHOWOPERATORDIALOG, payload: payload});
}

export const showMainDialog = (dispatch, payload) => {
  dispatch({type: types.SET_SHOWMAINDIALOG, payload: payload});
}
export const showSecondaryDialog = (dispatch, payload) => {
  dispatch({type: types.SET_SHOWSECONDARYDIALOG, payload: payload});
}
export const setCellData = (dispatch, payload) => {
  dispatch({type: types.SET_CELLDATA, payload: payload});
}
export const setUserName = (dispatch, payload) => {
  dispatch({type: types.SET_USERNAME, payload: payload});
}
export const updateOperatorGoal = (dispatch,payload) => {
  API.graphql(graphqlOperation(updateOperator, { input: payload } ))
  .then(() => {
    dispatch({type: types.UPDATE_OPERATORGOAL, payload: payload});
    setAll(dispatch,false)
  })
}

const calcTotals = (certificationsDataCreated, dispatch) => {
  var rowsArray = []
  var currentRow = -1;
  var rowCount = -1;

  var colsArray = []
  var currentCol = -1;
  var colCount = -1;

  var certByRow = Array.from(certificationsDataCreated);
  certByRow.sort(function (x, y) {
    var n = x.row - y.row;
    if (n !== 0) {
        return n;
    }
    return x.col - y.col;
  });

  for (let i = 0; i < certByRow.length; i++) {
    if (certByRow[i].row > currentRow) {
      currentRow = certByRow[i].row
      rowCount = rowsArray.push([certByRow[i].skill.goal,0,0,0])
    }
    switch(certByRow[i].meta.currcertID) {
      case 3:
      case 4:
      case 5:
        rowsArray[rowCount-1][1] = rowsArray[rowCount-1][1] + 1;
        break;
      default:
        break;
    }
    rowsArray[rowCount-1][3] = rowsArray[rowCount-1][0] - rowsArray[rowCount-1][1];
    rowsArray[rowCount-1][2] = rowsArray[rowCount-1][1] / rowsArray[rowCount-1][0];
  }

  var certByCol = Array.from(certificationsDataCreated);
  certByCol.sort(function (x, y) {
    var n = x.col - y.col;
    if (n !== 0) {
        return n;
    }
    return x.row - y.row;
  });

  for (let i = 0; i < certByCol.length; i++) {
    if (certByCol[i].col > currentCol) {
      currentCol = certByCol[i].col
      colCount = colsArray.push([certByCol[i].operator.goal,0,0,0])
    }
    switch(certByCol[i].meta.currcertID) {
      case 3:
      case 4:
      case 5:
        colsArray[colCount-1][1] = colsArray[colCount-1][1] + 1;
        break;
      default:
        break;
    }
    colsArray[colCount-1][3] = colsArray[colCount-1][0] - colsArray[colCount-1][1];
    colsArray[colCount-1][2] = colsArray[colCount-1][1] / colsArray[colCount-1][0];
  }

  dispatch({type: types.SET_ROWSARRAY, payload: rowsArray});
  var transpose = m => m[0].map((x,i) => m.map(x => x[i]))
  var colsArraytransposed = transpose(colsArray)
  dispatch({type: types.SET_COLSARRAY, payload: colsArraytransposed});
}


//export const setAll = (dispatch, first, operatorsData, skillsData, certificationsData, multiplier) => {
export const setAll = (dispatch, theData) => {

  const doByOperator = (operators, skills, certifications, dispatch) => {
    var byOperator = []
    //var operatorsummary = []
    //var bottomtotals = []

    //if (operators = []) { return }
    operators.map((operator,o) => {
      o = operator
      o.meta = operator
      o.data = []
      const filteredcertifications = certifications.filter(item => item.operatorID === operator.id);

      // var ss = {}
      // ss.numstarted = 0
      // ss.numtrainers = 0
      // ss.numcertified = 0
      // filteredcertifications.map((fc,i) => {
      //   var meta
      //   var data
      //   if (typeof fc.meta === 'string' || fc.meta instanceof String) {
      //     meta = JSON.parse(fc.meta)
      //   }
      //   else {
      //     meta = fc.meta
      //   }
      //   if (typeof fc.data === 'string' || fc.data instanceof String) {
      //     data = JSON.parse(fc.data)
      //   }
      //   else {
      //     data = fc.data
      //   }

      //   var num = 0;
      //   if (data !== undefined) {
      //     data.map((slice,i) => {
      //       if (slice.s === 1) {
      //         num++
      //       }
      //       return null
      //     })

      //     if (num >  0 && meta.status === 'started') {
      //       var dStart = new Date(meta.start);
      //       var dToday = new Date();
      //       var difftime = dToday.getTime() - dStart.getTime()
      //       var diffdays = difftime / (1000 * 3600 * 24);
      //       if (diffdays < 180) {
      //         ss.numcertified ++
      //       }
      //     }
      //     if (data.status === 'started') {
      //       ss.numstarted ++
      //     }
      //     if (meta.status === 'started') {
      //       ss.numstarted ++
      //     }
      //     if (meta.trainer === 'true' || meta.trainer === true ) {
      //       ss.numtrainers ++
      //     }
      //   }
      //   return null
      // })
      //operatorsummary.push(ss)

      // var goal = operator.goal;
      // var val = [goal, ss.numcertified, goal-ss.numcertified]
      // bottomtotals.push(val)

      filteredcertifications.map((fc,i) => {
        var skill  = skills.find(item => item.id === fc.skillID);
        o.data[i] = {};
        o.data[i].certificationID = fc.id
        o.data[i].operator = operator
        o.data[i].skill = skill
        o.data[i].meta = fc.meta
        o.data[i].data = fc.data
        return null
      })
      byOperator.push(o)
      return null
    })

    //var transpose = m => m[0].map((x,i) => m.map(x => x[i]))
    //var bottomtotalstransposed = transpose(bottomtotals)
    //dispatch({type: types.SET_BOTTOMTOTALS, payload: bottomtotalstransposed});
    return byOperator
  }

  const doBySkill = (operators, skills, certifications, dispatch) => {
    var bySkill = []
    //var skillsummary = []
    //var righttotals = []

    skills.map((skill,s) => {
      var o = {}
      o = skill
      o.meta = skill
      o.data = []
      const filteredcertifications = certifications.filter(item => item.skillID === skill.id);

      // var ss = {}
      // ss.numstarted = 0
      // ss.numtrainers = 0
      // ss.numcertified = 0
      // filteredcertifications.map((fc,i) => {
      //   var meta
      //   var data
      //   if (typeof fc.meta === 'string' || fc.meta instanceof String) {
      //     meta = JSON.parse(fc.meta)
      //   }
      //   else {
      //     meta = fc.meta
      //   }
      //   if (typeof fc.data === 'string' || fc.data instanceof String) {
      //     data = JSON.parse(fc.data)
      //   }
      //   else {
      //     data = fc.data
      //   }
      //   var num = 0;
      //   if (data !== undefined) {
      //     data.map((slice,i) => {
      //       if (slice.s === 1) {
      //         num++
      //       }
      //       return null
      //     })
      //     if (num >  0 && meta.status === 'started') {
      //       var dStart = new Date(meta.start);
      //       var dToday = new Date();
      //       var difftime = dToday.getTime() - dStart.getTime()
      //       var diffdays = difftime / (1000 * 3600 * 24);
      //       if (diffdays < 180) {
      //         ss.numcertified ++
      //       }
      //     }
      //     if (data.status === 'started') {
      //       ss.numstarted ++
      //     }
      //     if (meta.status === 'started') {
      //       ss.numstarted ++
      //     }
      //     if (meta.trainer === 'true' || meta.trainer === true ) {
      //       ss.numtrainers ++
      //     }
      //   }
      //   return null
      // })
      // skillsummary.push(ss)
      // var goal = skill.goal;
      // var val = [goal, ss.numcertified, goal-ss.numcertified]
      // righttotals.push(val)

      filteredcertifications.map((fc,i) => {
        var operator  = operators.find(item => item.id === fc.operatorID);
        o.data[i] = {};
        o.data[i].certificationID = fc.id
        o.data[i].operator = operator
        o.data[i].skill = skill
        o.data[i].meta = fc.meta
        o.data[i].data = fc.data
        return null
      })

      bySkill.push(o)
      return null
    })

    //dispatch({type: types.SET_RIGHTTOTALS, payload: righttotals});
    return bySkill
  }

  const setInit = (o) => {

    var x = o.oLen
    var y = o.sLen

    //subscribeCertifications();

    const multiplier = o.multiplier;
    const topHeight = 0;
    const fontsize = 3;
    const bandX = 5;
    const bandY = 5;
    var col1 = 45;
    var col1a = 5;
    var col2 = bandX * x;
    var col3 =(bandX*4);
    var row1 = 45;

    var row2 = (bandY * y)+0;
    var row3 = bandX*4;

    var d2= {
      multiplier: multiplier,
      topHeight: topHeight,
      fontsize: fontsize,
      bandX: bandX,
      bandY: bandY,
      col1: col1,
      col1a: col1a,
      col2: col2,
      col3: col3,
      row1: row1,
      row2Orig: row2,
      row2: row2,
      row3: row3,
    }
    dispatch({type: types.SET_ORIGINAL, payload: d2});

    var d = {
      multiplier: multiplier,
      topHeight: topHeight*multiplier,
      fontsize: fontsize*multiplier,
      bandX: bandX*multiplier,
      bandY: bandY*multiplier,
      col1: col1*multiplier,
      col1a: col1a*multiplier,
      col2: col2*multiplier,
      col3: col3*multiplier,
      row1: row1*multiplier,
      row2Orig: row2*multiplier,
      row2: row2*multiplier,
      row3: row3*multiplier,
    }
    dispatch({type: types.SET_DIMENSIONS, payload: d});
  }

  //  const callAll = async (dispatch,first,doBy, operatorsData, skillsData, certificationsData) => {
  const callAll = async (dispatch,payload2) => {
    var first = payload2.first

    calcTotals(payload2.certificationsData, dispatch)

    //var operatorsData = payload2.operatorsData
    //var skillsData = payload2.skillsData
    //var certificationsData = payload2.certificationsData


    //console.log(payload2.certificationsData)

    // var operators
    // var skills
    // var certifications

    var operators = payload2.operatorsData
    var skills = payload2.skillsData
    var certifications = payload2.certificationsData
    var multiplier = payload2.multiplier


    // if (operatorsData === undefined) {
    //   // operators = await getDataOperators()
    //   // skills = await getDataSkills()
    //   // certifications = await getDataCertifications()
    // }
    // else {
    //   operators = operatorsData
    //   skills = skillsData
    //   certifications = certificationsData
    // }

    var byOperator = []
    var bySkill = []

    //var  doBy
//mjg
    //if (doBy === undefined) {
      //if (operators.length !== 0 && listSkills.length !== 0) {
      if (operators.length !== 0 && skills.length !== 0) {
        //console.log('in2')
        byOperator = doByOperator(operators,skills,certifications,dispatch)
        bySkill = doBySkill(operators,skills,certifications,dispatch)
      }
    //}

// console.log(operators)
// console.log(skills)
// console.log(certifications)
// console.log(byOperator)
// console.log(bySkill)

    if (first === true) {
      var oLen = operators.length
      var sLen = skills.length
      setInit({oLen,sLen,multiplier})
    }

    var payload = {
      bySkill: bySkill,
      byOperator: byOperator,
      operators: operators,
      skills: skills,
      certifications: certifications
    }
    dispatch({type: types.SET_ALL, payload: payload});
    dispatch({type: types.SET_ACTIVE, payload: false});
  }

  //console.log(first)
  //console.log(dispatch,first, operatorsData, skillsData, certificationsData)


  //callAll(dispatch,first, operatorsData, skillsData, certificationsData, multiplier)

  callAll(dispatch, theData)
  // callAll(dispatch,{
  //   first:first,
  //   operatorsData:operatorsData,
  //   skillsData:skillsData,
  //   certificationsData:certificationsData,
  //   multiplier:multiplier
  // })


}

// export const setOperators = (dispatch) => {

//   async function getDataOperators() {
//     const operatorData = await API.graphql(graphqlOperation(listOperators))
//     return operatorData.data.listOperators.items.sort((a, b) => (a.id > b.id) ? 1 : -1)
//   }

//   const callAll = async () => {
//     var operators = await getDataOperators()
//      //console.log('setUserName')
//     dispatch({type: types.types.SET_OPERATORS, payload: operators});

//   }

//   callAll()
// }

export const setActive = (dispatch, payload) => {
  dispatch({type: types.SET_ACTIVE, payload: payload});
}

export const setAuthenticatedUser = (dispatch, payload) => {
  dispatch({type: types.SET_AUTHENTICATEDUSER, payload: payload});
}

export const updateSkillGoal = (dispatch, payload) => {
  API.graphql(graphqlOperation(updateSkill, { input: payload } ))
  .then(() => {
    dispatch({type: types.UPDATE_SKILLGOAL, payload: payload});
    setAll(dispatch,false)
  })
}

export const setRightTotals = (dispatch, payload) => {
  dispatch({type: types.SET_RIGHTTOTALS, payload: payload});
}

export const setBottomTotals = (dispatch, payload) => {
  dispatch({type: types.SET_BOTTOMTOTALS, payload: payload});
}

export const setCurrentCertification = (dispatch, payload) => {
  dispatch({type: types.SET_CURRENT_CERTIFICATION, payload: payload});
}

export const setOperators = (dispatch, payload) => {
  dispatch({type: types.SET_OPERATORS, payload: payload});
}

export const setSkills = (dispatch, payload) => {
  dispatch({type: types.SET_SKILLS, payload: payload});
}

export const setCertifications = (dispatch, payload) => {
  dispatch({type: types.SET_CERTIFICATIONS, payload: payload});
}

export const setBySkill = (dispatch, payload) => {
  dispatch({type: types.SET_BYSKILL, payload: payload});
}

export const setByOperator = (dispatch, payload) => {
  dispatch({type: types.SET_BYOPERATOR, payload: payload});
}

export const setSpecific = (dispatch, payload) => {
  dispatch({type: types.SET_SPECIFIC, payload: payload});
}

export const setDimensions = (dispatch, payload) => {
  dispatch({type: types.SET_DIMENSIONS, payload: payload});
}

export const setOriginal = (dispatch, payload) => {
  dispatch({type: types.SET_ORIGINAL, payload: payload});
}

// export const updateUserName = (dispatch, payload) => {
//   dispatch({type: types."U", payload: payload});
// }

export const toggleLegend = (dispatch, payload) => {
  dispatch({type: types.TOGGLE_LEGEND, payload: payload});
}

export const updateCert = async (dispatch, payload) => {
  //console.log('updateCert - WebApi: ' + payload.certification)

  var j = {'skillID':parseInt(payload.skillID),'operatorID':parseInt(payload.operatorID),'currcertID':payload.currcertID}
  console.log('updateCert: ' + JSON.stringify(j))
  //console.log(payload)

  //console.log('skillID: ',  payload.skillID)
  //console.log('operatorID: ',  payload.operatorID)
  //console.log('certification: ',  payload.certification)

  // setTimeout(function(){
  //   alert('updateCert - WebApi call here: \n'
  //   + 'skillID: ' + payload.skillID + '\n'
  //   + 'operatorID: ' + payload.operatorID + '\n'
  //   + 'certification: ' + payload.certification + '\n'
  //   )
  // }, 50);

  //console.log('meta',  payload.meta)

  dispatch({type: types.UPDATE_CERT, payload: payload});
  //await API.graphql(graphqlOperation(updateCertification, { input: payload } ))
  //setAll(dispatch,false)
  //setActive(true)
  setAll(dispatch,{
    'first':true,
    'operatorsData':payload.operators,
    'skillsData':payload.skills,
    'certificationsData':payload.certifications,
    'multiplier': payload.multiplier
  })

  // setAll({
  //   'first':true,
  //   'operatorsData':operatorsData,
  //   'skillsData':props.props.skillsData,
  //   'certificationsData':certificationsDataCreated,
  //   'multiplier':multiplier
  // })
}
