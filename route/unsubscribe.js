/* MODELS
 *************************************/

import StorePage from '../store/page/unsubscribe';

let storePage = new StorePage();

/* ROUTE
 *************************************/

exports.index = function(req, res) {

    Promise.all([
        storePage.store.dispatch(
            storePage.getAll({
                email: req.query.email
            })
        )
    ]).then(() => {
        res.render('unsubscribe', {
            storePage: storePage
        });
    });

};
