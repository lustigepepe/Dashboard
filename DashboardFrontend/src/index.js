import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, HashRouter  } from 'react-router-dom';
// sessionStorage.setItem("is_reloaded", true);

ReactDOM.render(
    <HashRouter >
        <App />
    </HashRouter>, 
    document.getElementById('root')
);

registerServiceWorker();
