/* MODELS
 *************************************/

import StorePageUnsubscribe from '../store/page/unsubscribe';

/* ROUTE
 *************************************/

exports.index = function(req, res) {

    let storePageUnsubscribe = new StorePageUnsubscribe(req.app);

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
