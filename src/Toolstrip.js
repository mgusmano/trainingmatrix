import React from 'react';
import { useAppState } from './state/AppProvider';
export const Toolstrip = (props) => {
  const l = sessionStorage.getItem('userID');
  const appState = useAppState();

  // const replaceMatrixData = () => {
  //   async function fetchData() {
  //     const certificationsnewResult = await axios("data/trainingmatrix/data/certificationsnew.json");
  //     setCertificationsData(certificationsnewResult.data)
  //   }
  //   fetchData();
  // }

  return (
    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',height:'40px',padding:'5px',background:'#E1E9EF'}}>


    <div style={{marginLeft:'10px',marginTop:'15px',color:'black',fontSize:'12px'}}>TOSHIBA INTERNATIONAL CORPORATION - HEV PLANT - {l}</div>

    {/*
    <div style={{marginLeft:'30px',marginTop:'12px',color:'black'}}>Title (Shift #)</div>
    */}

      {/* <div style={{marginLeft:'30px',marginTop:'10px'}}>cell clicked:</div>
      <input
        style={{width:'30px'}}
        type="text"
        value={textMessage}
        onChange={()=>{}}
      /> */}

      <div style={{display:'flex',flexDirection:'row'}}>

        <div style={{marginLeft:'1px',marginTop:'13px',color:'black',fontSize:'12px'}}>group:</div>
        <select value={appState.groupID} style={{width:'250px',margin:'7px'}}
          onChange={(event) => {
            appState.setGroupID(event.target.value)
          }}>
          {appState.groups !== null &&
            appState.groups.map((group,i) => {
              return <option key={i} value={group.groupID}>{group.groupID}-{group.groupName}</option>
            })
          }
        </select>
        <div style={{margin:'13px 0 7px 30px',color:'black',fontSize:'12px'}}>matrix size:</div>
        <div style={{margin:'13px 0 7px 5px',width:'60px',fontSize:'12px',textDecoration:'underline',cursor: 'pointer'}} onClick={()=>{appState.setMultiplier(appState.multiplier-1)}}>smaller</div>
        <div style={{margin:'13px 0 7px 0',width:'60px',fontSize:'12px',textDecoration:'underline',cursor: 'pointer'}} onClick={()=>{appState.setMultiplier(appState.multiplier+1)}}>larger</div>
        <div style={{marginLeft:'10px',marginTop:'13px',color:'black',fontSize:'12px'}}>{appState.multiplier}</div>

      </div>
      <div style={{display:'flex',flexDirection:'row'}}>
        <div style={{margin:'13px 0 7px 1px',width:'110px',fontSize:'12px',textDecoration:'underline',cursor: 'pointer'}} onClick={()=>{ appState.setLegend(!appState.legend)}}>Toggle Legend</div>

        <div style={{margin:'13px 0 7px 10px',color:'black',fontSize:'12px'}}>v2021-11-26-a</div>
      </div>
    </div>
  )
}