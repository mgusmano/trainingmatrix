import React, { useState, useEffect } from 'react';
import { useMatrixState } from './state/MatrixProvider';
import { Diamond } from './Diamond';
import { Top } from './Top';
import { Main } from './Main';
import ReactList from 'react-list';

export const Skill = React.memo((props) => {
  const {data} = props;
  const matrixState = useMatrixState();
  const [goal, setGoal] = useState('');
  const [rev, setRev] = useState('');
  const [oldtarget, setOldTarget] = useState(null);

  var dataSort = Array.from(data.skill.data);
  dataSort.sort(function (x, y) {
    var n = y.meta.currcertID - x.meta.currcertID;
    if (n !== 0) {
        return n;
    }
    //return x.col - y.col;
    return null
  });
  //console.log(dataSort)

  const skillID = props.data.skill.id;
  var bandX=30;
  var bandY=30;
  var fontsize=14;

  useEffect(() => {
    setGoal(props.data.skill.goal)
    setRev(props.data.skill.rev)
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
    <div style={{boxSizing:'border-box',height:'500px',display:'flex',flexDirection:'column',padding:'0px',xwidth:'250px',xheight:'99%',borderRight:'0px solid red'}}>
      {/* <div style={{height:'30px',fontSize:'18px'}}>
        <div style={{fontSize:'20px'}}>{data.skill.skillName}</div>
      </div> */}
      <div style={{flex:'1', display:'flex',flexDirection:'column',marginLeft:'30px',marginTop:'0px', marginRight:'30px',overflow: 'hidden'}}>
        <div style={{margin:'10px 0 10px 0'}}> {data.skill.skillName} Operators:</div>
        <div style={{overflow:'auto',height: '380px',border:'1px solid lightgray'}}>
          <ReactList
            itemRenderer={renderItem}
            length={dataSort.length}
            type='uniform'
          />
        </div>

        <div style={{margin:'10px 0 10px 0',display:'flex',flexDirection:'row',height:'15px'}}>
          <div style={{margin:'2px 0 10px 0'}}>Goal:</div>

          <input type="text" value={goal}
            style={{margin:'0 0 0 10px',width:'26px',height:'15px'}}
            onChange={(event)=> {
              setGoal(event.target.value)
            }}
          />

          <div
            style={{margin:'3px 0 7px 15px',width:'40px',fontSize:'12px',textDecoration:'underline',cursor: 'pointer'}}
            onClick={()=>{
              matrixState.setActive(true)
              var payload = {
                skllID: skillID,
                goal: goal,
                groupID: matrixState.groupID,
                multiplier: matrixState.dimensions.multiplier
              }
              matrixState.updateSkillGoal(payload)
            }}
          >Update</div>

        </div>


        <div style={{margin:'10px 0 10px 0',display:'flex',flexDirection:'row',height:'15px'}}>

        <div style={{margin:'2px 0 10px 0'}}>Rev#:</div>

        <input type="text" value={rev}
          style={{margin:'0 0 0 10px',width:'26px',height:'15px'}}
          onChange={(event)=> {
            setRev(event.target.value)
          }}
        />

        <div
          style={{margin:'3px 0 7px 15px',width:'40px',fontSize:'12px',textDecoration:'underline',cursor: 'pointer'}}
          onClick={()=>{
            matrixState.setActive(true)
            var payload = {
              skillID: skillID,
              rev: rev,
              groupID: matrixState.groupID,
              multiplier: matrixState.dimensions.multiplier
            }
            matrixState.updateSkillRev(payload)
          }}
        >Update</div>

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
