const path = require('path');


/* MODELS
 *************************************/

const ModelContent = require('../models/content');
const ModelProduct = require('../models/product');
const ModelCategory = require('../models/category');
const ModelNavigationMain = require('../models/navigationMain');
const ModelNavigationFooter = require('../models/navigationFooter');
const ModelBreadcrumbs = require('../models/breadcrumbs');


/* ROUTE
 *************************************/

exports.index = function(req, res) {

    let productParams = {
        path: path.dirname(req.path).substr(1),
        limit: 100
    };

    let categoryParams = {
        path: productParams.path
    };

    let breadcrumbParams = {
        path: productParams.path
    };

    let modelProduct = new ModelProduct(req.app);
    let modelCategory = new ModelCategory(req.app);
    let modelNavigationMain = new ModelNavigationMain(req.app);
    let modelBreadcrumbs = new ModelBreadcrumbs(req.app);
    let modelNavigationFooter = new ModelNavigationFooter(req.app);

    Promise.all([
        modelProduct.store.dispatch(
            modelProduct.getAll(productParams)
        ),
        modelCategory.store.dispatch(
            modelCategory.getAll(categoryParams)
        ),
        modelNavigationMain.store.dispatch(
            modelNavigationMain.getMainNavigation({})
        ),
        modelBreadcrumbs.store.dispatch(
            modelBreadcrumbs.getAll(breadcrumbParams)
        ),
        modelNavigationFooter.store.dispatch(
            modelNavigationFooter.getAll()
        )
    ]).then(() => {
        res.render('plp', {
            configPublic: req.app.get('configPublic').store.getState(),
            navigationMain: modelNavigationMain.store.getState(),
            navigationFooter: modelNavigationFooter.store.getState(),
            breadcrumbs: modelBreadcrumbs.store.getState(),
            category: modelCategory.store.getState(),
            products: modelProduct.store.getState()
        });
    });

};
