import path from 'path';

/* MODELS
 *************************************/

import StorePage from '../store/page/pdp';
import config from '../configPublic.json';
import configPrivate from '../configPrivate.json';

// serverside should access the api on a private network
config.api.origin = configPrivate.api.origin;

let storePage = new StorePage(config);

/* ROUTE
 *************************************/

exports.index = function(req, res) {

    let pathData = path.parse(req.path);

    Promise.all([
        storePage.store.dispatch(
            storePage.getAll({
                product: {
                    path: pathData.dir.substr(1),
                    filename: pathData.name
                },
                recommendations: {
                    skipFilename: pathData.name,
                    path: pathData.dir.substr(1),
                    limit: 8
                }
            })
        )
    ]).then(() => {
        res.render('pdp', {
            store: storePage.store,
            fullDocumentRender: true
        });
    });

};
