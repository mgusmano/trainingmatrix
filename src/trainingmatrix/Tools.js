import React, { useState, useEffect } from 'react';
import { useMatrixState } from './state/MatrixProvider';
import { useAppState } from '../state/AppProvider';
import { API } from 'aws-amplify'
import {Auth} from 'aws-amplify';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { useHistory } from "react-router-dom";

export const Tools = React.memo((props) => {
  const appState = useAppState();
  const matrixState = useMatrixState();
  const history = useHistory();

  useEffect(() => {
    // Auth.currentAuthenticatedUser()
    // .then(user => {
    //   matrixState.setAuthenticatedUser(user.username)
    // })
    // .catch(ex => {
    //   matrixState.setAuthenticatedUser(ex)
    // });
  },[])

  // function checkUser() {
  //   let user = Auth.currentAuthenticatedUser();

  //   Auth.currentAuthenticatedUser()
  //   .then(user => {
  //     console.log(user);
  //     return user;
  //   })
  //   .catch(ex => {
  //     console.log(ex);
  //   });
  //   //alert(user)
  // }

  // function signOut() {
  //   //let user = Auth.currentAuthenticatedUser();

  //   Auth.signOut()
  //   .then(user => {
  //     console.log(user);
  //     return user;
  //   })
  //   .catch(ex => {
  //     console.log(ex);
  //     console.log("inside signOut catch, calling federatedSignIn");
  //     //Auth.federatedSignIn({ provider: "Federate" });
  //   });


  //   //alert(user)
  // }


  const onClickSize = (e,direction) => {
    var multiplier;
    if (direction === 'small') {
      multiplier = matrixState.dimensions.multiplier-1;
    }
    else {
      multiplier = matrixState.dimensions.multiplier+1;
    }

    var col1=0
    var row2=0
    if (matrixState.dimensions.topHeight === 0) {
      //here
      col1 = matrixState.original.col1*multiplier
      row2 = matrixState.original.row2*multiplier
    }
    else {
      col1 = 0*multiplier
      row2 =((matrixState.original.row2*2)*multiplier)+matrixState.dimensions.topHeight
      console.log(row2)
    }
    console.log(col1)
    console.log(row2)

    var d = {
      multiplier: multiplier,
      topHeight: matrixState.original.topHeight*multiplier,
      fontsize: matrixState.original.fontsize*multiplier,
      bandX: matrixState.original.bandX*multiplier,
      bandY: matrixState.original.bandY*multiplier,

      col1: col1,
      //here
      col2: matrixState.original.col2*multiplier,
      col3: matrixState.original.col3*multiplier,
      row1: matrixState.original.row1*multiplier,
      row2: row2,
      //here
      row3: matrixState.original.row3*multiplier,
    }
    console.log(d)


    matrixState.setDimensions(d)
  }

  return (

    <div className='toolbar'  style={{height:'50px',background:'gray',fontSize:'18px'}}>
      <div style={{margin:'10px',display:'flex',flexDirection:'row',color:'white'}}>
        <div style={{margin:'5px 10px 0 60px'}}>
          matrix size:
        </div>
        <button style={{width:'60px',height:'30px'}} onClick={(e)=>onClickSize(e,'small')}>smaller</button>
        <button style={{width:'60px',height:'30px'}} onClick={(e)=>onClickSize(e,'large')}>larger</button>
        {/* <button style={{marginLeft:'40px',width:'120px',height:'30px'}}
          onClick={(e)=> {
            matrixState.toggleLegend()
          }}
        >
          Toggle Legend
        </button>*/}

        <button style={{display:'none',height:'40px',width:'120px',height:'30px'}}
          onClick={(e)=> {
            matrixState.setUserName('newmatrix')
            appState.setUserName('newapp')
          }}
        >
          UserName
        </button>


{/* <div>{appState.userName}</div> -
<div>{matrixState.userName}</div> */}

                {/* <div style={{display:'none',fontSize:'14px',marginTop:'29px',marginRight:'9px',color:'white',textDecoration:'none'}}>Logged In User: {matrixState.authenticateduser}</div> */}






        {/* <AmplifySignOut
          handleAuthStateChange = {(nextAuthState,data) => {
            console.log(nextAuthState)
            if (nextAuthState == 'signedout') {
              matrixState.setAuthenticatedUser('')
              history.push("/admin");
              history.push("/trainingmatrix");
            }
          }}
        /> */}

{/*
        <button
          onClick={async () => {
            var data = await API.get('skillsapi','/skills')
            console.log(data)
            //https://thaoqib2c6.execute-api.us-east-1.amazonaws.com/dev
          }}
        >skillsapi</button> */}

        {/* <button style={{marginLeft:'40px',width:'100px',height:'30px'}} onClick={()=>checkUser()}>check user</button>
        <button style={{marginLeft:'0',width:'100px',height:'30px'}} onClick={()=>signOut()}>sign out</button> */}


      </div>
    </div>

  )
})