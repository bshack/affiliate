/* MODELS
 *************************************/
const ModelContent = require('../models/content');
const ModelProduct = require('../models/product');
const ModelCategory = require('../models/category');
const ModelNavigationMain = require('../models/navigationMain');
const ModelNavigationFooter = require('../models/navigationFooter');


/* ROUTE
 *************************************/

exports.index = function(req, res) {

    let contentParams = {
        filename: 'index'
    };

    let modelContent = new ModelContent(req.app);
    let modelProduct = new ModelProduct(req.app);
    let modelProductFeatured = new ModelProduct(req.app);
    let modelCategory = new ModelCategory(req.app);
    let modelNavigationMain = new ModelNavigationMain(req.app);
    let modelNavigationFooter = new ModelNavigationFooter(req.app);

    Promise.all([
        modelContent.store.dispatch(
            modelContent.getAll(contentParams)
        ),
        modelProduct.store.dispatch(
            modelProduct.getAll({
                'product.isFeatured': false,
                limit: 8
            })
        ),
        modelProductFeatured.store.dispatch(
            modelProductFeatured.getAll({
                'product.isFeatured': true,
                limit: 8
            })
        ),
        modelCategory.store.dispatch(
            modelCategory.getAll({})
        ),
        modelNavigationMain.store.dispatch(
            modelNavigationMain.getMainNavigation({})
        ),
        modelNavigationFooter.store.dispatch(
            modelNavigationFooter.getAll()
        )
    ]).then(() => {
        res.render('index', {
            configPublic: req.app.get('configPublic').store.getState(),
            navigationMain: modelNavigationMain.store.getState(),
            navigationFooter: modelNavigationFooter.store.getState(),
            content: modelContent.store.getState(),
            categories: modelCategory.store.getState(),
            productsFeatured: modelProductFeatured.store.getState(),
            products: modelProduct.store.getState()
        });
    });

};
