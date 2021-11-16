import React from 'react';
import { Matrix } from './Matrix';
//import { MatrixCell } from './MatrixCell';
import { useMatrixState } from './state/MatrixProvider';
import { styles } from './styles';


export const Row3Col2 = (props) => {
  const {data} = props;
  const matrixState = useMatrixState();
  const {row3,col2,fontsize,bandX,bandY} = matrixState.dimensions;

  const renderText = (props,c,col,r,row,sTop) => {
    const {bandX, bandY, fontsize} = props
    return (
      <text
        dominantBaseline="middle"
        textAnchor="middle"
        x={(bandX*c)+(bandX/2)}
        y={bandY-(bandY/2)+(sTop)}
        className="text"
        style={{fontSize:(fontsize-7)+'px'}}>
        {r === 2 &&
          (col*100).toFixed(0) + '%'
        }
        {r !== 2 &&
          col
        }
      </text>
    )
  }

  return (
    <div id="studenttotals" style={{...styles.v,overflow:'hidden',border:'0px solid red'}}>
      <div style={{ maxWidth:col2+'px'}} width={(col2)+'px'} height={row3+'px'}>
      <svg style={{maxWidth:col2+'px'}} width={(col2)+'px'} height={row3+'px'}>
        <Matrix
          renderCellFunction={renderText}
          data={data}
          params={{
            name:'totalsbottom',fontsize: fontsize,
            translateX:0,translateY:0,bandX:bandX,bandY:bandY
          }}
        />
      </svg>
      </div>
    </div>
  )
}
