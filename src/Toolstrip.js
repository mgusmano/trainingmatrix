import React from 'react';
import { useAppState } from './state/AppProvider';
export const Toolstrip = () => {
  const l = sessionStorage.getItem('userID');
  const appState = useAppState();

  return (
    <div style={{boxSizing:'border-box',display:'flex',flexDirection:'row',justifyContent:'space-between',height:'40px',padding:'5px',background:'#E1E9EF'}}>
      <div style={{margin:'7px 0 7px 10px',color:'black',fontSize:'12px'}}>
        TOSHIBA INTERNATIONAL CORPORATION - HEV PLANT - {l}
      </div>
      <div style={{display:'flex',flexDirection:'row'}}>
        <div style={{margin:'7px 0 7px 1px',color:'black',fontSize:'12px'}}>group:</div>
        <select value={appState.groupID} style={{width:'250px',margin:'0px'}}
          onChange={(event) => {
            appState.setGroupID(event.target.value)
          }}>
          {appState.groups !== null &&
            appState.groups.map((group,i) => {
              return <option key={i} value={group.groupID}>{group.groupID}-{group.groupName}</option>
            })
          }
        </select>
        <div style={{margin:'7px 0 7px 30px',color:'black',fontSize:'12px'}}>matrix size:</div>
        <div style={{margin:'7px 0 7px 15px',width:'40px',fontSize:'12px',textDecoration:'underline',cursor: 'pointer'}} onClick={()=>{appState.setMultiplier(appState.multiplier-1)}}>smaller</div>
        <div style={{margin:'7px 0 7px 15px',width:'40px',fontSize:'12px',textDecoration:'underline',cursor: 'pointer'}} onClick={()=>{appState.setMultiplier(appState.multiplier+1)}}>larger</div>
        <div style={{margin:'7px 0 7px 10px',color:'black',fontSize:'12px'}}>{appState.multiplier}</div>
      </div>
      <div style={{display:'flex',flexDirection:'row'}}>
        <div style={{margin:'7px 0 7px 1px',width:'110px',fontSize:'12px',textDecoration:'underline',cursor: 'pointer'}} onClick={()=>{ appState.setLegend(!appState.legend)}}>Toggle Legend</div>
        <div style={{margin:'7px 0 7px 10px',color:'black',fontSize:'12px'}}>v2021-12-02-a</div>
      </div>
    </div>
  )
}