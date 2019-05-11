import path from 'path';

/* MODELS
 *************************************/

import StorePage from '../store/page/content';
import config from '../configPublic.json';
import configPrivate from '../configPrivate.json';

// serverside should access the api on a private network
config.api.origin = configPrivate.api.origin;

let storePage = new StorePage(config);

/* ROUTE
 *************************************/

exports.index = function(req, res) {

    Promise.all([
        storePageContent.store.dispatch(
            storePageContent.getAll({
                filename: path.parse(req.path).name
            })
        )
    ]).then(() => {
        res.render('content', {
            storePage: storePage
        });
    });

};
