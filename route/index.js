/* MODELS
 *************************************/

import ModelPageIndex from '../model/pageIndex';

/* ROUTE
 *************************************/

exports.index = function(req, res) {

    let modelPageIndex = new ModelPageIndex(req.app);

    Promise.all([
        modelPageIndex.store.dispatch(
            modelPageIndex.getAll()
        )
    ]).then(() => {
        res.render('index', {
            modelPageIndex: modelPageIndex
        });
    });

};
