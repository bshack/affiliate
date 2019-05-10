/* MODELS
 *************************************/

import StorePageIndex from '../store/page/index';

let storePageIndex = new StorePageIndex();

/* ROUTE
 *************************************/

exports.index = function(req, res) {

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
