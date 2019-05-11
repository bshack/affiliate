import path from 'path';

/* MODELS
 *************************************/

import StorePage from '../store/page/pdp';

let storePage = new StorePage();

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
            storePage: storePage
        });
    });

};
