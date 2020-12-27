import React from 'react';
import {Router} from 'react-router-dom';
import ReactDOM from 'react-dom';
import {createBrowserHistory} from "history";
import './assets/vendor/normalize.css';
import './pages/index.css';
import App from './App';

const customHistory = createBrowserHistory();

ReactDOM.render(
    <React.StrictMode>
        <Router history={customHistory}>
            <App/>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
