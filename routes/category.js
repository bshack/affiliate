const ModelProduct = require('../models/product');
const path = require("path")

exports.index = function(req, res) {

    let modelProduct = new ModelProduct(req.app);
    let productGetParams = {
        seoDirectoryNamePart: path.dirname(req.path).substr(1)
    };

    modelProduct.store.subscribe(() => {
        res.render('index', {
            products: modelProduct.store.getState()
        });
    });

    modelProduct.store.dispatch(
      modelProduct.getAll(productGetParams)
    );

};
