import React from 'react';
import { useMatrixState } from './state/MatrixProvider';

export const Row1Col1 = (props) => {
  const matrixState = useMatrixState();
  const {col1,row1} = matrixState.dimensions;

  return (
    <div className='' style={{width:col1+'px',boxSizing:'border-box'}}>
      <svg width={col1+'px'} height={row1+'px'}></svg>
    </div>
  )
}
