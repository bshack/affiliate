import React from 'react';
import ReactDOM from 'react-dom';
import CategoryProductsTemplate from './template/categoryProducts.jsx';
import {Provider} from 'react-redux';
import Store from '../model/product';

const store = new Store();

export default function() {

    let container = document.querySelector('.category-products');

    Promise.all([
        store.store.dispatch(
            store.getAll({})
        )
    ])
        .then(()=>{
            if (container) {
                ReactDOM.render(
                    <Provider store={store.store}>
                        <CategoryProductsTemplate />
                    </Provider>,
                    container
                );
            }
        });

}
