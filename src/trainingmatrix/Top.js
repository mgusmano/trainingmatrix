import React from 'react';
import { useMatrixState } from './state/MatrixProvider';

export const Top = React.memo(() => {
  const matrixState = useMatrixState();
  var img = '' + matrixState.celldata.picture + ''
  var show = true;
  if (matrixState.skillDialog === 'block' && matrixState.mainDialog === 'none') {
    show = false;
  }

  return (
    <div style={{display:'flex',flexDirection:'column',padding:'10px',width:'100%',xheight:'500px',background:'gainsboro'}}>
      <button style={{width:'50px'}}
        onClick={()=>{
          matrixState.showTopDialog('none')
          matrixState.showMainDialog('none')
          matrixState.showSkillDialog('none')
          matrixState.showOperatorDialog('none')
        }}>
        close
      </button>
      <div style={{marginLeft:'30px',marginTop:'5',height:'400px', borderBottom: '4px solid black'}}>
        {show &&
          <>
          <img alt="pic" src={img} style={{borderRadius: '50%', x: '125px', y: '250px', width: '80px', height: '80px'}}/>
          <div style={{marginTop:'10px',fontSize:'20px'}}>{matrixState.celldata.operatorName}</div>
          <div>Title</div>
          <div>Plant Name</div>
          <div>Location</div>
          </>
        }
      </div>
    </div>
  )
})
