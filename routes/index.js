const ModelProduct = require('../models/product');
const ModelCategory = require('../models/category');

exports.index = function(req, res) {

    let modelProduct = new ModelProduct(req.app);
    let modelCategory = new ModelCategory(req.app);

    Promise.all([
        modelProduct.store.dispatch(
            modelProduct.getAll({})
        ),
        modelCategory.store.dispatch(
            modelCategory.getAll({})
        )
    ]).then(() => {
        res.render('index', {
            categories: modelCategory.store.getState(),
            products: modelProduct.store.getState()
        });
    });

};
