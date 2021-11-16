import React, { useEffect } from 'react';
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
  var certificationsData = props.props.certificationsData
  var multiplier = props.props.multiplier
  var groupID = props.props.groupID
  useResizeEvent()

  useEffect(() => {
    if (multiplier === '') return

    // const createCertifications = (skills, operators, certificationsData) => {
    //   var certificationsDataCreated = []
    //   var certID = 0
    //   for (let s = 0; s < skills.length; s++) {
    //     for (let o = 0; o < operators.length; o++) {
    //       certID++
    //       certificationsDataCreated.push({
    //         "id": certID,
    //         "row":s,
    //         "col":o,
    //         "skill":skills[s],
    //         "operator":operators[o],
    //         "skillID": skills[s].id,
    //         "operatorID": operators[o].id,
    //         "currcertID": 0,
    //         "meta": {
    //           "type":"solid",
    //           "currcertID": 0,
    //           "certification":"notapplicable",
    //           "strokecolor":"black",
    //           "letter":"",
    //           "start":"",
    //           "certstate": "disabled"
    //         },
    //         "data": []
    //       })
    //     }
    //   }

    //   for (let o = 0; o < certificationsData.length; o++) {
    //     var found = certificationsDataCreated.find(element => {
    //       var c;
    //       if (element.skillID === certificationsData[o].skillID && element.operatorID === certificationsData[o].operatorID) {
    //         c = certificationsData[o]
    //       }
    //       return c
    //     });
    //     //console.log(found)
    //     found.meta = certificationsData[o].meta
    //     found.data = certificationsData[o].data
    //   }

    //   return certificationsDataCreated;

    // }

  // var skillsData = props.props.skillsData;
  // var operatorsData = props.props.operatorsData;
  //var certificationsDataCreated = createCertifications(skillsData, operatorsData, certificationsData)



    matrixState.setActive(true)
    matrixState.setAll({
      'first':true,
      'groupID': groupID,
      //'operatorsData':props.props.operatorsData,
      //'skillsData':props.props.skillsData,
      //'certificationsData':certificationsData,
      'multiplier':multiplier
    })
  },[certificationsData,multiplier,groupID])

  const cellClicked = (id) => {
    props.props.cellClicked(id)
  }

  return (
    <div className='trainingmatrix' style={{...styles.v,width:'100%',height:'100%',background:'lightgray'}}>
      {props.props.showLegend && <Legend/>}

      {/* main area start */}
      {matrixState.dimensions !== null &&
      <div className='mainarea' data-flex-splitter-horizontal style={{...styles.horizontal,padding:'20px',width:'100%',height:'100%'}}>

        {/* left area - matrix - start */}
        <div data-flex-splitter-horizontal className='left' style={{...styles.v,flex:1,boxSizing:'border-box',display:'flex'}}>

          <div className='leftrow1' height={matrixState.dimensions.row1} style={{...styles.h,overflow:'hidden',height:matrixState.dimensions.row1+'px',background:'lightgray'}}>
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

          <div className='leftrow2' style={{...styles.h,xflex:'1',height:(matrixState.dimensions.row2Orig)+'px',background:'lightgray'}}>
            <Row2Col1 data={matrixState.bySkill}/>
            {/* <Row2Col1a/> */}
            <Row2Col1a data={[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}/>
            {/* <Log data={matrixState.active}/> */}
            <LoadingOverlay
              style={{width:'100%',height:'100%',zIndex:'10'}}
              active={matrixState.active}
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

          <div className='leftrow3' style={{...styles.h,height: matrixState.dimensions.row3+'px',minHeight:matrixState.dimensions.row3+'px',background:'lightgray'}}>
            <Row3Col1 data={[['Goal'],['# Certified'],['%'],['Gap']]}/>
            <Row3Col1a/>
            {matrixState.colsArray !== null &&
              <Row3Col2 data={matrixState.colsArray}/>
            }
            <Row3Col3/>
          </div>

        </div>
        {/* left area - matrix - end */}

        <div role="separator"></div>

        {/* right area - details - start */}
        {/* <div className='right' style={{display:'flex',flexDirection:'row',overflow: 'hidden',padding:'0px', background:'white', boxSizing:'border-box',boxShadow: '0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)'}}>
          <div style={{display: matrixState.skillDialog, width:'300px', height:'100%', boxSizing:'border-box', xpadding:'10px', xboxShadow: '0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)'}}>
            {matrixState.specific}
          </div>
          <div style={{display: matrixState.operatorDialog, width:'300px', height:'100%', boxSizing:'border-box', xpadding:'10px', xboxShadow: '0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)'}}>
            {matrixState.specific}
          </div>
          <div style={{display: matrixState.mainDialog, width:'300px', height:'100%', boxSizing:'border-box', xpadding:'10px', xboxShadow: '0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)'}}>
          {matrixState.main}
          </div>
        </div> */}
        {/* right area - details - end */}

        {/* right area - details - start */}
        <div className='right' style={{display:'flex',flexDirection:'column',overflow: 'hidden',padding:'0px', background:'white', boxSizing:'border-box',boxShadow: '0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)'}}>

          <div style={{height:'200px',display: matrixState.topDialog}}>
            {matrixState.top}
          </div>

          <div className='right' style={{flex: '1',display:'flex',flexDirection:'row',overflow: 'hidden',padding:'0px', background:'white', boxSizing:'border-box',xboxShadow: '0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)'}}>
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
      }
      {/* main area end */}
    </div>
  )
}

export default TrainingMatrix
