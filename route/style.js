import path from 'path';

/* MODELS
 *************************************/

import StorePage from '../store/page/style';
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
                filename: path.parse(req.path).name
            })
        )
    ]).then(() => {
        res.render('style', {
            store: storePage.store,
            fullDocumentRender: true
        });
    });

};
