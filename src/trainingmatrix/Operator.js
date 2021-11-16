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
  });

  const matrixState = useMatrixState();
  const [goal, setGoal] = useState(0);
  const [oldtarget, setOldTarget] = useState(null);

  const operatorID = data.id;
  var bandX=30;

  useEffect(() => {
    setGoal(data.goal)
  },[props])

  const updateGoal = (newGoal) => {
    setGoal(newGoal)
  }

  const clickItem = (event,index) => {
    //console.log(data.skill.data[index])
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

//            length={data.data.length}
  return (
    <div style={{display:'flex',flexDirection:'column',padding:'0px',xwidth:'100%',height:'100%'}}>
      {/* <div style={{height:'30px',fontSize:'18px'}}>
        <div style={{fontSize:'20px'}}>{data.operatorName}</div>
      </div> */}

      <div style={{flex:'1',display:'flex',flexDirection:'column',marginLeft:'30px',marginTop:'0px',marginRight:'30px',overflow: 'hidden'}}>
        <div style={{marginTop:'10px'}}>{data.operatorName} Stations:</div>
        <div style={{overflow:'auto',maxHeight: 500,border:'0px solid lightgray'}}>
          <ReactList
            itemRenderer={renderItem}
            length={dataSort.length}
            type='uniform'
          />
        </div>

        <div style={{marginTop:'10px'}}>
          Goal:
          <input
            type="text"
            value={goal}
            onChange={(event)=> {
              updateGoal(event.target.value)
            }}
            style={{marginLeft:'10px',marginTop:5,width:'26px',height:'15px'}}
          />
          <button
            onClick={(event)=> {
              matrixState.setActive(true)

              // var c = {
              //   id: certificationID,
              //   row: matrixState.celldata.row,
              //   col: matrixState.celldata.col,
              //   skill: skill,
              //   operator: operator,
              //   skillID: skill.id,
              //   operatorID: operator.id,
              //   currcertID: parseInt(event.target.value),
              //   meta: metaval,
              //   skills: matrixState.skills,
              //   operators: matrixState.operators,
              //   certifications: newCerts,
              //   multiplier: matrixState.dimensions.multiplier
              // }


              var payload = {
                id: operatorID,
                goal: goal,
                skills: matrixState.skills,
                operators: matrixState.operators,
                certifications: matrixState.certifications,
                multiplier: matrixState.dimensions.multiplier
              }
              matrixState.updateOperatorGoal(payload)
            }}
          >
            Update
          </button>
        </div>



        {/* <select size="40" onChange={stationSelected}>
          {data.data.map((item,i) => {
            const found = matrixState.certifications.find((element) => {
              var theElement = null
              if (element.operatorID === item.operator.id && element.skillID === item.skill.id) {
                theElement = element
              }
              return theElement
            });
            return (
              <option key={i} value={found.id}>
                {item.skill.skillName}
              </option>
            )
          })}
        </select> */}


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
