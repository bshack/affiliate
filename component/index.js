import React from 'react';
import ReactDOM from 'react-dom';
import Page from './page/index.jsx';
import {Provider} from 'react-redux';
import StorePage from '../store/page/index';

const storePage = new StorePage();

export default function() {

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
}
