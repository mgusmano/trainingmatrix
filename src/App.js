import React, { useEffect, useRef } from 'react';
import { useAppState } from './state/AppProvider';
import { Toolstrip } from './Toolstrip.js';
import TrainingMatrix from './trainingmatrix/TrainingMatrix';
import axios from "axios";
//import { Loading } from 'aws-amplify-react';

//import { join, dirname } from 'path'
//import { Low, JSONFile } from 'lowdb'
//import { fileURLToPath } from 'url'

export const App = (props) => {
  const appState = useAppState();
  const appStateRef = useRef(appState);

  useEffect(() => {
    async function fetchData() {
      const apiRoot = 'https://skillnetusersapi.azurewebsites.net/api/';
      const auth = {auth:{username:'skillnet',password:'demo'}};
      const portalGroupsResult = await axios(apiRoot + 'portalgroups?partnerid=448', auth);
      appStateRef.current.setGroups(portalGroupsResult.data);
    }
    fetchData();

    if (window.innerWidth < 1200) { appStateRef.current.setMultiplier(4) } else
    if (window.innerWidth < 1500) { appStateRef.current.setMultiplier(5) } else
    { appStateRef.current.setMultiplier(6) }
  },[])

  const cellClicked = (data) => {
    //console.log(data)
  }

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%',width:'100%'}}>
      <div style={{position:'fixed',zIndex:'10000',width:'100%',background:'white'}}>
        <div style={{height:'60px',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <div><img style={{margin:'10px',width:'150px'}} src="Logo.57fd82aa.png" alt="Toshiba"/></div>
          <div><img style={{margin:'10px',borderRadius:'50%',width: 40,height:40}} src="https://azureportal.skillnet.net/UserFiles/55483/Pictures/Pic_55483_56116_Avatar.jpg" alt="Toshiba"/></div>
        </div>
        <Toolstrip/>
      </div>
      <div style={{marginTop:'100px',flex:'1'}}>
        {appState.groups === null &&
          <div style={{marginTop:'90px',marginLeft:'60px',fontSize:'45px'}}>Matrix is Loading...</div>
        }
        {appState.groups !== null &&
        <TrainingMatrix
          multiplier={appState.multiplier}
          showLegend={appState.legend}
          groupID={appState.groupID}
          //skillsData={appState.skills}
          //operatorsData={appState.operators}
          //certificationsData={appState.certifications}
          cellClicked={cellClicked}
        />
        }
      </div>
    </div>
  )
}






    // var url = 'https://skillnetusersapi.azurewebsites.net/api/PartnerLocations?partnerid=434'
    // axios
    // .get(url, {
    //   auth: {username: 'skillnet',password: 'demo'}
    // })
    // .then((response) => {
    //   console.log('result: ', response)
    // })
