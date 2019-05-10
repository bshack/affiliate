/* MODELS
 *************************************/

import StorePageUnsubscribe from '../store/page/unsubscribe';

let storePageUnsubscribe = new StorePageUnsubscribe();

/* ROUTE
 *************************************/

exports.index = function(req, res) {

    Promise.all([
        storePageUnsubscribe.store.dispatch(
            storePageUnsubscribe.getAll({
                email: req.query.email
            })
        )
    ]).then(() => {
        res.render('unsubscribe', {
            storePageUnsubscribe: storePageUnsubscribe
        });
    });

};
