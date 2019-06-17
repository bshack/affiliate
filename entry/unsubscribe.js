import 'picturefill';
import React from 'react';
import ReactDOM from 'react-dom';
import Page from '../component/page/unsubscribe.jsx';
import {Provider} from 'react-redux';
import StorePage from '../store/page/unsubscribe';
import UtilityString from '../utility/string';

const storePage = new StorePage();
const utilityString = new UtilityString();

let container = document.querySelector('#app');

Promise.all([
    storePage.store.dispatch(
        storePage.getAll({
            email: utilityString.getQueryStringParamater('email', window.location.href)
        })
    )
])
    .then(()=>{
        if (container) {
            ReactDOM.hydrate(
                <Page store={storePage.store}/>,
                container
            );
        }
    });
