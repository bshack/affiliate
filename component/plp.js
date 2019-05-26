import React from 'react';
import ReactDOM from 'react-dom';
import Page from './page/plp.jsx';
import {Provider} from 'react-redux';
import StorePage from '../store/page/plp';
import path from 'path';

const storePage = new StorePage();

export default function() {

    let container = document.querySelector('#app');
    let pathName = window.location.pathname;

    let productParams = {};
    let categoryParams = {};
    let breadcrumbParams = {};

    if (pathName.lastIndexOf('/store/', 0) === 0) {
        productParams.programName = pathName.split('/')[2];
        categoryParams.programName = productParams.programName;
        breadcrumbParams.programName = productParams.programName;
    } else if (pathName.lastIndexOf('/brand/', 0) === 0) {
        productParams.brand = pathName.split('/')[2];
        categoryParams.brand = productParams.brand;
        breadcrumbParams.brand = productParams.brand;
    } else {
        productParams.path = path.dirname(pathName).substr(1);
        categoryParams.path = productParams.path;
        breadcrumbParams.path = productParams.path;
    }

    Promise.all([
        storePage.store.dispatch(
            storePage.getAll({
                product: productParams,
                category: categoryParams,
                breadcrumbs: breadcrumbParams
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
