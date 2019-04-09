/* MODELS
 *************************************/
const ModelContent = require('../models/content');
const ModelProduct = require('../models/product');
const ModelCategory = require('../models/category');
const ModelNavigation = require('../models/navigation');


/* ROUTE
 *************************************/

exports.index = function(req, res) {

    let contentParams = {
        filename: 'index'
    };

    let modelContent = new ModelContent(req.app);
    let modelProduct = new ModelProduct(req.app);
    let modelCategory = new ModelCategory(req.app);
    let modelNavigation = new ModelNavigation(req.app);
    let modelNavigationFooter = new ModelContent(req.app);

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
        modelNavigationFooter.store.dispatch(
            modelNavigationFooter.getAll({
                filename: [
                    'contact',
                    'terms-of-service',
                    'privacy-policy'
                ]
            })
        )
    ]).then(() => {
        res.render('index', {
            configPublic: req.app.get('configPublic').store.getState(),
            navigation: modelNavigation.store.getState(),
            navigationFooter: modelNavigationFooter.store.getState(),
            content: modelContent.store.getState(),
            categories: modelCategory.store.getState(),
            products: modelProduct.store.getState()
        });
    });

};
