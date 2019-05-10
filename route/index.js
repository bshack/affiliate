/* MODELS
 *************************************/

import StorePageIndex from '../store/page/index';

/* ROUTE
 *************************************/

exports.index = function(req, res) {

    let storePageIndex = new StorePageIndex(req.app);

    Promise.all([
        storePageIndex.store.dispatch(
            storePageIndex.getAll()
        )
    ]).then(() => {
        res.render('index', {
            storePageIndex: storePageIndex
        });
    });

};
