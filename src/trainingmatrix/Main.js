import React, { useState, useEffect} from 'react';
import { useMatrixState } from './state/MatrixProvider';
import { Diamond } from './Diamond';

export const Main = (props) => {
  const matrixState = useMatrixState();
  //const matrixStateRef = useRef(matrixState);

  const [diamonddata, setDiamondData] = useState(null)
  const [metadata, setMetaData] = useState(null)
  const [certification, setCertification] = useState(null)
  const [startDate, setStartDate] = useState(null);
  const [currcertDate, setCurrcertDate] = useState(null);

  var operator = {}
  var skill = {}
  var certificationID = "0"

  if (matrixState.celldata.meta !== undefined) {
    operator = matrixState.celldata.operator
    skill = matrixState.celldata.skill
    certificationID = matrixState.celldata.certificationID
  }

  //console.log(matrixState.celldata.meta)
  useEffect(() => {
    //console.log(matrixState.celldata.meta)
    if (matrixState.celldata.meta === undefined) {
      setDiamondData(null)
      setMetaData(null)
      setCertification(null)
      return
    }
    var data = matrixState.celldata.data
    var meta = matrixState.celldata.meta
    //console.log(meta)
    if (typeof data === 'string') {
      data = JSON.parse(data)
    }
    if (typeof meta === 'string') {
      meta = JSON.parse(meta)
    }

    setDiamondData(data)
    setMetaData(meta)
    setCertification(meta.currcertID)

    if (meta.startDate !== null) {
      setStartDate(new Date(meta.startDate))
    }
    if (meta.currcertDate !== null) {
      setCurrcertDate(new Date(meta.currcertDate))
    }
  },[matrixState.celldata.meta,matrixState.celldata.data])

  const onChangeValue = (event) => {
    //console.log(event.target.value);
    setCertification(parseInt(event.target.value))
    var metaval = {
      "type":"solid",
      "currcertID":parseInt(event.target.value),
      //"certification":event.target.title,
      "strokecolor":matrixState.celldata.meta.strokecolor,
      "letter":matrixState.celldata.meta.letter,
      "start":matrixState.celldata.meta.start,
      "certstate":matrixState.celldata.meta.certstate
    }
    setMetaData(metaval)
    var c = {
      skillID: skill.skillID,
      operatorID: operator.operatorID,
      currcertID: parseInt(event.target.value),
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
  //       "strokecolor":matrixState.celldata.meta.strokecolor,
  //       "letter":matrixState.celldata.meta.letter,
  //       "start":matrixState.celldata.meta.start,
  //       "certstate":matrixState.celldata.meta.certstate
  //     }

  //     // var newCerts = matrixState.certifications.slice();
  //     // const lastCertIndex = newCerts.findIndex(
  //     //   (cert) => cert.id === certificationID
  //     // )
  //     // if (lastCertIndex !== -1) {
  //     //   newCerts[lastCertIndex] = {
  //     //     "id": certificationID,
  //     //     "row": matrixState.celldata.row,
  //     //     "col": matrixState.celldata.col,
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
  //       //row: matrixState.celldata.row,
  //       //col: matrixState.celldata.col,
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
  if (metadata !== null) {
    if (metadata.certstate === 'disabled') {
      disabled = true;
      color = 'lightgray'
    }
  }


  //var link = `https://skillnetformsapp.azurewebsites.net?skillID=&{skill.skillID}&operatorID=12345&userID=12345`
  var link = `https://skillnetformsapp.azurewebsites.net?skillID=` + skill.skillID + `&operatorID=` + operator.operatorID

  return (
    <div style={{boxSizing:'border-box',height:'500px',padding:'10px 0 0 40px',fontSize:'20px',display:'flex',flexDirection:'column'}}>

      <div style={{margin:'0 0 0 0',fontSize:'20px'}}>
        {skill.skillName}
      </div>

      {startDate !== null &&
      <div style={{margin:'5px 0 0 0',fontSize:'12px'}}>
        <a target='_blank' rel='noreferrer' href={link}>Training Chart</a>
      </div>
      }

      {startDate !== null &&
      <div style={{margin:'5px 0 0 0',fontSize:'12px'}}>
        Start Date: {startDate.toLocaleDateString()}
      </div>
      }

      {currcertDate !== null &&
      <div style={{margin:'5px 0 0 0',fontSize:'12px'}}>
        Current Cert Date: {currcertDate.toLocaleDateString()}
      </div>
      }

      {currcertDate !== null &&
        <div style={{margin:'5px 0 0 0',fontSize:'12px'}}>
          Due Date: {currcertDate.toLocaleDateString()}
        </div>
        }

      <div style={{margin:'15px 0 0 0',fontSize:'18px'}}>
        Certification:
      </div>

      <svg style={{margin:'5px 0 0 0'}} width="50" height="50">
        {diamonddata !== null && metadata !== null &&
        <Diamond meta={metadata} data={diamonddata} boxSize={40} padding={25}/>
        }
      </svg>

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
        <div className='values' style={{fontSize:'8px',color:'white'}}>certificationID: {certificationID} skillID: {skill.skillID} operatorID: {operator.operatorID}</div>
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


