import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { AppProvider } from './state/AppProvider';
import './index.css'
import reactToWebComponent from 'react-to-webcomponent';
const Index = () => (<AppProvider><App/></AppProvider>);

ReactDOM.render(<AppProvider><App/></AppProvider>,document.getElementById('root'));
//customElements.define('training-matrix', reactToWebComponent(Index, React, ReactDOM));