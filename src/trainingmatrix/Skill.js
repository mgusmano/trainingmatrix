import React, { useState, useEffect } from 'react';
import { useMatrixState } from './state/MatrixProvider';
import { Diamond } from './Diamond';
import { Top } from './Top';
import { Main } from './Main';
import ReactList from 'react-list';

export const Skill = React.memo((props) => {
  const {data} = props;
  const matrixState = useMatrixState();
  const [goal, setGoal] = useState(0);
  const [rev, setRev] = useState(0);
  const [oldtarget, setOldTarget] = useState(null);

  var dataSort = Array.from(data.skill.data);
  dataSort.sort(function (x, y) {
    var n = y.meta.currcertID - x.meta.currcertID;
    if (n !== 0) {
        return n;
    }
    //return x.col - y.col;
  });
  //console.log(dataSort)

  const skillID = props.data.skill.id;
  var bandX=30;
  var bandY=30;
  var fontsize=14;

  useEffect(() => {
    setGoal(props.data.skill.goal)
  },[props])

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
          {dataSort[index].operator.operatorName}
        </div>
      </div>
    )
  }

  return (
    <div style={{display:'flex',flexDirection:'column',padding:'0px',xwidth:'250px',height:'99%',borderRight:'0px solid red'}}>
      {/* <div style={{height:'30px',fontSize:'18px'}}>
        <div style={{fontSize:'20px'}}>{data.skill.skillName}</div>
      </div> */}
      <div style={{flex:'1', display:'flex',flexDirection:'column',marginLeft:'30px',marginTop:'0px', marginRight:'30px',overflow: 'hidden'}}>
        <div style={{marginTop:'10px'}}> {data.skill.skillName} Operators:</div>
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
              setGoal(event.target.value)
            }}
            style={{marginLeft:'10px',marginTop:5,width:'26px',height:'15px'}}
          />
          <button
            onClick={(event)=> {
              matrixState.setActive(true)
              var payload = {
                id: skillID,
                goal: goal,
                skills: matrixState.skills,
                operators: matrixState.operators,
                certifications: matrixState.certifications,
                multiplier: matrixState.dimensions.multiplier
              }
              matrixState.updateSkillGoal(payload)
              // var payload = {
              //   id: skillID,
              //   goal: goal
              // }
              // matrixState.updateSkillGoal(payload)
            }}
          >
            Update
          </button>
        </div>


        <div style={{marginTop:'10px'}}>
        Rev#:
        <input
          type="text"
          value={rev}
          onChange={(event)=> {
            setRev(event.target.value)
          }}
          style={{marginLeft:'10px',marginTop:5,width:'26px',height:'15px'}}
        />
        <button
          onClick={(event)=> {
            matrixState.setActive(true)
            var payload = {
              id: skillID,
              goal: goal,
              skills: matrixState.skills,
              operators: matrixState.operators,
              certifications: matrixState.certifications,
              multiplier: matrixState.dimensions.multiplier
            }
            matrixState.updateSkillRev(payload)
          }}
        >
          Update
        </button>
      </div>



        {/* <select size="40" onChange={(event)=>{
          var val = event.target.options[ event.target.selectedIndex ].value
          const found = data.skill.data.find(element => element.certificationID === val);

          found.operatorName = found.operator.operatorName
          found.picture = found.operator.picture

          matrixState.setCellData(found)
          matrixState.setMain(<Main data={found}/>)
          matrixState.showMainDialog('block')

          matrixState.setTop(<Top data={found}/>)
          matrixState.showTopDialog('block')
        }}>
        {data.skill.data.map((item,i) => {
          return (
            <option key={i} value={item.certificationID}>
              {item.operator.operatorName}
            </option>
          )
        })}
        </select> */}


      </div>


      <div style={{display:'none',flex:'1', overflow: 'hidden'}}>
        {/* <div style={{height:'200px', overflow:'scroll'}}> */}
        <svg width="100%" height="100%">
        {data.skill.data.map((item,i) => {
          return (
            <g key={i} transform={"translate(200," + ((i+0)*bandY) + ")"} className="group" onClick={(event,i,item)=>{console.log(event)}} >
              <text
                dominantBaseline="left"
                textAnchor="end"
                stroke="black"
                x={-5}
                y={bandY-(bandY/3)}
                className="text"
                style={{fontSize:fontsize+'px'}}>
                  {item.operator.operatorName}
              </text>
              <Diamond meta={item.meta} data={item.data} boxSize={bandX} padding={20}/>
              {/* <MatrixCell
                rowid={item.meta.id}
                colid={1}
                bandX={bandX}
                bandY={bandY}
                type="pie"
                data={data}
              /> */}
            </g>
          )
        })}
        </svg>
        {/* </div> */}
      </div>

      {/* <div style={{flex:'1',display:'flex'}}>
        <iframe
          title={'SwipeGuide'}
          width="100%"
          style={{flex:'1',border:'1'}}
          src={src}
          xsrc={"https://app.swipeguide.com/embed/guide/46e3b328-9e74-4875-a774-99418940d9f4/279b3f82-e4e1-4468-b166-419372c57c39?embed=true&locale=EN_US&isolatedInstruction=true"}>
        </iframe>
      </div> */}

    </div>
  )
})

  //const result = num % 2;
  // var src;
  // if (result === 1) {
  //   src="https://app.swipeguide.com/guide/example-guide-line-1-wort-cooling-wort-aeration/safety/attach-lock/2"
  // }
  // else {
  //   src="https://app.swipeguide.com/guide/multipacker-ocme/getting-started/copy%20500e%20of%20prepare-the-machine"
  // }

  //<div xonClick={(event)=>{console.log(event)}}>{item.operator.id}</div>
  //<div xonClick={(event)=>{console.log(event)}}>{item.operator.operatorName}</div>


// {/* <div key={i} style={{display:'flex', flexDirection: 'row'}}
//             onClick={(event)=>{
//               console.log(event)
//               console.log(item)
//               matrixState.setCellData(item)
//               matrixState.showMainDialog('block')
//             }
//           }>
//             <div>{item.certificationID} {item.operator.id} {item.operator.operatorName}</div>
//           </div> */}

//         // return (
//         //   <div key={i} style={{display:'flex', flexDirection: 'row'}}
//         //     onClick={(event)=>{
//         //       console.log(event)
//         //       console.log(item)
//         //       matrixState.setCellData(item)
//         //       matrixState.showMainDialog('block')
//         //     }
//         //   }>
//         //     <div>{item.certificationID} {item.operator.id} {item.operator.operatorName}</div>
//         //   </div>
//         // )
