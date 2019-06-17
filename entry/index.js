import '../style/index.scss';
import '../image/social.png';
import '../image/favicon.png';
import '../image/apple-touch-icon.png';
import 'picturefill';
import React from 'react';
import ReactDOM from 'react-dom';
import Page from '../component/page/index.jsx';
import {Provider} from 'react-redux';
import StorePage from '../store/page/index';

const storePage = new StorePage();

let container = document.querySelector('#app');

Promise.all([
    storePage.store.dispatch(
        storePage.getAll({})
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
