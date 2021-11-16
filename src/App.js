import React, { useEffect } from 'react';
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

  useEffect(() => {
    async function fetchData() {
      const apiRoot = 'https://skillnetusersapi.azurewebsites.net/api/';
      const auth = {auth:{username:'skillnet',password:'demo'}};
      // const skillsResult = await axios(`data/trainingmatrix/data/${appState.groupid}/skills.json`);
      // const operatorsResult = await axios(`data/trainingmatrix/data/${appState.groupid}/operators.json`);
      // const certificationsResult = await axios(`data/trainingmatrix/data/${appState.groupid}/certifications.json`);





      //const groupsResult = await axios(`data/trainingmatrix/data/groups.json`);

      //const __dirname = dirname(`data/trainingmatrix/data/1}/`);
      //console.log(__dirname)
      // const file = join(__dirname, 'db.json')
      // const adapter = new JSONFile(file)
      // const db = new Low(adapter)
      // await db.read()
      // console.log(db)

      // const portalGroupSkillsResult = await axios(apiRoot + 'PortalGroupSkills?partnerid=448&groupid=33784',{auth:{username:'skillnet',password:'demo'}});
      // console.log('portalGroupSkillsResult')
      // console.log(portalGroupSkillsResult)
      // console.log(JSON.parse(portalGroupSkillsResult.data))
      // const portalGroupOperatorsResult = await axios(apiRoot + 'PortalGroupOperators?groupid=33784',{auth:{username:'skillnet',password:'demo'}});
      // console.log('portalGroupOperatorsResult')
      // console.log(portalGroupOperatorsResult)

      const portalGroupsResult = await axios(apiRoot + 'portalgroups?partnerid=448', auth);
      //console.log('portalGroupsResult')
      //console.log(portalGroupsResult)

      //http://skillnetusersapi.azurewebsites.net//api/PortalCertificationsRating?groupid=34750
      //http://localhost:51186//api/PortalGroupUpdateOperatorCertification?groupid=34750&skillID=44222&operatorID=284496&certificationData=2
      //https://skillnetusersapi.azurewebsites.net//api/PortalCertificationsRating?groupid=34750
      //https://skillnetusersapi.azurewebsites.net/api/PortalCertificationsRating?groupid=34707'

      // appState.setSkills(skillsResult.data);
      // appState.setOperators(operatorsResult.data);
      // appState.setCertifications(certificationsResult.data);



      // //appState.setGroups(groupsResult.data);
      appState.setGroups(portalGroupsResult.data);
    }
    fetchData();

    if (window.innerWidth < 1200) { appState.setMultiplier(4) } else
    if (window.innerWidth < 1500) { appState.setMultiplier(5) } else
    { appState.setMultiplier(6) }
  },[appState.groupid])

  const cellClicked = (data) => {
    //console.log(data)
  }

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%',width:'100%'}}>
      <div style={{position:'fixed',zIndex:'10000',width:'100%',background:'white'}}>
        <div style={{height:'50px'}}><img style={{margin:'10px',width:'150px'}} src="toshiba.png" alt="Toshiba"/></div>
        <Toolstrip/>
      </div>
      <div style={{marginTop:'90px',flex:'1'}}>
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
