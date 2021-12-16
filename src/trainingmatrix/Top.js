import React from 'react';
import { useMatrixState } from './state/MatrixProvider';

export const Top = React.memo(() => {
  const matrixState = useMatrixState();
console.log(matrixState.cellData)
  var img = '' + matrixState.cellData.picture + ''
  var show = true;
  if (matrixState.skillDialog === 'block' && matrixState.mainDialog === 'none') {
    show = false;
  }

  var operatorID = '';
  if (matrixState.cellData.operatorID === undefined) {
    if (matrixState.cellData.operator !== undefined)
    operatorID = matrixState.cellData.operator.operatorID;
  }
  else {
    operatorID = matrixState.cellData.operatorID
  }
  var link = `https://skillnetformsapp.azurewebsites.net/?operatorID=${operatorID}`

  var formText = 'Freshman Training Form';
  if (matrixState.cellData.freshmanTrainingCompleted === 1) {
    var formText = 'Freshman Training Form (Completed)';
  }

  console.log(matrixState.cellData)

  return (
    <div style={{boxSizing:'border-box',display:'flex',flexDirection:'column',fontSize:'12px',padding:'0px',width:'100%',background:'gainsboro'}}>
      <div style={{margin:'5px 0 0 5px',width:'50px',textDecoration:'underline',cursor: 'pointer'}}
        onClick={()=>{
          matrixState.showTopDialog('none')
          matrixState.showMainDialog('none')
          matrixState.showSkillDialog('none')
          matrixState.showOperatorDialog('none')
        }}>
        close
      </div>
      <div style={{boxSizing:'border-box',padding:'10px 20px 20px 30px',fontSize:'20px',marginLeft:'0px',marginTop:'0',height:'400px', borderBottom: '4px solid black'}}>
        {show === true &&
          <div style={{display:'flex',flexDirection:'row'}}>
            <img alt="pic" src={img} style={{borderRadius: '50%', x: '125px', y: '250px', width: '80px', height: '80px'}}/>
            <div style={{margin:'10px 0 0 10px'}}>
              <div style={{fontSize:'12px'}}>{matrixState.cellData.operatorName}</div>
              <div style={{fontSize:'12px'}}>{matrixState.cellData.title}</div>
              <div style={{fontSize:'12px'}}>{matrixState.cellData.plantName}</div>
              <div style={{fontSize:'12px'}}>{matrixState.cellData.location}</div>
            </div>
          </div>
        }
        {show === true &&
          <div style={{margin:'5px 0 0 0',fontSize:'12px'}}>
            <a target='_blank' rel='noreferrer' href={link}>{formText} </a>
          </div>
          }
      </div>
    </div>
  )
})
