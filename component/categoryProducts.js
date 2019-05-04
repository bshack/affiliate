const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');
const Store = require('../model/product');
const CategoryProductsTemplate = require('./template/categoryProducts.jsx');
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
