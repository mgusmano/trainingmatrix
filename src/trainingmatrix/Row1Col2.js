import React from 'react';
//import { Matrix } from './Matrix';
import { MatrixCell } from './MatrixCell';
import { useMatrixState } from './state/MatrixProvider';
//import { Skill } from './Skill';
//import { styles } from './styles'
import { Top } from './Top';
import { Operator } from './Operator';
//import { Main } from './Main';
import { MatrixOneRow } from './MatrixOneRow';

export const Row1Col2 = (props) => {
  const {data} = props;
  const matrixState = useMatrixState();
  //const [num, setNum] = useState(0);
  const {row1,col2,fontsize,bandX} = matrixState.dimensions;

  const clickOperatorCell = (e,colid,rowid,type,data,col) => {
    //data.picture=""
    data.operator = {}
    data.operator.picture = ""

    data.skill = {}
    data.skill.skillName = ""
    //matrixState.setSpecific(<div style={{display:'flex', flexDirection:'row'}}><Operator data={data}/><Main data={data}/></div>)

    matrixState.setCellData(data)

    matrixState.showMainDialog('none')
    matrixState.showSkillDialog('none')
    matrixState.showOperatorDialog('block')
    matrixState.setTop(<Top data={data}/>)
    matrixState.showTopDialog('block')

    matrixState.setSpecific(<Operator data={data}/>)

  }

  const renderOperatorCell = (props,c,col,r,row,sTop,data,clickCellFunction) => {
    const {bandX, bandY, fontsize} = props

    //xsrc={'https://examples.sencha.com/extjs/7.4.0/examples/kitchensink/resources/images/staff/'+data.id+'.jpg'}
    //xwsrc={'data/trainingmatrix/pictures/Aaron Cariaga.JPG'}
    return (
      <g key={r+c} transform="translate(0,0)" className="header">
        <text style={{fontSize:fontsize+'px'}} alignmentBaseline="baseline" transform="translate(0,0) rotate(90)" x={bandX*1.4} y={-(bandX * c)-10} fill="black">{data.operatorName}</text>
        <foreignObject x={(bandX*c)+5} y={10} width='50px' height='50px'>
          <img
            alt="pic"
            src={'data/trainingmatrix/pictures/' + data.picture + ''}
            style={{borderRadius:'50%',width: bandX-10,height:bandX-10}}
          />
        </foreignObject>

        <MatrixCell
          xclickCellFunction={(e,rowid,colid) => {console.log(colid)}}
          clickCellFunction={clickCellFunction}
          data={data}
          rowid={null}
          colid={col.id}
          bandX={bandX}
          x={bandX*c}
          bandY={bandY}
          type="none"
        />
      </g>
    )
  }

  return (
    <div id="student" style={{width:(col2)+'px',maxWidth:(col2)+'px',boxSizing:'border-box',overflow:'hidden'}}>
    <div width={(col2)+'px'} height={row1+'px'}>
    <svg width={(col2)+'px'} height={row1+'px'}>
      <MatrixOneRow
        renderCellFunction={renderOperatorCell}
        clickCellFunction={clickOperatorCell}
        data={data}
        params={{
          name:'maintop',fontsize: fontsize,
          translateX:0,translateY:0,bandX:bandX,bandY:700
        }}
      />
    </svg>
    </div>
  </div>
  )
}
