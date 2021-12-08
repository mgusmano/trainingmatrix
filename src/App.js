import React, { useEffect, useRef, useState } from 'react';
import { useAppState } from './state/AppProvider';
import { Toolstrip } from './Toolstrip.js';
import TrainingMatrix from './trainingmatrix/TrainingMatrix';
import axios from "axios";
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
      //const apiRoot2 = 'https://skillnetusersapi.azurewebsites.net';
      const auth = {auth:{username:'skillnet',password:'demo'}};


      // var url = `${apiRoot2}/token`;
      // var j = {"userName": "gabriel.porizan@nordlogic.com","grant_type": "password"}
      // const tokenPostResult = await axios.post(url,qs.stringify(j),auth);



      //console.log(tokenPostResult)

      //http://skillnetusersapi.azurewebsites.net/token(post) will return you a access token.
      //{"userName": "gabriel.porizan@nordlogic.com","grant_type": "password"}



      // const tokenResult = await axios(apiRoot + '/decodetoken?token=KpXYQ1m4PmT6UYZv9IlrLQ==', auth);
      // console.log(tokenResult)

      //const portalGroupsResult = await axios(apiRoot + '/portalgroups?partnerid=448', auth);
      var url = apiRoot + '/portalgroups?partnerid=' + sessionStorage.getItem('partnerID')
      //console.log(url)
      const portalGroupsResult = await axios(url, auth);
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
          // <div style={{height:'60px',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
        //   <div><img style={{margin:'10px',width:'150px'}} src="Logo.57fd82aa.png" alt="Toshiba"/></div>
        //   <div><img style={{margin:'10px',borderRadius:'50%',width: 40,height:40}} src="https://azureportal.skillnet.net/UserFiles/55483/Pictures/Pic_55483_56116_Avatar.jpg" alt="Toshiba"/></div>
        // </div>

        // <div style={{xmarginTop:'100px',flex:'1',width:'100%',background:'lightgray'}}>

      // <div style={{boxSizing:'border-box',height:'69px',width:'100%',background:'white',padding:'20px',fontSize:'24px'}}>
      //   SkillNet Header
      // </div>
      // <div style={{boxSizing:'border-box',height:'43px',width:'100%',background:'#337ab7',padding:'20px'}}></div>

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%',width:'100%',overflow:'hidden'}}>



      <div style={{zIndex:'10000',width:'100%',background:'white'}}>
        <Toolstrip/>
      </div>
      {token === null &&
        <div style={{xmarginTop:'130px',marginLeft:'60px',fontSize:'45px'}}>No Authenticated User...</div>
      }
      {token !== null &&
<>
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
</>
      }
    </div>
  )
}
