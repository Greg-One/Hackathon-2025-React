import React from 'react';
import ReactDOM from 'react-dom';
import './assets/vendor/normalize.css';
import './pages/index.css';
import App from './App';
import {Router} from 'react-router-dom';
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

ReactDOM.render(
    <React.StrictMode>
        <Router history={customHistory}>
            <App/>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
