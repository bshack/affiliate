const ModelProduct = require('../models/product');

exports.index = function(req, res) {

    let modelProduct = new ModelProduct(req.app);
    
    modelProduct.store.subscribe(() => {
        console.log(modelProduct.store.getState());
        res.render('product', modelProduct.store.getState()[0]);
    });

    modelProduct.store.dispatch(
      modelProduct.getOne({
          id: 7,
          hostname: 'localhost'
      })
    );

};
