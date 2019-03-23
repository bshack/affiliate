const ModelProduct = require('../models/product');

exports.index = function(req, res) {

    let modelProduct = new ModelProduct(req.app);

    modelProduct.store.subscribe(() => {
        res.render('index', {
            products: modelProduct.store.getState()
        });
    });

    modelProduct.store.dispatch(
      modelProduct.getAll({})
    );

};
