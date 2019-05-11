/* MODELS
 *************************************/

import StorePage from '../store/page/index';

let storePage = new StorePage();

/* ROUTE
 *************************************/

exports.index = function(req, res) {

    Promise.all([
        storePage.store.dispatch(
            storePage.getAll()
        )
    ]).then(() => {
        res.render('index', {
            store: storePage.store
        });
    });

};
