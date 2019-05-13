/* MODELS
 *************************************/

import StorePage from '../store/page/unsubscribe';
import config from '../configPublic.json';
import configPrivate from '../configPrivate.json';

// serverside should access the api on a private network
config.api.origin = configPrivate.api.origin;

let storePage = new StorePage(config);

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
            store: storePage.store,
            fullDocumentRender: true
        });
    });

};
