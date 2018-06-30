const ModelSite = require('../models/site');

exports.index = function(req, res) {

    let modelSite = new ModelSite(req.app);

    modelSite.store.subscribe(() => {
        res.render('index', modelSite.store.getState()[0]);
    });

    modelSite.store.dispatch(
      modelSite.getOne({
          id: 1,
          hostname: 'localhost'
      })
    );

};
