import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { AppProvider } from './state/AppProvider';
import './index.css'

//import reactToWebComponent from 'react-to-webcomponent';
//const Index = () => (<AppProvider><App/></AppProvider>);
//customElements.define('training-matrix', reactToWebComponent(Index, React, ReactDOM));

sessionStorage.setItem('userID',12345)
sessionStorage.setItem('partnerID',448)
ReactDOM.render(<AppProvider><App/></AppProvider>,document.getElementById('root'));
