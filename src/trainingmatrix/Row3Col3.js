import React from 'react';
import { useMatrixState } from './state/MatrixProvider';

export const Row3Col3 = () => {
  const matrixState = useMatrixState();
  const {col3,row3} = matrixState.dimensions;

  return (
    <div style={{width:col3+'px',minWidth:col3+'px',height:row3+'px'}}>
    </div>
  )
}
