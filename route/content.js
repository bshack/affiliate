import path from 'path';

/* MODELS
 *************************************/

import StorePageContent from '../store/page/content';

/* ROUTE
 *************************************/

exports.index = function(req, res) {

    let storePageContent = new StorePageContent(req.app);

    Promise.all([
        storePageContent.store.dispatch(
            storePageContent.getAll({
                filename: path.parse(req.path).name
            })
        )
    ]).then(() => {
        res.render('content', {
            storePageContent: storePageContent
        });
    });

};
