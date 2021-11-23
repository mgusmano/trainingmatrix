import React, { useEffect, useRef, useState } from 'react';
import { useAppState } from './state/AppProvider';
import { Toolstrip } from './Toolstrip.js';
import TrainingMatrix from './trainingmatrix/TrainingMatrix';
import axios from "axios";
import qs from 'qs';
//import { getParameterByName } from './state/Util';

export const App = () => {
  const appState = useAppState();
  const appStateRef = useRef(appState);
  const [token, setToken] = useState(null);

  useEffect(() => {
    //setToken(getParameterByName('token'));
    setToken('token');

    async function fetchData() {
      const apiRoot = 'https://skillnetusersapi.azurewebsites.net/api';
      const apiRoot2 = 'https://skillnetusersapi.azurewebsites.net';
      const auth = {auth:{username:'skillnet',password:'demo'}};


      var url = `${apiRoot2}/token`;
      var j = {"userName": "gabriel.porizan@nordlogic.com","grant_type": "password"}
      console.log(url)
      console.log(j)
      const tokenPostResult = await axios.post(url,qs.stringify(j),auth);
      console.log(tokenPostResult)

      //http://skillnetusersapi.azurewebsites.net/token(post) will return you a access token.
      //{"userName": "gabriel.porizan@nordlogic.com","grant_type": "password"}



      // const tokenResult = await axios(apiRoot + '/decodetoken?token=KpXYQ1m4PmT6UYZv9IlrLQ==', auth);
      // console.log(tokenResult)

      const portalGroupsResult = await axios(apiRoot + '/portalgroups?partnerid=448', auth);
      appStateRef.current.setGroups(portalGroupsResult.data);
    }
    fetchData();

    if (window.innerWidth < 1200) { appStateRef.current.setMultiplier(4) } else
    if (window.innerWidth < 1500) { appStateRef.current.setMultiplier(5) } else
    { appStateRef.current.setMultiplier(6) }
  },[])

  // const cellClicked = (data) => {
  //   //console.log(data)
  // }

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%',width:'100%'}}>
      <div style={{position:'fixed',zIndex:'10000',width:'100%',background:'white'}}>
        <div style={{height:'60px',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <div><img style={{margin:'10px',width:'150px'}} src="Logo.57fd82aa.png" alt="Toshiba"/></div>
          <div><img style={{margin:'10px',borderRadius:'50%',width: 40,height:40}} src="https://azureportal.skillnet.net/UserFiles/55483/Pictures/Pic_55483_56116_Avatar.jpg" alt="Toshiba"/></div>
        </div>
        <Toolstrip/>
      </div>
      {token === null &&
        <div style={{marginTop:'130px',marginLeft:'60px',fontSize:'45px'}}>No Authenticated User...</div>
      }
      {token !== null &&
      <div style={{marginTop:'100px',flex:'1'}}>
        {appState.groups === null &&
          <div style={{marginTop:'90px',marginLeft:'60px',fontSize:'45px'}}>Matrix is Loading...</div>
        }
        {appState.groups !== null &&
        <TrainingMatrix
          multiplier={appState.multiplier}
          showLegend={appState.legend}
          groupID={appState.groupID}
          //cellClicked={cellClicked}
        />
        }
      </div>
      }
    </div>
  )
}
