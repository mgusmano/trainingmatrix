import React from 'react';
import { useMatrixState } from './state/MatrixProvider';

export const MatrixCell = React.memo(({r, c, rowid, colid, bandX, bandY, type, x, stroke, col, data, clickCellFunction}) => {
  const matrixState = useMatrixState();

  var certificationID = -1;
  if (col !== undefined) {
    certificationID = col.certificationID;
  }

  // var sColor = 'black'
  // //useEffect(() => {
  //   if (stroke !== undefined) {
  //     sColor = stroke;
  //   }
  // //});

  //console.log(data,matrixState.currentcertification)

  var strokeOpacity = "0"
  //var fillOpacity = "0"
  //var strokeWidth = 5;
  if (matrixState.currentcertification === certificationID) {
    strokeOpacity = "1"
  }

  return (
    <rect
    style={{boxSizing:'border-box'}}
      r={r}
      c={c}
      rowid={rowid}
      colid={colid}
      opacity="1"
      strokeOpacity={strokeOpacity}
      fillOpacity="0"
      stroke="blue"
      fill="gray"
      strokeWidth="5"
      x={x}
      width={bandX}
      height={bandY}

      onClick={(e) => {clickCellFunction !== undefined && clickCellFunction(e,colid,rowid,type,data,col,r,c)}}
      onMouseEnter={(e) => {e.target.style.fillOpacity = '.5'}}
      onMouseOut={(e) => {e.target.style.fillOpacity = '0'}}
    />
  )
})