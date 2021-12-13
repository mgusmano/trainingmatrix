import React, { useState, useEffect} from 'react';
import { useMatrixState } from './state/MatrixProvider';
import { Diamond } from './Diamond';
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Main = () => {
  //console.log(props.data.meta)
  const matrixState = useMatrixState();
  //var cellData = matrixState.cellData;
  //console.log(cellData)
  //console.log(props.data)
  //const matrixStateRef = useRef(matrixState);

  const [diamonddata, setDiamondData] = useState(null)
  const [metadata, setMetaData] = useState(null)
  const [certification, setCertification] = useState(null)
  const [startDate, setStartDate] = useState(null);
  const [certifiedDate, setCurrcertDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);

  var operator = {}
  var skill = {}
  var certificationID = "0"

  if (matrixState.cellData.meta !== undefined) {
    operator = matrixState.cellData.operator
    skill = matrixState.cellData.skill
    certificationID = matrixState.cellData.certificationID
  }

  //console.log(matrixState.cellData.meta)
  useEffect(() => {
    //console.log(matrixState.cellData.meta)
    if (matrixState.cellData.meta === undefined) {
      setDiamondData(null)
      setMetaData(null)
      setCertification(null)
      return
    }
    var data = matrixState.cellData.data
    var meta = matrixState.cellData.meta

    if (typeof data === 'string') {
      data = JSON.parse(data)
    }
    if (typeof meta === 'string') {
      meta = JSON.parse(meta)
    }
    console.log(meta)

    setDiamondData(data)
    setMetaData(meta)
    setCertification(meta.currcertID)

    if (meta.trainingStartDate !== null) {
      setStartDate(new Date(meta.trainingStartDate))
    }
    else {
      setStartDate(null)
    }

    // if (meta.startDate !== null) {
    //   setStartDate(new Date(meta.startDate))
    // }

    if (meta.certifiedDate !== null) {
      setCurrcertDate(new Date(meta.certifiedDate))
    }
    else {
      setCurrcertDate(null)
    }

    // if (meta.certificationDueDate !== null) {
    //   setDueDate(new Date(meta.certificationDueDate))
    // }
    // else {
    //   setCurrcertDate(null)
    // }

    if (meta.certificationDueDate !== null) {
      console.log(meta.certificationDueDate)
      //var newDate = new Date(dueDate + 'T00:00');
      var newDate = new Date(meta.certificationDueDate);
      console.log(newDate)
      var MyDateString = newDate.getFullYear() + '-' + ('0' + (newDate.getMonth()+1)).slice(-2) + '-' + ('0' + newDate.getDate()).slice(-2)
      console.log(MyDateString)
      setDueDate(MyDateString)

    }




  },[matrixState.cellData.meta,matrixState.cellData.data])

  const onChangeValue = (event) => {
    //console.log(event.target.value);
    setCertification(parseInt(event.target.value))
    var metaval = {
      certificationDueDate: matrixState.cellData.meta.certificationDueDate,
      certifiedDate: matrixState.cellData.meta.certifiedDate,
      currcertID: parseInt(event.target.value),
      letter: matrixState.cellData.meta.letter,
      trainingStartDate: matrixState.cellData.meta.trainingStartDate,
      type: "solid"


      // "type":"solid",
      // "currcertID":parseInt(event.target.value),
      // //"certification":event.target.title,
      // "strokecolor":matrixState.cellData.meta.strokecolor,
      // "letter":matrixState.cellData.meta.letter,
      // "trainingStartDate":matrixState.cellData.meta.start,
      // "certstate":matrixState.cellData.meta.certstate
    }
    setMetaData(metaval)
    var c = {
      cellData: matrixState.cellData,
      skillID: skill.skillID,
      operatorID: operator.operatorID,
      currcertID: parseInt(event.target.value),
      userID: matrixState.userID,
      groupID: matrixState.groupID,
      multiplier: matrixState.dimensions.multiplier
    }
    matrixState.updateCert(c)
  }

  // const onCertificationChange = async (event) => {
  //   if (metadata.type === 'solid') {
  //     var metaval = {
  //       "type":"solid",
  //       "currcertID":parseInt(event.target.value),
  //       "certification":event.target.title,
  //       "strokecolor":matrixState.cellData.meta.strokecolor,
  //       "letter":matrixState.cellData.meta.letter,
  //       "start":matrixState.cellData.meta.start,
  //       "certstate":matrixState.cellData.meta.certstate
  //     }

  //     // var newCerts = matrixState.certifications.slice();
  //     // const lastCertIndex = newCerts.findIndex(
  //     //   (cert) => cert.id === certificationID
  //     // )
  //     // if (lastCertIndex !== -1) {
  //     //   newCerts[lastCertIndex] = {
  //     //     "id": certificationID,
  //     //     "row": matrixState.cellData.row,
  //     //     "col": matrixState.cellData.col,
  //     //     "skill": skill,
  //     //     "operator": operator,
  //     //     "skillID": skill.id,
  //     //     "operatorID": operator.id,
  //     //     "currcertID":parseInt(event.target.value),
  //     //     "meta": metaval,
  //     //     "data": []
  //     //   }
  //     // }

  //     setMetaData(metaval)
  //     setCertification(parseInt(event.target.value))
  //     var c = {
  //       //id: certificationID,
  //       //row: matrixState.cellData.row,
  //       //col: matrixState.cellData.col,
  //       //skill: skill,
  //       //operator: operator,
  //       skillID: skill.skillID,
  //       operatorID: operator.operatorID,
  //       currcertID: parseInt(event.target.value),
  //       //meta: metaval,
  //       // skills: matrixState.skills,
  //       // operators: matrixState.operators,
  //       // certifications: newCerts,
  //       groupID: matrixState.groupID,
  //       multiplier: matrixState.dimensions.multiplier
  //     }
  //     matrixState.updateCert(c)
  //   }
  // }

  var disabled = false;
  var color = 'black'
  //console.log(metadata)
  if (metadata !== null) {
    //if (metadata.certstate === 'disabled') {
    if (metadata.trainingStartDate === null) {
      disabled = true;
      color = 'lightgray'
    }
  }


  //var link = `https://skillnetformsapp.azurewebsites.net?skillID=&{skill.skillID}&operatorID=12345&userID=12345`
  var link = `https://skillnetformsapp.azurewebsites.net?skillID=` + skill.skillID + `&operatorID=` + operator.operatorID

  // <DatePicker className='datepicker' width={'10px'} selected={dueDate} onChange={(date) => {

  //   //var d2 = new Date(date)
  //   //console.log(d2)
  //   //let text = d2.toLocaleDateString();
  //   //var d = d2.ToShortDateString()
  //   //console.log(text)
  //   //console.log(d)
  //   console.log(date)
  //   setDueDate(date)
  // }} />



  return (
    <div style={{boxSizing:'border-box',height:'500px',padding:'10px 0 0 40px',fontSize:'20px',display:'flex',flexDirection:'column'}}>

      <div style={{margin:'0 0 0 0',fontSize:'20px'}}>
        {skill.skillName}
      </div>

      {skill !== {} &&
      <div style={{margin:'5px 0 10px 0',fontSize:'12px'}}>
        <a target='_blank' rel='noreferrer' href={link}>Training Chart</a>
      </div>
      }

      {startDate !== null &&
      <div style={{margin:'5px 0 0 0',fontSize:'12px'}}>
        Training Start Date: {startDate.toLocaleDateString()}
      </div>
      }
      {startDate === null &&
      <div style={{margin:'5px 0 0 0',fontSize:'12px'}}>
        No Training Start Date
      </div>
      }

      {certifiedDate !== null &&
      <div style={{margin:'5px 0 0 0',fontSize:'12px'}}>
        Certification Date: {certifiedDate.toLocaleDateString()}
      </div>
      }
      {certifiedDate === null &&
      <div style={{margin:'5px 0 0 0',fontSize:'12px'}}>
        No Certification Date
      </div>
      }

      {certifiedDate !== null &&
      <div style={{display:'flex',flexDirection:'row',margin:'5px 0 0 0',fontSize:'12px'}}>
        <div style={{margin:'5px 1px 0 0',width:'60px'}}>Due Date:</div>
        <div style={{width:'170px'}}>
          <input type="date" value={dueDate}
            onChange={(e) => {
              //console.log(e)
              //console.log(e.target.value)
              //console.log(e.target.valueAsDate)
              var newDate = new Date(e.target.value + 'T00:00');
              console.log(newDate)
              // var y = newDate.getFullYear()
              // var m = newDate.getMonth()+1
              // var d = newDate.getDay()+1
              // var ydm = y + '-' + m + '-' + d
              // console.log(ydm)

              var MyDateString = newDate.getFullYear() + '-' + ('0' + (newDate.getMonth()+1)).slice(-2) + '-' + ('0' + newDate.getDate()).slice(-2)

             //+ newDate.getFullYear();
              //var dt = '2021-12-12'
              //setDueDate(newDate)
              setDueDate(MyDateString)
            }}
          />
        </div>
        <div
          style={{margin:'3px 0 7px 20px',width:'40px',fontSize:'12px',textDecoration:'underline',cursor: 'pointer'}}
          onClick={()=>{
            matrixState.setActive(true)
            //console.log(dueDate)
            var payload = {
              cellData: matrixState.cellData,
              skillID: skill.skillID,
              operatorID: operator.operatorID,
              dueDate: dueDate,
              partnerID: matrixState.partnerID,
              userID: matrixState.userID,
              groupID: matrixState.groupID,
              multiplier: matrixState.dimensions.multiplier
            }
            matrixState.updateDueDate(payload)
          }}
        >Update</div>
      </div>
      }

      <div style={{margin:'15px 0 0 0',fontSize:'18px'}}>
        Certification:
      </div>

      <div>
      <svg style={{margin:'5px 0 0 0'}} width="50" height="50">
        {diamonddata !== null && metadata !== null &&
        <Diamond meta={metadata} data={diamonddata} boxSize={40} padding={25}/>
        }
      </svg>
      </div>

      <div style={{margin:'0 0 0 0',display:'flex',fontSize:'12px',flexDirection:'column'}}>
      <div>
        <div><input checked={certification === 0} onChange={onChangeValue} type="radio" value={0} name="cert" /> 0 Not Applicable</div>
        <div><input checked={certification === 1} onChange={onChangeValue} type="radio" value={1} name="cert" /> 1 In Training</div>
        <div><input checked={certification === 2} onChange={onChangeValue} type="radio" value={2} name="cert" /> 2 Developing</div>
        <div style={{color:color}}><input disabled={disabled} checked={certification === 3} onChange={onChangeValue} type="radio" value={3} name="cert" /> 3 Certified</div>
        <div style={{color:color}}><input disabled={disabled} checked={certification === 4} onChange={onChangeValue} type="radio" value={4} name="cert" /> 4 Trainer</div>
        <div style={{color:color}}><input disabled={disabled} checked={certification === 5} onChange={onChangeValue} type="radio" value={5} name="cert" /> 5 Master Trainer</div>
      </div>
      </div>

      <div style={{margin:'180px 0 0 0',display:'flex',flexDirection:'column'}}>
        <div className='values' style={{fontSize:'12px',color:'white'}}>certificationID: {certificationID} skillID: {skill.skillID} operatorID: {operator.operatorID}</div>
      </div>

    </div>
  )
}

// {/*


//           <div style={{display:'flex',flexDirection:'row'}}>




//             <div style={{margin:'15px 0 0 30px',display:'flex',flexDirection:'column'}}>
//               Certification:


//               <div><input value="0" title="notapplicable" checked={certification === 0} onChange={onCertificationChange} style={{marginLeft:'20px'}} type="radio" name="percent2" /> 0 Not Applicable</div>
//               <div><input value="1" title="intraining" checked={certification === 1} onChange={onCertificationChange} style={{marginLeft:'20px'}} type="radio" name="percent2" /> 1 In Training</div>
//               <div><input value="2" title="developing" checked={certification === 2} onChange={onCertificationChange} style={{marginLeft:'20px'}} type="radio" name="percent2" /> 2 Developing</div>
// {certstate === '' &&
// <>
// <div><input value="3" title="certified" checked={certification === 3} onChange={onCertificationChange} style={{marginLeft:'20px'}} type="radio" name="percent2" /> 3 Certified</div>
// <div><input value="4" title="trainer" checked={certification === 4} onChange={onCertificationChange} style={{marginLeft:'20px'}} type="radio" name="percent2" /> 4 Trainer</div>
// <div><input value="5" title="mastertrainer"  checked={certification === 5} onChange={onCertificationChange} style={{marginLeft:'20px'}} type="radio" name="percent2" /> 5 Master Trainer</div>
// </>
// }
// {certstate === undefined &&
// <>
// <div><input value="3" title="certified" checked={certification === 3} onChange={onCertificationChange} style={{marginLeft:'20px'}} type="radio" name="percent2" /> 3 Certified</div>
// <div><input value="4" title="trainer" checked={certification === 4} onChange={onCertificationChange} style={{marginLeft:'20px'}} type="radio" name="percent2" /> 4 Trainer</div>
// <div><input value="5" title="mastertrainer" checked={certification === 5} onChange={onCertificationChange} style={{marginLeft:'20px'}} type="radio" name="percent2" /> 5 Master Trainer</div>
// </>
// }
// {certstate === 'disabled' &&
// <>
// <div style={{display:'flex',flexDirection:'row'}}><input value="3" title="certified" disabled checked={certification === 3} onChange={onCertificationChange} style={{marginLeft:'20px',color:'red'}} type="radio" name="percent2" /><div style={{color:'lightgray',paddingLeft:'5px',paddingTop:'2px'}}> 3 Certified</div></div>
// <div style={{display:'flex',flexDirection:'row'}}><input value="4" title="trainer" disabled checked={certification === 4} onChange={onCertificationChange} style={{marginLeft:'20px'}} type="radio" name="percent2" /><div style={{color:'lightgray',paddingLeft:'5px',paddingTop:'2px'}}> 4 Trainer</div></div>
// <div style={{display:'flex',flexDirection:'row'}}><input value="5" title="mastertrainer" disabled checked={certification === 5} onChange={onCertificationChange} style={{marginLeft:'20px'}} type="radio" name="percent2" /><div style={{color:'lightgray',paddingLeft:'5px',paddingTop:'2px'}}> 5 Master Trainer</div></div>
// </>
// }




//             </div>



//           </div>


//           */}


