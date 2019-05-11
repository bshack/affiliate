import React from 'react';
import ReactDOM from 'react-dom';
import PageIndex from './page/index.jsx';
import {Provider} from 'react-redux';
import StorePage from '../store/page/index';
import config from '../configPublic.json';

const storePage = new StorePage(config);

export default function() {

    let container = document.querySelector('html');

    Promise.all([
        storePage.store.dispatch(
            storePage.getAll({})
        )
    ])
        .then(()=>{
            if (container) {
                ReactDOM.render(
                    <PageIndex store={storePage.store}/>,
                    container
                );
            }
        });
}
