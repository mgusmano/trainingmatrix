import * as types from './MatrixTypes';
import axios from "axios";

export const setAll = async (dispatch, payload) => {

  const callAll = async (dispatch,payload2) => {
    var groupID = payload2.groupID
    var multiplier = payload2.multiplier

    var data = await getData(groupID)

    var skills = data.skills
    var operators = data.operators
    var certificationsInit = data.certifications
    //var c = certificationsInit.slice()
    //console.log(c)

    var certifications = createCertifications(skills, operators, certificationsInit)
    if (payload2.cellData.meta !== undefined) {
      if (payload2.cellData.meta.skill !== undefined) {
        if (payload2.cellData.meta.skill.skillID !== undefined) {
          console.log(payload2.cellData)
          const filteredcertifications = certifications.filter(item => item.skill.skillID === payload2.cellData.skill.skillID && item.operator.operatorID === payload2.cellData.operator.operatorID);
          console.log(filteredcertifications)
          payload2.cellData.meta = filteredcertifications[0].meta
          dispatch({type: types.SET_CELLDATA, payload: payload2.cellData});
        }
      }
    }



    var totals = calcTotals(certifications, dispatch)

    dispatch({type: types.SET_ROWSARRAY, payload: totals.rowsArray});
    var transpose = m => m[0].map((x,i) => m.map(x => x[i]))
    if (totals.colsArray.length > 0) {
      var colsArraytransposed = transpose(totals.colsArray)
      dispatch({type: types.SET_COLSARRAY, payload: colsArraytransposed});
    }
    else {
      dispatch({type: types.SET_COLSARRAY, payload: []});
    }

    var rev = doRev(skills)
    dispatch({type: types.SET_REVARRAY, payload: rev});

    var bySkill = []
    var byOperator = []

    if (skills.length !== 0 && operators.length !== 0) {
      bySkill = doBySkill(operators,skills,certifications)
      byOperator = doByOperator(operators,skills,certifications)
    }

    var sLen = skills.length
    var oLen = operators.length
    setInit({sLen,oLen,multiplier})



    var payload = {
      bySkill: bySkill,
      byOperator: byOperator,
      operators: operators,
      skills: skills,
      certifications: certifications
    }
    dispatch({type: types.SET_GROUPID, payload: payload2.groupID});
    dispatch({type: types.SET_ALL, payload: payload});
    dispatch({type: types.SET_ACTIVE, payload: false});
  }

  const getData = async (groupID) => {
    const apiRoot = 'https://skillnetusersapi.azurewebsites.net/api';
    //const localRoot = 'http://localhost:3005';
    //const localRoot = 'https://my-json-server.typicode.com/mgusmano/toshibaserver';
    const auth = {auth:{username:'skillnet',password:'demo'}};

    const skillsUrl = `${apiRoot}/PortalGroupSkillsOnly?groupid=${groupID}`
    const skills2Result = await axios(skillsUrl,auth);
    const operatorsUrl = `${apiRoot}/PortalGroupOperators?groupid=${groupID}`
    const operators2Result = await axios(operatorsUrl,auth);
    const certificationsUrl = `${apiRoot}/PortalCertificationsRating?groupid=${groupID}`
    const certifications2Result = await axios(certificationsUrl,auth);

    console.log(skillsUrl)
    console.log(operatorsUrl)
    console.log(certificationsUrl)

    // //just for the webAPI data while it is broken
    // var certifications2Resultdata = []
    // certifications2Result.data.map((certification,i) => {
    //   //console.log(certification)
    //   var o = certification
    //   o.meta.startDate = o.meta.start
    //   o.meta.currcertDate = new Date().toUTCString()
    //   o.meta.currcertStatus = 1
    //   delete o.meta.start;
    //   certifications2Resultdata.push(o)
    //   return null
    // })
    // //console.log(certifications2Resultdata)

    // //just for the webAPI data while it is broken
    // var operatorsResultdata = []
    // operatorsResult.data.map((operator,i) => {
    //   var o = {}
    //   o.operatorID = operator.operatorID;
    //   o.operatorName = operator.operatorName;
    //   o.groupID = groupID;
    //   o.picture = "AaronCariaga.jpg";
    //   o.goal = 4;
    //   operatorsResultdata.push(o)

    //   return null
    // })

    // //just for the webAPI data while it is broken
    //const skills3Resultdata = skills2Result.data.slice(0, 19);

    var r = {
      skills: skills2Result.data,
      operators: operators2Result.data,
      certifications: certifications2Result.data
    }
    return r
  }

  const createCertifications = (skills, operators, certificationsData) => {
    var certificationsDataCreated = []
    var certID = 0

    for (let s = 0; s < skills.length; s++) {
      for (let o = 0; o < operators.length; o++) {
        certID++
        certificationsDataCreated.push({
          "id": certID,
          "row":s,
          "col":o,
          "skill":skills[s],
          "operator":operators[o],
          "skillID": skills[s].skillID,
          "operatorID": operators[o].operatorID,
          "currcertID": 0,
          "meta": {
            certifiedDate: null,
            certstatus: null,
            currcertDate: null,
            currcertID: 0,
            currcertStatus: 0,
            letter: "",
            startDate: null,
            trainingStartDate: null,
            type: "solid"


            // "type":"solid",
            // "currcertID": 0,
            // "startDate": null, //new Date().toUTCString(),
            // "currcertDate": null, //new Date().toUTCString(),
            // "currcertStatus": 0,
            // "certification":"notapplicable",
            // "strokecolor":"black",
            // "letter":"",
            // //"start":"",
            // "certstate": "disabled"
          },
          "data": []
        })
      }
    }

    for (let o = 0; o < certificationsData.length; o++) {
      var found = certificationsDataCreated.find(element => {
        var c;
        // console.log(element.skillID)
        // console.log(certificationsData[o].skillID)
        // console.log(element.operatorID)
        // console.log(certificationsData[o].operatorID)
        if (element.skillID === certificationsData[o].skillID && element.operatorID === certificationsData[o].operatorID) {
          c = certificationsData[o]
        }
        return c
      });
      //console.log(found)
      //console.log(found)
      if (found !== undefined) {
        found.meta = certificationsData[o].meta
        found.data = certificationsData[o].data
      }
    }
    return certificationsDataCreated;

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
        if (certByRow[i].skill.goal === 0) {
          certByRow[i].skill.goal = 1
        }
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
        if (certByCol[i].operator.goal === 0) {
          certByCol[i].operator.goal = 1
        }
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
    return {
      rowsArray,
      colsArray
    }
  }

  const doRev = (skills) => {
    var rev = [];
    skills.map((skill,o) => {
      rev.push(skill.rev)
      return null
    });
    return rev;
  }

  const doBySkill = (operators, skills, certifications) => {
    var bySkill = []
    skills.map((skill,s) => {
      var o = {}
      o = skill
      o.meta = skill
      o.data = []
      const filteredcertifications = certifications.filter(item => item.skillID === skill.skillID);
      filteredcertifications.map((fc,i) => {
        var operator  = operators.find(item => item.operatorID === fc.operatorID);
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
    return bySkill
  }

  const doByOperator = (operators, skills, certifications) => {
    var byOperator = []
    operators.map((operator,o) => {
      o = operator
      o.meta = operator
      o.data = []
      const filteredcertifications = certifications.filter(item => item.operatorID === operator.operatorID);
      filteredcertifications.map((fc,i) => {
        var skill  = skills.find(item => item.skillID === fc.skillID);
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
    return byOperator
  }

  const setInit = (o) => {
    var x = o.oLen
    var y = o.sLen
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


  if (payload.cellData.meta !== undefined) {
    console.log('has data')
    console.log(payload.cellData)
  }
  callAll(dispatch, payload)
}

export const doDBCert = async (payload) => {
  const apiRoot = 'https://skillnetusersapi.azurewebsites.net/api';
  //const localRoot = 'http://localhost:3005';
  //const localRoot = 'https://my-json-server.typicode.com/mgusmano/toshibaserver';
  const auth = {auth:{username:'skillnet',password:'demo'}};

  var url = `${apiRoot}/PortalGroupUpdateOperatorCertification`;
  var j = `?groupID=${payload.groupID}&skillID=${payload.skillID}&operatorID=${payload.operatorID}&currcertID=${payload.currcertID}&userID=${payload.userID}`
  console.log(url+j)
  //const updateResult =
  //await axios.post(url+j,auth);
  try {
    const updateResult = await axios.post(url+j,auth);
    //console.log(updateResult)
    if (updateResult.status !== 200) {
      alert(updateResult.statusText)
    }
  }
  catch(e) {
    alert(e)
  }
}

export const updateCert = async (dispatch, payload) => {
  dispatch({type: types.SET_ACTIVE, payload: true});
  doDBCert(payload);
  setAll(dispatch,{
    'cellData': payload.cellData,
    'partnerID': payload.partnerID,
    'userID': payload.userID,
    'groupID': payload.groupID,
    'multiplier': payload.multiplier
  })
}

export const doDBSkillGoal = async (payload) => {
  const apiRoot = 'https://skillnetusersapi.azurewebsites.net/api';
  const auth = {auth:{username:'skillnet',password:'demo'}};
  var url = `${apiRoot}/UpdateSkillGoal`;
  var j = `?groupID=${payload.groupID}&skillID=${payload.skillID}&goal=${payload.goal}&userID=${payload.userID}`
  console.log(url+j)
  try {
    const updateResult = await axios.post(url+j,auth);
    if (updateResult.status !== 200) {
      alert(updateResult.statusText)
    }
  }
  catch(e) {
    alert(e)
  }
}

export const updateSkillGoal = (dispatch, payload) => {
  console.log(payload)
  if (isNaN(payload.goal) || payload.goal === '') {
    alert('Goal is not a number')
    dispatch({type: types.SET_ACTIVE, payload: false});
    return
  }
  // var newSkills = payload.skills.slice();
  // const lastSkillIndex = newSkills.findIndex(
  //   (skill) => skill.id === payload.id
  // )
  // var oldSkill = payload.skills[lastSkillIndex]
  // if (lastSkillIndex !== -1) {
  //   newSkills[lastSkillIndex] = {
  //     "skillID": oldSkill.skillID,
  //     "groupID": oldSkill.groupID,
  //     "skillName": oldSkill.skillName,
  //     "goal": parseInt(payload.goal)
  //   }
  // }

  var j = {'skillID':payload.skillID,'goal':parseInt(payload.goal)}
  console.log('updateSkillGoal: ' + JSON.stringify(j))
  doDBSkillGoal(payload);

  setAll(dispatch,{
    'cellData': payload.cellData,
    'partnerID': payload.partnerID,
    'userID': payload.userID,
    'groupID': payload.groupID,
    'multiplier': payload.multiplier
  })


  // //console.log(newSkills)
  // dispatch({type: types.UPDATE_SKILLGOAL, payload: {skills:newSkills}});
  // setAll(dispatch,{
  //   //'first':true,
  //   //'skillsData':newSkills,
  //   //'operatorsData':payload.operators,
  //   //'certificationsData':payload.certifications,
  //   'groupID': oldSkill.groupID,
  //   'multiplier': payload.multiplier
  // })

  // API.graphql(graphqlOperation(updateSkill, { input: payload } ))
  // .then(() => {
  //   dispatch({type: types.UPDATE_SKILLGOAL, payload: payload});
  //   setAll(dispatch,false)
  // })
}

export const doDBSkillRev = async (payload) => {
  const apiRoot = 'https://skillnetusersapi.azurewebsites.net/api';
  const auth = {auth:{username:'skillnet',password:'demo'}};
  var url = `${apiRoot}/UpdateSkillRev`;
  var j = `?groupID=${payload.groupID}&skillID=${payload.skillID}&rev=${payload.rev}&userID=${payload.userID}`
  console.log(url+j)
  //const updateResult = await axios.post(url+j,auth);
  //console.log(updateResult)
  try {
    const updateResult = await axios.post(url+j,auth);
    if (updateResult.status !== 200) {
      alert(updateResult.statusText)
    }
  }
  catch(e) {
    alert(e)
  }
}

export const updateSkillRev = (dispatch, payload) => {
  console.log(payload.rev)
  if (isNaN(payload.rev) || payload.rev === '') {
    alert('Rev# is not a number')
    dispatch({type: types.SET_ACTIVE, payload: false});
    return
  }
  var j = {'skillID':payload.skillID,'rev':parseInt(payload.rev)}
  console.log('updateSkillRev: ' + JSON.stringify(j))
  doDBSkillRev(payload);

  setAll(dispatch,{
    'cellData': payload.cellData,
    'partnerID': payload.partnerID,
    'userID': payload.userID,
    'groupID': payload.groupID,
    'multiplier': payload.multiplier
  })
}

export const doDBOperatorGoal = async (payload) => {
  const apiRoot = 'https://skillnetusersapi.azurewebsites.net/api';
  const auth = {auth:{username:'skillnet',password:'demo'}};
  var url = `${apiRoot}/Updateoperatorgoal`;
  var j = `?groupID=${payload.groupID}&operatorID=${payload.operatorID}&goal=${payload.goal}&userID=${payload.userID}`
  console.log(url+j)
  //const updateResult = await axios.post(url+j,auth);
  //console.log(updateResult)
  try {
    const updateResult = await axios.post(url+j,auth);
    if (updateResult.status !== 200) {
      alert(updateResult.statusText)
    }
  }
  catch(e) {
    alert(e)
  }
}

export const updateOperatorGoal = async (dispatch,payload) => {
  console.log(payload.goal)
  if (isNaN(payload.goal) || payload.goal === '') {
    alert('Goal is not a number')
    dispatch({type: types.SET_ACTIVE, payload: false});
    return
  }

  var j = {'operatorID':payload.operatorID,'goal':parseInt(payload.goal)}
  console.log('updateOperatorGoal: ' + JSON.stringify(j))
  doDBOperatorGoal(payload);

  setAll(dispatch,{
    'cellData': payload.cellData,
    'partnerID': payload.partnerID,
    'userID': payload.userID,
    'groupID': payload.groupID,
    'multiplier': payload.multiplier
  })


  // var groupID = 1
  // const operatorsResult = await axios(`data/trainingmatrix/data/${groupID}/operators.json`);
  // var newOperators = operatorsResult.data;

  // const apiRoot = 'https://skillnetusersapi.azurewebsites.net/api/';
  // const updateOperatorGoalResult = await axios.post(
  //   apiRoot + 'UpdateOperatorGoal?partnerid=448',
  //   {'operatorID':payload.id,'goal':parseInt(payload.goal)},
  //   {auth:{username:'skillnet',password:'demo'}}
  // );
  // var newOperators = updateOperatorGoalResult.data;

  // var newOperators = payload.operators.slice();
  // const lastOperatorIndex = newOperators.findIndex(
  //   (operator) => operator.id === payload.id
  // )
  // var oldOperator = payload.operators[lastOperatorIndex]
  // if (lastOperatorIndex !== -1) {
  //   newOperators[lastOperatorIndex] = {
  //     "id": oldOperator.id,
  //     "groupID": oldOperator.groupID,
  //     "operatorName": oldOperator.operatorName,
  //     "picture": oldOperator.picture,
  //     "goal": parseInt(payload.goal)
  //   }
  // }
  // //console.log(newOperators)
  // dispatch({type: types.UPDATE_OPERATORGOAL, payload: {operators:newOperators}});

  // setAll(dispatch,{
  //   'first':true,
  //   'skillsData':payload.skills,
  //   'operatorsData':newOperators,
  //   'certificationsData':payload.certifications,
  //   'multiplier': payload.multiplier
  // })

  // API.graphql(graphqlOperation(updateOperator, { input: payload } ))
  // .then(() => {
  //   dispatch({type: types.UPDATE_OPERATORGOAL, payload: payload});
  //   setAll(dispatch,false)
  // })
}

export const doDBDueDate = async (payload) => {
  const apiRoot = 'https://skillnetusersapi.azurewebsites.net/api';
  const auth = {auth:{username:'skillnet',password:'demo'}};
  var url = `${apiRoot}/UpdateDueDate`;
  var j = `?groupID=${payload.groupID}&skillID=${payload.skillID}&operatorID=${payload.operatorID}&dueDate=${payload.dueDate}&userID=${payload.userID}`
  console.log(url+j)
  // const updateResult = await axios.post(url+j,auth);
  // console.log(updateResult)
  try {
    const updateResult = await axios.post(url+j,auth);
    if (updateResult.status !== 200) {
      alert(updateResult.statusText)
    }
  }
  catch(e) {
    alert(e)
  }
}

export const updateDueDate = async (dispatch,payload) => {
  console.log(payload.dueDate)

  var d2 = new Date(payload.dueDate)
  //console.log(d2)
  let textDate = d2.toLocaleDateString();
  console.log(textDate)

  var isDate = payload.dueDate instanceof Date && !isNaN(payload.dueDate.valueOf());
  if (!isDate || payload.dueDate === null) {
    alert('Due Date is not a Date')
    dispatch({type: types.SET_ACTIVE, payload: false});
    return
  }

  payload.dueDate = textDate
  var j = {'operatorID':payload.operatorID,'dueDate':payload.dueDate}
  console.log('updateDueDate: ' + JSON.stringify(j))
  doDBDueDate(payload);

  setAll(dispatch,{
    'cellData': payload.cellData,
    'partnerID': payload.partnerID,
    'userID': payload.userID,
    'groupID': payload.groupID,
    'multiplier': payload.multiplier
  })

}

export const setPartnerID = (dispatch, payload) => {
  dispatch({type: types.SET_PARTNERID, payload: payload});
}
export const setUserID = (dispatch, payload) => {
  dispatch({type: types.SET_USERID, payload: payload});
}
export const setGroupID = (dispatch, payload) => {
  dispatch({type: types.SET_GROUPID, payload: payload});
}
export const setRowsArray = (dispatch, payload) => {
  dispatch({type: types.SET_ROWSARRAY, payload: payload});
}
export const setColsArray = (dispatch, payload) => {
  dispatch({type: types.SET_COLSARRAY, payload: payload});
}
export const setRevArray = (dispatch, payload) => {
  dispatch({type: types.SET_REVARRAY, payload: payload});
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
export const setActive = (dispatch, payload) => {
  dispatch({type: types.SET_ACTIVE, payload: payload});
}
export const setAuthenticatedUser = (dispatch, payload) => {
  dispatch({type: types.SET_AUTHENTICATEDUSER, payload: payload});
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
export const toggleLegend = (dispatch, payload) => {
  dispatch({type: types.TOGGLE_LEGEND, payload: payload});
}
