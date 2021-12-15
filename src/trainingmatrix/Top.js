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
  console.log(matrixState.cellData.operatorID)
  if (matrixState.cellData.operatorID === undefined) {
    if (matrixState.cellData.operator !== undefined)
    operatorID = matrixState.cellData.operator.operatorID;
  }
  else {
    operatorID = matrixState.cellData.operatorID
  }
  var link = `https://skillnetformsapp.azurewebsites.net/?operatorID=${operatorID}`

  console.log(matrixState.cellData)

  return (
    <div style={{boxSizing:'border-box',display:'flex',flexDirection:'column',fontSize:'12px',padding:'0px',width:'100%',xheight:'500px',background:'gainsboro'}}>
      <div style={{width:'50px',textDecoration:'underline',cursor: 'pointer'}}
        onClick={()=>{
          matrixState.showTopDialog('none')
          matrixState.showMainDialog('none')
          matrixState.showSkillDialog('none')
          matrixState.showOperatorDialog('none')
        }}>
        close
      </div>
      <div style={{boxSizing:'border-box',padding:'10px 20px 20px 30px',fontSize:'20px',marginLeft:'0px',marginTop:'0',height:'400px', borderBottom: '4px solid black'}}>
        {show &&
          <>
          <img alt="pic" src={img} style={{borderRadius: '50%', x: '125px', y: '250px', width: '80px', height: '80px'}}/>
          <div style={{marginTop:'2px'}}>{matrixState.cellData.operatorName}</div>
          <div style={{fontSize:'12px'}}>{matrixState.cellData.title}</div>
          <div style={{fontSize:'12px'}}>{matrixState.cellData.plantName} - {matrixState.cellData.location}</div>
          </>
        }
        {show !== null &&
          <div style={{margin:'5px 0 0 0',fontSize:'12px'}}>
            <a target='_blank' rel='noreferrer' href={link}>Freshman Training Form</a>
          </div>
          }
      </div>
    </div>
  )
})
