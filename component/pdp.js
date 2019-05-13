import React from 'react';
import ReactDOM from 'react-dom';
import Page from './page/pdp.jsx';
import {Provider} from 'react-redux';
import StorePage from '../store/page/pdp';
import path from 'path';
import config from '../configPublic.json';

const storePage = new StorePage(config);

export default function() {

    let container = document.querySelector('#app');
    let pathName = window.location.pathname;

    Promise.all([
        storePage.store.dispatch(
            storePage.getAll({
                product: {
                    path: path.dirname(pathName).substr(1),
                    filename: path.basename(pathName, '.html')
                },
                recommendations: {
                    skipFilename: path.basename(pathName, '.html'),
                    path: path.dirname(pathName).substr(1),
                    limit: 8
                }
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
}
