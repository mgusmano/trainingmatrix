import React from 'react';
import { Matrix } from './Matrix';
import { useMatrixState } from './state/MatrixProvider';

export const Row1Col1a = (props) => {
  const {data} = props;
  const matrixState = useMatrixState();
  //const [num, setNum] = useState(0);
  const {row1,col1a,fontsize,bandX} = matrixState.dimensions;

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
    <div style={{width:col1a+'px',minWidth:col1a+'px',height:row1+'px'}}>
    <div width={col1a+'px'} height={row1+'px'}>
    <svg width={col1a+'px'} height={row1+'px'}>
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
