const ModelProduct = require('../models/product');
const ModelCategory = require('../models/category');
const ModelNavigation = require('../models/navigation');

exports.index = function(req, res) {

    let modelProduct = new ModelProduct(req.app);
    let modelCategory = new ModelCategory(req.app);
    let modelNavigation = new ModelNavigation(req.app);

    Promise.all([
        modelProduct.store.dispatch(
            modelProduct.getAll({})
        ),
        modelCategory.store.dispatch(
            modelCategory.getAll({})
        ),
        modelNavigation.store.dispatch(
            modelNavigation.getMainNavigation({})
        )
    ]).then(() => {
        res.render('index', {
            navigation: modelNavigation.store.getState(),
            categories: modelCategory.store.getState(),
            products: modelProduct.store.getState()
        });
    });

};
