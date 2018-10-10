import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Store from './Store';
import Router from './Router';
import 'highlight.js/styles/vs2015.css';
import './index.scss';

ReactDOM.render(
    <Provider store={Store}>
        <Router/>
    </Provider>
    , document.getElementById('root'));

