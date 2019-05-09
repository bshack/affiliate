/* MODELS
 *************************************/

import ModelPageUnsubscribe from '../model/pageUnsubscribe';

/* ROUTE
 *************************************/

exports.index = function(req, res) {

    let modelPageUnsubscribe = new ModelPageUnsubscribe(req.app);

    Promise.all([
        modelPageUnsubscribe.store.dispatch(
            modelPageUnsubscribe.getAll({
                email: req.query.email
            })
        )
    ]).then(() => {
        res.render('unsubscribe', {
            modelPageUnsubscribe: modelPageUnsubscribe
        });
    });

};
