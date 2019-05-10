import path from 'path';

/* MODELS
 *************************************/

import StorePagePDP from '../store/page/pdp';

let storePagePDP = new StorePagePDP();

/* ROUTE
 *************************************/

exports.index = function(req, res) {
    
    let pathData = path.parse(req.path);

    Promise.all([
        storePagePDP.store.dispatch(
            storePagePDP.getAll({
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
            storePagePDP: storePagePDP
        });
    });

};
