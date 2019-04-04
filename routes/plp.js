const path = require("path");
const ModelProduct = require('../models/product');
const ModelCategory = require('../models/category');
const ModelNavigation = require('../models/navigation');
const ModelBreadcrumbs = require('../models/breadcrumbs');

exports.index = function(req, res) {

    let productParams = {
        path: path.dirname(req.path).substr(1)
    };

    let categoryParams = {
        path: productParams.path
    };

    let breadcrumbParams = {
        path: productParams.path
    };

    let modelProduct = new ModelProduct(req.app);
    let modelCategory = new ModelCategory(req.app);
    let modelNavigation = new ModelNavigation(req.app);
    let modelBreadcrumbs = new ModelBreadcrumbs(req.app);

    Promise.all([
        modelProduct.store.dispatch(
            modelProduct.getAll(productParams)
        ),
        modelCategory.store.dispatch(
            modelCategory.getAll(categoryParams)
        ),
        modelNavigation.store.dispatch(
            modelNavigation.getMainNavigation({})
        ),
        modelBreadcrumbs.store.dispatch(
            modelBreadcrumbs.getAll(breadcrumbParams)
        )
    ]).then(() => {
        res.render('plp', {
            navigation: modelNavigation.store.getState(),
            breadcrumbs: modelBreadcrumbs.store.getState(),
            category: modelCategory.store.getState(),
            products: modelProduct.store.getState()
        });
    });

};
