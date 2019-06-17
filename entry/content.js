import '../style/index.scss';
import 'picturefill';
import React from 'react';
import ReactDOM from 'react-dom';
import Page from '../component/page/content.jsx';
import {Provider} from 'react-redux';
import StorePage from '../store/page/content';
import path from 'path';

const storePage = new StorePage();

let container = document.querySelector('#app');

Promise.all([
    storePage.store.dispatch(
        storePage.getAll({
            filename: window.location.pathname.split('.')[0].substr(1)
        })
    )
])
    .then(()=>{
        if (container) {
            ReactDOM.hydrate(
                <Page store={storePage.store} />,
                container
            );
        }
    });
