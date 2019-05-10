import path from 'path';

/* MODELS
 *************************************/

import StorePageContent from '../store/page/content';

let storePageContent = new StorePageContent();

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
            storePageContent: storePageContent
        });
    });

};
