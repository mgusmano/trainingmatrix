import React, { useState } from 'react';
import { Matrix } from './Matrix';
import { MatrixCell } from './MatrixCell';
import { useMatrixState } from './state/MatrixProvider';
import { Skill } from './Skill';
import { Top } from './Top';
//import { Main } from './Main';
import { styles } from './styles'

export const Row2Col1 = (props) => {
  const {data} = props;
  const matrixState = useMatrixState();
  const [num, setNum] = useState(0);
  const {row2,col1,fontsize,bandY} = matrixState.dimensions;

  const clickSkillCell = (e,colid,rowid,type,data,col) => {
    setNum(num + 1);
    matrixState.setCellData({})
    matrixState.setSpecific(<Skill data={data} num={num}/>)

    //matrixState.showSkillDialog('block')
    //matrixState.showMainDialog('none')
    ////matrixState.showSecondaryDialog('none')
    //matrixState.showOperatorDialog('none')

    matrixState.showMainDialog('none')
    matrixState.showSkillDialog('block')
    matrixState.showOperatorDialog('none')
    matrixState.setTop(<Top data={data}/>)
    matrixState.showTopDialog('block')



    //matrixState.setSpecific(<div style={{display:'flex', flexDirection:'row'}}><Skill data={data} num={num}/><Main data={data}/></div>)

  }

  const renderSkillCell = (props,c,col,r,row,sTop,data,clickCellFunction) => {
    const {bandX, bandY} = props
    return (
      <g transform={"translate(" + (c*bandX) + ",0)"} className="group" >
        <text
          dominantBaseline="left"
          textAnchor="end"
          x={(bandX*(c+1))-10}
          y={bandY-(bandY/3)}
          className="text"
          style={{fontSize:matrixState.dimensions.fontsize+'px'}}>
            {data.skill.skillName}
        </text>
        <MatrixCell
          clickCellFunction={clickCellFunction}
          data={data}
          rowid={null}
          colid={col.id}
          bandX={bandX}
          bandY={bandY}
          type="pie"
        />
      </g>
    )
  }

  return (
    <div id="skill" style={{...styles.v,width:col1+'px',minWidth:col1+'px',overflow:'hidden'}} className='skillsheet' >
      <div width={col1+'px'} height={row2+'px'} >
      <svg width={col1+'px'} height={row2+'px'}>
      {data !== null &&
      <Matrix
        renderCellFunction={renderSkillCell}
        clickCellFunction={clickSkillCell}
        data={data}
        params={{
          name:'skills',fontsize: fontsize,
          translateX:0,translateY:0,bandX:col1,bandY:bandY
        }}
      />
      }
      </svg>
      </div>
    </div>
  )
}

// const styles = {
//   horizontal: {
//     display:'flex',
//     flex:1,
//     flexDirection:'row',
//     boxSizing:'border-box',
//     border:'0px solid blue',
//     overflow:'hidden'
//   },
//   vertical: {
//     display:'flex',
//     flex:1,
//     flexDirection:'column',
//     boxSizing:'border-box',
//     border:'0px solid blue',
//     overflow:'hidden'
//   },

//   h: {
//     display:'flex',
//     flexDirection:'row',
//     boxSizing:'border-box',
//     border:'0px solid blue',
//     overflow:'hidden'
//   },
//   v: {
//     display:'flex',
//     flexDirection:'column',
//     boxSizing:'border-box',
//     border:'0px solid blue',
//     overflow:'hidden'
//   },
// };