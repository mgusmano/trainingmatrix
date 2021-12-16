import React, { useEffect, useRef } from 'react';
import { MatrixProvider } from './state/MatrixProvider';
import { useMatrixState } from './state/MatrixProvider';
import LoadingOverlay from 'react-loading-overlay';
import { Legend } from './Legend';
import "flex-splitter-directive"
import "flex-splitter-directive/styles.min.css"
import { Row1Col1 } from './Row1Col1';
import { Row1Col1a } from './Row1Col1a';
import { Row1Col2 } from './Row1Col2';
import { Row1Col3 } from './Row1Col3';
import { Row2Col1 } from './Row2Col1';
import { Row2Col1a } from './Row2Col1a';
import { Row2Col2 } from './Row2Col2';
import { Row2Col3 } from './Row2Col3';
import { Row3Col1 } from './Row3Col1';
import { Row3Col1a } from './Row3Col1a';
import { Row3Col2 } from './Row3Col2';
import { Row3Col3 } from './Row3Col3';
import { styles } from './styles';
import { useResizeEvent } from './useResizeEvent';

export const TrainingMatrix = ((props) => {
  return(<MatrixProvider><MainMatrixProvider props={props}/></MatrixProvider>)
})

const MainMatrixProvider = (props) => {
  const matrixState = useMatrixState();
  const matrixStateRef = useRef(matrixState);
  //var certificationsData = props.props.certificationsData
  var groupID = props.props.groupID
  var multiplier = props.props.multiplier

  useResizeEvent()

  useEffect(() => {
    if (multiplier === '') return

    matrixStateRef.current.setActive(true)

    //matrixStateRef.current.setCellData(null)
    matrixStateRef.current.showMainDialog('none')
    matrixStateRef.current.showSkillDialog('none')
    matrixStateRef.current.showOperatorDialog('none')
    matrixStateRef.current.setTop('')
    matrixStateRef.current.showTopDialog('none')

    matrixStateRef.current.setUserID(sessionStorage.getItem('userID'))
    matrixStateRef.current.setPartnerID(sessionStorage.getItem('partnerID'))
    matrixStateRef.current.setAll({
      'cellData': matrixStateRef.current.cellData,
      'partnerID': sessionStorage.getItem('partnerID'),
      'userID': sessionStorage.getItem('userID'),
      'groupID': groupID,
      'multiplier':multiplier
    })
  },[multiplier,groupID])

  const cellClicked = (id) => {
    //props.props.cellClicked(id)
  }

  //        <div role="separator"></div>

  var dialogWidth = '0px'
  if (matrixState.mainDialog === 'block') {
    dialogWidth = '370px'
  }
  if (matrixState.skillDialog === 'block') {
    dialogWidth = '370px'
    if (matrixState.mainDialog === 'block') {
      dialogWidth = '720px'
    }
  }
  if (matrixState.operatorDialog === 'block') {
    dialogWidth = '370px'
    if (matrixState.mainDialog === 'block') {
      dialogWidth = '720px'
    }
  }

  //'calc(100vh - 152px)'

  return (
    <LoadingOverlay
    style={{width:'100%',height: 'calc(100vh - 1px)',zIndex:'100000'}}
    active={matrixState.active}
    spinner
    text='Training Matrix is Loading...'
    >
      <div style={{display:'flex',flexDirection:'row',width:'100%',height: 'calc(100vh - 152px)'}}>
        <div style={{flex:'1',overflow:'auto',background:'lightgray'}}>
          <div className='trainingmatrix' style={{...styles.v,background:'lightgray'}}>
            {props.props.showLegend && <Legend/>}

            {/* main area start */}
            {matrixState.dimensions !== null &&
            <div className='mainarea' data-flex-splitter-horizontal style={{...styles.horizontal,overflow:'visible',width:'100%',height:'100%'}}>

              {/* left area - matrix - start */}
              <div data-flex-splitter-horizontal className='left' style={{...styles.v,overflow:'visible',flex:1,boxSizing:'border-box',display:'flex'}}>

                <div className='leftrow1' height={matrixState.dimensions.row1} style={{...styles.h,overflow:'visible',height:matrixState.dimensions.row1+'px',background:'lightgray'}}>
                  <Row1Col1/>
                  <Row1Col1a data={[['Rev#']]}/>
                  <LoadingOverlay
                    style={{width:'100%',height:'100%',zIndex:'10'}}
                    active={false}
                    spinner
                    text='Loading...'
                    >
                    <Row1Col2 data={matrixState.byOperator}/>
                  </LoadingOverlay>
                  <div style={{width:'5px'}}></div>
                  <Row1Col3 data={[['Goal','# Certified','%','Gap']]}/>
                </div>

                <div className='leftrow2' style={{...styles.h,overflow:'visible',xflex:'1',height:(matrixState.dimensions.row2Orig)+'px',background:'lightgray'}}>
                  <Row2Col1 data={matrixState.bySkill}/>
                  {/* <Row2Col1a/> */}
                  {matrixState.revArray !== null &&
                  <Row2Col1a data={matrixState.revArray}/>
                  }
                  {/* <Log data={matrixState.active}/> */}
                  <LoadingOverlay
                    style={{width:'100%',height:'100%',zIndex:'10'}}
                    active={false}
                    spinner
                    text='Loading...'
                    >
                    <Row2Col2 data={matrixState.bySkill} cellClicked={cellClicked}/>
                  </LoadingOverlay>
                  <div style={{width:'5px'}}></div>
                  {matrixState.rowsArray !== null &&
                    <Row2Col3 data={matrixState.rowsArray}/>
                  }
                </div>

                <div style={{height:'5px'}}></div>

                <div className='leftrow3' style={{...styles.h,overflow:'visible',height: matrixState.dimensions.row3+'px',minHeight:matrixState.dimensions.row3+'px',background:'lightgray'}}>
                  <Row3Col1 data={[['Goal'],['# Certified'],['%'],['Gap']]}/>
                  <Row3Col1a/>
                  {matrixState.colsArray !== null &&
                    <Row3Col2 data={matrixState.colsArray}/>
                  }
                  <Row3Col3/>
                </div>

              </div>
              {/* left area - matrix - end */}








            </div>
            }
            {/* main area end */}
          </div>
        </div>


        <div style={{width:dialogWidth}}>
          {/* right area - details - start */}
          <div className='right' style={{marginTop:'10px',marginLeft:'10px',position:'fixed',display:'flex',flexDirection:'column',overflow: 'visible',padding:'0px', background:'white', boxSizing:'border-box',boxShadow: '0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)'}}>

            <div style={{height:'150px',display: matrixState.topDialog}}>
              {matrixState.top}
            </div>

            <div className='right' style={{flex: '1',display:'flex',flexDirection:'row',overflow: 'visible',padding:'0px', background:'white', boxSizing:'border-box',xboxShadow: '0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)'}}>
              <div style={{display: matrixState.skillDialog, width:'350px', height:'90%', boxSizing:'border-box', xpadding:'10px', xboxShadow: '0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)'}}>
                {matrixState.specific}
              </div>
              <div style={{display: matrixState.operatorDialog, width:'350px', height:'90%', boxSizing:'border-box', xpadding:'10px', xboxShadow: '0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)'}}>
                {matrixState.specific}
              </div>
              <div style={{display: matrixState.mainDialog, width:'350px', height:'90%', boxSizing:'border-box', xpadding:'10px', xboxShadow: '0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)'}}>
                {matrixState.main}
              </div>
            </div>

          </div>
          {/* right area - details - end */}
        </div>




      </div>
    </LoadingOverlay>
  )
}

export default TrainingMatrix
