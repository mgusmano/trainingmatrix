import React from 'react';
import { Matrix } from './Matrix';
//import { MatrixCell } from './MatrixCell';
import { useMatrixState } from './state/MatrixProvider';
//import { Skill } from './Skill';
//import { styles } from './styles'
//import { Operator } from './Operator';
//import { MatrixOneRow } from './MatrixOneRow';

export const Row1Col3 = (props) => {
  const {data} = props;
  const matrixState = useMatrixState();
  //const [num, setNum] = useState(0);
  const {row1,col3,fontsize,bandX} = matrixState.dimensions;

  const renderTotalsHeading = (props,c,col,r) => {
    const {bandX, fontsize} = props
    return (
      <g key={r+c} transform="translate(0,0)" className="cell">
        <text
          style={{fontSize:fontsize+'px'}}
          dominantBaseline="left"
          textAnchor="end"
          alignmentBaseline="baseline"
          transform="translate(0,0) rotate(90)"
          x={bandX*3.8}
          y={-(bandX * c)-10}
          fill="black"
        >
          {col}
        </text>
      </g>
    )
  }

  return (
    <div style={{width:col3+'px',minWidth:col3+'px',height:row1+'px',overflowY:'hidden',boxSizing:'border-box'}}>
    <div width={col3+'px'} height={row1+'px'}>
    <svg width={col3+'px'} height={row1+'px'}>
      <Matrix
        renderCellFunction={renderTotalsHeading}
        data={data}
        params={{
          name:'totalsrightheading',fontsize: fontsize,
          translateX:0,translateY:0,bandX:bandX,bandY:row1
        }}
      />
    </svg>
    </div>
  </div>
  )
}
