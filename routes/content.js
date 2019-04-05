const path = require('path');


/* MODELS
 *************************************/

const ModelContent = require('../models/content');
const ModelProduct = require('../models/product');
const ModelCategory = require('../models/category');
const ModelNavigation = require('../models/navigation');
const ModelBreadcrumbs = require('../models/breadcrumbs');


/* ROUTE
 *************************************/

exports.index = function(req, res) {

    let contentParams = {
        filename: path.parse(req.path).name
    };

    let modelContent = new ModelContent(req.app);
    let modelProduct = new ModelProduct(req.app);
    let modelCategory = new ModelCategory(req.app);
    let modelNavigation = new ModelNavigation(req.app);
    let modelBreadcrumbs = new ModelBreadcrumbs(req.app);

    Promise.all([
        modelContent.store.dispatch(
            modelContent.getAll(contentParams)
        ),
        modelProduct.store.dispatch(
            modelProduct.getAll({})
        ),
        modelCategory.store.dispatch(
            modelCategory.getAll({})
        ),
        modelNavigation.store.dispatch(
            modelNavigation.getMainNavigation({})
        ),
        modelBreadcrumbs.store.dispatch(
            modelBreadcrumbs.getAll({})
        )
    ]).then(() => {
        res.render('content', {
            configPublic: req.app.get('configPublic').store.getState(),
            navigation: modelNavigation.store.getState(),
            breadcrumbs: modelBreadcrumbs.store.getState(),
            content: modelContent.store.getState(),
            categories: modelCategory.store.getState(),
            products: modelProduct.store.getState()
        });
    });

};
