import React from 'react';
import ReactDOM from 'react-dom';
import Page from './page/content.jsx';
import {Provider} from 'react-redux';
import StorePage from '../store/page/content';
import path from 'path';
import config from '../configPublic.json';

const storePage = new StorePage(config);

export default function() {

    let container = document.querySelector('html');

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
                    <Page store={storePage.store} includeWrapper={false} />,
                    container
                );
            }
        });
}
