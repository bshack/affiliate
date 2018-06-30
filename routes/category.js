const ModelCategory = require('../models/category');

exports.index = function(req, res) {

    let modelCategory = new ModelCategory(req.app);

    modelCategory.store.subscribe(() => {
        res.render('category', modelCategory.store.getState()[0]);
    });

    modelCategory.store.dispatch(
      modelCategory.getOne({
          id: 2,
          hostname: 'localhost'
      })
    );

};
