import React, { useState, useEffect} from 'react';
import { useMatrixState } from './state/MatrixProvider';
import { Diamond } from './Diamond';

export const Main = (props) => {
  const matrixState = useMatrixState();
  const [diamonddata, setDiamondData] = useState(null)
  const [metadata, setMetaData] = useState(null)
  const [certification, setCertification] = useState(null)
  const [startDate, setStartDate] = useState(new Date());

  var operator = {}
  var skill = {}
  var certificationID = "0"

  if (matrixState.celldata.meta !== undefined) {
    operator = matrixState.celldata.operator
    skill = matrixState.celldata.skill
    certificationID = matrixState.celldata.certificationID
  }

  useEffect(() => {
    if (matrixState.celldata.meta === undefined) {
      setDiamondData(null)
      setMetaData(null)
      setCertification(null)
      return
    }
    var data = matrixState.celldata.data
    var meta = matrixState.celldata.meta
    if (typeof data === 'string') {
      data = JSON.parse(data)
    }
    if (typeof meta === 'string') {
      meta = JSON.parse(meta)
    }

    setDiamondData(data)
    setMetaData(meta)
    setCertification(meta.currcertID)

    if (meta.start !== undefined) {
      setStartDate(new Date(meta.start))
    }
  },[props.data.meta.certification])

  const onCertificationChange = async (event) => {
    if (metadata.type === 'solid') {
      var metaval = {
        "type":"solid",
        "currcertID":parseInt(event.target.value),
        "certification":event.target.title,
        "strokecolor":matrixState.celldata.meta.strokecolor,
        "letter":matrixState.celldata.meta.letter,
        "start":matrixState.celldata.meta.start,
        "certstate":matrixState.celldata.meta.certstate
      }

      // var newCerts = matrixState.certifications.slice();
      // const lastCertIndex = newCerts.findIndex(
      //   (cert) => cert.id === certificationID
      // )
      // if (lastCertIndex !== -1) {
      //   newCerts[lastCertIndex] = {
      //     "id": certificationID,
      //     "row": matrixState.celldata.row,
      //     "col": matrixState.celldata.col,
      //     "skill": skill,
      //     "operator": operator,
      //     "skillID": skill.id,
      //     "operatorID": operator.id,
      //     "currcertID":parseInt(event.target.value),
      //     "meta": metaval,
      //     "data": []
      //   }
      // }

      setMetaData(metaval)
      setCertification(parseInt(event.target.value))
      var c = {
        //id: certificationID,
        //row: matrixState.celldata.row,
        //col: matrixState.celldata.col,
        //skill: skill,
        //operator: operator,
        skillID: skill.skillID,
        operatorID: operator.operatorID,
        currcertID: parseInt(event.target.value),
        //meta: metaval,
        // skills: matrixState.skills,
        // operators: matrixState.operators,
        // certifications: newCerts,
        groupID: matrixState.groupID,
        multiplier: matrixState.dimensions.multiplier
      }
      matrixState.updateCert(c)
    }
  }

  var certstate = '';
  if (metadata !== null) {
    //console.log(metadata)
    //console.log(metadata.certstate)
    certstate = metadata.certstate;

  }
  //console.log(certstate)

  return (
    <div style={{padding:'10px'}}>
      <div>
        <div style={{display:'flex',flexDirection:'column'}}>
          <div style={{display:'flex',flexDirection:'column',xheight:'100px',borderBottom: '0px solid black'}}>
            <div style={{marginLeft:'30px',fontSize:'20px'}}>{skill.skillName}</div>
          </div>
          <div style={{marginTop:'5px',marginLeft:'30px'}}>
            <a href="http://www.microsoft.com">Certification Form</a>
          </div>
          <div style={{marginTop:'5px',marginLeft:'30px',display:'flex',flexDirection:'column'}}>
            Started: {startDate.toLocaleDateString()}
          </div>
          <div style={{display:'flex',flexDirection:'row'}}>
            <div style={{marginTop:'15px',marginLeft:'30px',display:'flex',flexDirection:'column'}}>
              Certification:
              <div><input value="0" title="notapplicable" checked={certification === 0} onChange={onCertificationChange} style={{marginLeft:'20px'}} type="radio" name="percent2" /> 0 Not Applicable</div>
              <div><input value="1" title="intraining" checked={certification === 1} onChange={onCertificationChange} style={{marginLeft:'20px'}} type="radio" name="percent2" /> 1 In Training</div>
              <div><input value="2" title="developing" checked={certification === 2} onChange={onCertificationChange} style={{marginLeft:'20px'}} type="radio" name="percent2" /> 2 Developing</div>
{certstate === '' &&
<>
<div><input value="3" title="certified" checked={certification === 3} onChange={onCertificationChange} style={{marginLeft:'20px'}} type="radio" name="percent2" /> 3 Certified</div>
<div><input value="4" title="trainer" checked={certification === 4} onChange={onCertificationChange} style={{marginLeft:'20px'}} type="radio" name="percent2" /> 4 Trainer</div>
<div><input value="5" title="mastertrainer"  checked={certification === 5} onChange={onCertificationChange} style={{marginLeft:'20px'}} type="radio" name="percent2" /> 5 Master Trainer</div>
</>
}
{certstate === undefined &&
<>
<div><input value="3" title="certified" checked={certification === 3} onChange={onCertificationChange} style={{marginLeft:'20px'}} type="radio" name="percent2" /> 3 Certified</div>
<div><input value="4" title="trainer" checked={certification === 4} onChange={onCertificationChange} style={{marginLeft:'20px'}} type="radio" name="percent2" /> 4 Trainer</div>
<div><input value="5" title="mastertrainer" checked={certification === 5} onChange={onCertificationChange} style={{marginLeft:'20px'}} type="radio" name="percent2" /> 5 Master Trainer</div>
</>
}
{certstate === 'disabled' &&
<>
<div style={{display:'flex',flexDirection:'row'}}><input value="3" title="certified" disabled checked={certification === 3} onChange={onCertificationChange} style={{marginLeft:'20px',color:'red'}} type="radio" name="percent2" /><div style={{color:'lightgray',paddingLeft:'5px',paddingTop:'2px'}}> 3 Certified</div></div>
<div style={{display:'flex',flexDirection:'row'}}><input value="4" title="trainer" disabled checked={certification === 4} onChange={onCertificationChange} style={{marginLeft:'20px'}} type="radio" name="percent2" /><div style={{color:'lightgray',paddingLeft:'5px',paddingTop:'2px'}}> 4 Trainer</div></div>
<div style={{display:'flex',flexDirection:'row'}}><input value="5" title="mastertrainer" disabled checked={certification === 5} onChange={onCertificationChange} style={{marginLeft:'20px'}} type="radio" name="percent2" /><div style={{color:'lightgray',paddingLeft:'5px',paddingTop:'2px'}}> 5 Master Trainer</div></div>
</>
}
            </div>
            <svg style={{marginLeft:'30',marginTop:'5'}} width="50" height="50">
              {diamonddata !== null && metadata !== null &&
              <Diamond meta={metadata} data={diamonddata} boxSize={40} padding={25}/>
              }
            </svg>
          </div>
        </div>
        <div style={{fontSize:'12px',marginTop:'120px'}}>certificationID: {certificationID} - skill.id: {skill.id} - operator.id: {operator.id}</div>
      </div>
    </div>
  )
}
