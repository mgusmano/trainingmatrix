import { useEffect } from 'react';
import { useMatrixState } from './state/MatrixProvider';

export function useResizeEvent() {
  //console.log('useResizeEvent',window.innerWidth)
  const matrixState = useMatrixState();

  var event = 'resize'
  var passive = false

  const handler = () => {
    var multiplier = matrixState.original.multiplier
    var col1 = 0, row2 = 0, topHeight = 0, row2Orig = 0;
    if (window.innerWidth <10) {
      //multiplier = 5;
      col1 = 0*multiplier;
      topHeight = 5;
      //row2 = ((matrixState.original.row2*2)*multiplier)+(topHeight*multiplier);
      row2Orig = matrixState.original.row2*multiplier;
      row2 = ((matrixState.original.row2*2)*multiplier);
    }
    else if (window.innerWidth <1500) {
      //multiplier = 6;
      col1 = matrixState.original.col1*multiplier;
      row2Orig = matrixState.original.row2*multiplier;
      row2 = matrixState.original.row2*multiplier;
    }
    else {
      //multiplier = 7;
      col1 = matrixState.original.col1*multiplier;
      row2Orig = matrixState.original.row2*multiplier;
      row2 = matrixState.original.row2*multiplier;
    }
    //console.log(row2)
    var d ={
      multiplier: multiplier,
      topHeight: topHeight*multiplier,
      fontsize: matrixState.original.fontsize*multiplier,
      bandX: matrixState.original.bandX*multiplier,
      bandY: matrixState.original.bandY*multiplier,
      col1: col1,
      col1a: matrixState.original.col1a*multiplier,
      col2: matrixState.original.col2*multiplier,
      col3: matrixState.original.col3*multiplier,
      row1: matrixState.original.row1*multiplier,
      row2Orig: row2Orig,
      row2: row2,
      row3: matrixState.original.row3*multiplier,
    }
    matrixState.setDimensions(d);
  }


  useEffect(() => {
    window.addEventListener(event, handler, passive)
    return function cleanup() {
      window.removeEventListener(event, handler)
    }
  })
}
