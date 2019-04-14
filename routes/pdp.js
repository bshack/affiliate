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

    let pathData = path.parse(req.path);
    let productParams = {
        path: pathData.dir.substr(1),
        filename: pathData.name
    };
    let productRecommendationsParams = {
        skipFilename: pathData.name,
        path: pathData.dir.substr(1),
        limit: 8
    };
    let modelProduct = new ModelProduct(req.app);
    let modelProductRecommendations = new ModelProduct(req.app);
    let modelCategory = new ModelCategory(req.app);
    let modelNavigationMain = new ModelNavigationMain(req.app);
    let modelBreadcrumbs = new ModelBreadcrumbs(req.app);
    let modelNavigationFooter = new ModelNavigationFooter(req.app);

    Promise.all([
        modelProduct.store.dispatch(
            modelProduct.getAll(productParams)
        ),
        modelProductRecommendations.store.dispatch(
            modelProductRecommendations.getAll(productRecommendationsParams)
        ),
        modelCategory.store.dispatch(
            modelCategory.getAll({})
        ),
        modelNavigationMain.store.dispatch(
            modelNavigationMain.getMainNavigation({})
        ),
        modelBreadcrumbs.store.dispatch(
            modelBreadcrumbs.getAll(productParams)
        ),
        modelNavigationFooter.store.dispatch(
            modelNavigationFooter.getAll()
        )
    ]).then(() => {
        res.render('pdp', {
            configPublic: req.app.get('configPublic').store.getState(),
            navigationMain: modelNavigationMain.store.getState(),
            navigationFooter: modelNavigationFooter.store.getState(),
            breadcrumbs: modelBreadcrumbs.store.getState(),
            categories: modelCategory.store.getState(),
            products: modelProduct.store.getState(),
            productRecommendations: modelProductRecommendations.store.getState()
        });
    });

};
