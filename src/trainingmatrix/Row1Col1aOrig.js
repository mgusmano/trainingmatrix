import React from 'react';
import { useMatrixState } from './state/MatrixProvider';

export const Row1Col1a = (props) => {
  const matrixState = useMatrixState();
  const {col1a,row1} = matrixState.dimensions;

  return (
    <div className='' style={{width:col1a+'px',boxSizing:'border-box'}}>
      <svg width={col1a+'px'} height={row1+'px'}></svg>
    </div>
  )
}
