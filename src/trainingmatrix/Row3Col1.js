import React from 'react';
import { Matrix } from './Matrix';
//import { MatrixCell } from './MatrixCell';
import { useMatrixState } from './state/MatrixProvider';
//import { styles } from './styles';

export const Row3Col1 = (props) => {
  const {data} = props;
  const matrixState = useMatrixState();
  const {row3,col1,fontsize,bandY} = matrixState.dimensions;

  const renderBottomLeftText = (props,c,col,r,row,sTop) => {
    const {bandX, bandY, fontsize} = props
    return (
      <text
        dominantBaseline="left"
        textAnchor="end"
        x={(bandX*(c+1))-10}
        y={bandY-(bandY/2.5)+(sTop)}
        className="text"
        style={{fontSize:(fontsize-4)+'px'}}>
          {col}
      </text>
    )
  }

  return (
    <div style={{width:col1+'px',maxWidth:col1+'px'}}>
      <div style={{width:col1+'px',maxWidth:col1+'px',height:row3+'px'}}>
      <svg style={{width:col1+'px',maxWidth:col1+'px',height:row3+'px'}}>
        <Matrix
          renderCellFunction={renderBottomLeftText}
          data={data}
          params={{
            name:'totalsbottom',fontsize: fontsize,
            translateX:0,translateY:0,bandX:col1,bandY:bandY
          }}
        />
      </svg>
      </div>
    </div>
  )
}
