import React from 'react';
import { useAppState } from './state/AppProvider';
export const Toolstrip = () => {
  //const l = sessionStorage.getItem('userID');
  const appState = useAppState();

  // <div style={{margin:'7px 0 7px 10px',color:'black',fontSize:'12px'}}>{appState.multiplier}</div>
//   <div style={{margin:'7px 0 7px 10px',color:'black',fontSize:'12px'}}>
//   TOSHIBA INTERNATIONAL CORPORATION - HEV PLANT - {l}
// </div>

  return (
    <div style={{boxSizing:'border-box',display:'flex',flexDirection:'row',justifyContent:'space-between',height:'40px',padding:'5px',background:'#E1E9EF'}}>

      <div style={{display:'flex',flexDirection:'row'}}>
        <div style={{margin:'5px 10px 7px 10px',color:'black',fontSize:'20px'}}>
          TRAINING MATRIX
        </div>
        <div style={{margin:'12px 10px 7px 5px',color:'black',fontSize:'12px'}}>
          Document No. 4F-016
        </div>
      </div>
      <div style={{display:'flex',flexDirection:'row'}}>
        <div style={{margin:'7px 0 7px 1px',color:'black',fontSize:'12px'}}>group:</div>
        <select value={appState.groupID} style={{width:'250px',margin:'0px'}}
          onChange={(event) => {
            appState.setGroupID(event.target.value)
          }}>
          {appState.groups !== null &&
            appState.groups.map((group,i) => {
              return <option key={i} value={group.groupID}>{group.groupName} ({group.groupMembersCount})</option>
            })
          }
        </select>
        <div style={{margin:'7px 0 7px 30px',color:'black',fontSize:'12px'}}>matrix size:</div>
        <div style={{margin:'7px 0 7px 15px',width:'40px',fontSize:'12px',textDecoration:'underline',cursor: 'pointer'}} onClick={()=>{appState.setMultiplier(appState.multiplier-1)}}>smaller</div>
        <div style={{margin:'7px 0 7px 15px',width:'40px',fontSize:'12px',textDecoration:'underline',cursor: 'pointer'}} onClick={()=>{appState.setMultiplier(appState.multiplier+1)}}>larger</div>
      </div>
      <div style={{display:'flex',flexDirection:'row'}}>
        <div style={{margin:'7px 0 7px 1px',width:'110px',fontSize:'12px',textDecoration:'underline',cursor: 'pointer'}} onClick={()=>{ appState.setLegend(!appState.legend)}}>Toggle Legend</div>
        <div
          style={{margin:'7px 0 7px 10px',color:'black',fontSize:'12px'}}
        >
            v2022-02-11-c
        </div>
      </div>
    </div>
  )
}