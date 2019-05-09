import path from 'path';

/* MODELS
 *************************************/

import ModelPagePDP from '../model/pagePDP';

/* ROUTE
 *************************************/

exports.index = function(req, res) {

    let modelPagePDP = new ModelPagePDP(req.app);
    let pathData = path.parse(req.path);

    Promise.all([
        modelPagePDP.store.dispatch(
            modelPagePDP.getAll({
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
            modelPagePDP: modelPagePDP
        });
    });

};
