import React, { useState, useEffect } from 'react';
import { useMatrixState } from './state/MatrixProvider';
import { Diamond } from './Diamond';
import { Top } from './Top';
import { Main } from './Main';
import ReactList from 'react-list';

export const Operator = React.memo((props) => {
  const {data} = props

  var dataSort = Array.from(data.data);
  dataSort.sort(function (x, y) {
    var n = y.meta.currcertID - x.meta.currcertID;
    if (n !== 0) {
        return n;
    }
    //return x.col - y.col;
    return null
  });

  const matrixState = useMatrixState();
  const [goal, setGoal] = useState(0);
  const [oldtarget, setOldTarget] = useState(null);

  const operatorID = data.operatorID;
  var bandX=30;

  useEffect(() => {
    setGoal(data.goal)
  },[data.goal])

  const updateGoal = (newGoal) => {
    setGoal(newGoal)
  }

  const clickItem = (event,index) => {
    if (oldtarget !== null) {
      oldtarget.style.background = 'white'
    }
    event.target.parentNode.style.background = 'gainsboro'
    setOldTarget(event.target.parentNode)
    var val = dataSort[index].certificationID
    const found = dataSort.find(element => element.certificationID === val);
    found.operatorName = found.operator.operatorName
    found.picture = found.operator.picture
    matrixState.setCellData(found)
    matrixState.setMain(<Main data={found}/>)
    matrixState.showMainDialog('block')
    matrixState.setTop(<Top data={found}/>)
    matrixState.showTopDialog('block')
  }

  const renderItem = (index, key) => {
    return (
      <div key={key} style={{display:'flex',flexDirection:'row'}} onClick={(event) => {
        clickItem(event,index)
      }}>
        <Diamond meta={dataSort[index].meta} data={dataSort[index].data} boxSize={bandX-8} padding={20}/>
        <div style={{marginTop:'4px', fontSize: '10px'}}>
          {dataSort[index].skill.skillName}
        </div>
      </div>
    )
  }

//{data.operatorName}
  return (
    <div style={{boxSizing:'border-box',height:'500px',display:'flex',flexDirection:'column',padding:'0px',xwidth:'100%',xheight:'100%'}}>

      <div style={{flex:'1',display:'flex',flexDirection:'column',marginLeft:'30px',marginTop:'0px',marginRight:'30px',overflow: 'hidden'}}>
        <div style={{margin:'10px 0 10px 0',fontSize:'24px'}}>Stations:</div>
        <div style={{overflow:'auto',maxHeight: 500,border:'1px solid lightgray'}}>
          <ReactList
            itemRenderer={renderItem}
            length={dataSort.length}
            type='uniform'
          />
        </div>

        <div style={{margin:'10px 0 10px 0',display:'flex',flexDirection:'row',height:'15px'}}>
          <div style={{margin:'2px 0 10px 0',fontSize:'18px'}}>Goal:</div>
          <input type="text" value={goal}
            style={{margin:'0 0 0 10px',width:'26px',height:'15px'}}
            onChange={(event)=> {
              updateGoal(event.target.value)
            }}
          />
          <div
            style={{margin:'3px 0 7px 15px',width:'40px',fontSize:'12px',textDecoration:'underline',cursor: 'pointer'}}
            onClick={()=>{
              matrixState.setActive(true)
              var payload = {
                operatorID: operatorID,
                goal: goal,
                partnerID: matrixState.partnerID,
                userID: matrixState.userID,
                groupID: matrixState.groupID,
                multiplier: matrixState.dimensions.multiplier
              }
              matrixState.updateOperatorGoal(payload)
            }}
          >Update</div>
        </div>
      </div>



      {/* <div style={{flex:'1',overflow:'none',display: 'none'}}>
        <svg width="100%" height="100%">
        {data.data.map((item,i) => {
          return (
            <g key={i} transform={"translate(200," + (i*bandX) + ")"} className="group" >
              <text
                dominantBaseline="left"
                textAnchor="end"
                stroke="black"
                x={1}
                y={bandY-(bandY/3)}
                className="text"
                style={{fontSize:fontsize+'px'}}>
                  {item.skill.skillName}
              </text>
              <Diamond meta={item.meta} data={item.data} boxSize={bandX} padding={30}/>
              <MatrixCell
                rowid={item.meta.id}
                colid={1}
                bandX={bandX}
                bandY={bandY}
                type="pie"
                data={data}
              />
            </g>
          )
        })}
        </svg>
      </div> */}




    </div>
  )
})



  // const stationSelected = (event) => {
  //   var val = event.target.options[ event.target.selectedIndex ].value
  //   var found = matrixState.certifications.find(element => element.id === val.toString());
  //   const foundoperator = matrixState.operators.find(element => element.id === found.operatorID.toString());
  //   const foundskill = matrixState.skills.find(element => element.id === found.skillID.toString());
  //   found.operator = foundoperator
  //   found.skill = foundskill
  //   found.certificationID = found.id
  //   found.operatorName = foundoperator.operatorName
  //   found.picture = foundoperator.picture

  //   matrixState.setCellData(found)
  //   matrixState.setMain(<Main data={found}/>)
  //   matrixState.showMainDialog('block')
  // }

  //const goal = props.data.goal;
  //var bandX=50, bandY=50;
  //var fontsize=14
  //var img = 'https://examples.sencha.com/extjs/7.4.0/examples/kitchensink/resources/images/staff/' + data.id + '.jpg'
  //var img = 'data/trainingmatrix/pictures/Aaron Cariaga.JPG'
  // var img = 'data/trainingmatrix/pictures/' + data.picture + ''


//   <button
//   onClick={(event)=> {
//     matrixState.setActive(true)

//     // var c = {
//     //   id: certificationID,
//     //   row: matrixState.celldata.row,
//     //   col: matrixState.celldata.col,
//     //   skill: skill,
//     //   operator: operator,
//     //   skillID: skill.id,
//     //   operatorID: operator.id,
//     //   currcertID: parseInt(event.target.value),
//     //   meta: metaval,
//     //   skills: matrixState.skills,
//     //   operators: matrixState.operators,
//     //   certifications: newCerts,
//     //   multiplier: matrixState.dimensions.multiplier
//     // }


//     var payload = {
//       operatorID: operatorID,
//       goal: goal,
//       //skills: matrixState.skills,
//       //operators: matrixState.operators,
//       //certifications: matrixState.certifications,
//       groupID: matrixState.groupID,
//       multiplier: matrixState.dimensions.multiplier
//     }
//     matrixState.updateOperatorGoal(payload)
//   }}
// >
//   Update
// </button>