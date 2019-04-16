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

    let productParams = {};
    let categoryParams = {};
    let breadcrumbParams = {};
    let modelProduct = new ModelProduct(req.app);
    let modelCategory = new ModelCategory(req.app);
    let modelNavigationMain = new ModelNavigationMain(req.app);
    let modelBreadcrumbs = new ModelBreadcrumbs(req.app);
    let modelNavigationFooter = new ModelNavigationFooter(req.app);

    if (req.params.store) {
        productParams.programName = req.params.store;
        categoryParams.programName = productParams.programName;
        breadcrumbParams.programName = productParams.programName;
    } else if (req.params.brand) {
        productParams.brand = req.params.brand;
        categoryParams.brand = productParams.brand;
        breadcrumbParams.brand = productParams.brand;
    } else {
        productParams.path = path.dirname(req.path).substr(1);
        categoryParams.path = productParams.path;
        breadcrumbParams.path = productParams.path;
    }

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
