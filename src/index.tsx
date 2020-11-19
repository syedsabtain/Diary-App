import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import * as serviceWorker from './serviceWorker';
import {makeServer} from './Server/server'
import './bootstrap.min.css'
import userdata from './Store/Redux/user'
import {Provider} from 'react-redux'
import './Components/styles/all.min.css'
makeServer();
ReactDOM.render(
  <React.StrictMode>
    <Provider store={userdata}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
