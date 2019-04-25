const React = require('react');
const ReactDOM = require('react-dom');
const CategoryProductsTemplate = require('./template/categoryProducts.jsx');

export default function() {

    let container = document.querySelector('.category-products');

    if (container) {
        ReactDOM.render(
            <CategoryProductsTemplate />,
            container
        );
    }

}
