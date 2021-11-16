
import { useAppState } from './state/AppProvider';
export const Toolstrip = (props) => {
  const appState = useAppState();

  // const replaceMatrixData = () => {
  //   async function fetchData() {
  //     const certificationsnewResult = await axios("data/trainingmatrix/data/certificationsnew.json");
  //     setCertificationsData(certificationsnewResult.data)
  //   }
  //   fetchData();
  // }

  return (
    <div style={{display:'flex',flexDirection:'row',height:'40px',padding:'5px',background:'gray'}}>

    <div style={{marginLeft:'30px',marginTop:'12px',color:'white'}}>Title (Shift #)</div>

      {/* <div style={{marginLeft:'30px',marginTop:'10px'}}>cell clicked:</div>
      <input
        style={{width:'30px'}}
        type="text"
        value={textMessage}
        onChange={()=>{}}
      /> */}
      <div style={{marginLeft:'120px',marginTop:'11px',color:'white'}}>group:</div>
      <select style={{width:'250px',margin:'7px'}}
        onChange={(event) => {
          appState.setGroupID(event.target.value)
        }}>
        {appState.groups !== null &&
          appState.groups.map((group,i) => {
            var selected = ''
            if (group.groupID === 34751) {
              selected = 'selected'
            }
            return <option selected={selected} key={i} value={group.groupID}>{group.groupID}-{group.groupName}</option>
          })
        }
      </select>
      <div style={{margin:'12px 0 7px 30px',color:'white'}}>matrix size:</div>
      <button style={{margin:'7px 0 7px 5px',width:'60px'}} onClick={()=>{appState.setMultiplier(appState.multiplier-1)}}>smaller</button>
      <button style={{margin:'7px 0 7px 0',width:'60px'}} onClick={()=>{appState.setMultiplier(appState.multiplier+1)}}>bigger</button>
      <div style={{marginLeft:'10px',marginTop:'12px',color:'white'}}>{appState.multiplier}</div>
      <button style={{margin:'7px 0 7px 60px',}} onClick={()=>{ appState.setLegend(!appState.legend)}}>Toggle Legend</button>
      <div style={{margin:'12px 0 7px 70px',color:'white'}}>v2021-11-16-g</div>
    </div>
  )
}