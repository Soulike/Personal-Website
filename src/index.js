import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Store from './Store';
import Router from './Router';
import './index.css';

ReactDOM.render(
    <Provider store={Store}>
        <Router/>
    </Provider>
    , document.getElementById('root'));

