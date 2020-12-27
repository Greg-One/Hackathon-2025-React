import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './assets/vendor/normalize.css';
import './pages/index.css';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <App/>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
