import path from 'path';

/* MODELS
 *************************************/

import StorePage from '../store/page/content';

let storePage = new StorePage();

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
