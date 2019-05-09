import path from 'path';

/* MODELS
 *************************************/

import ModelPageContent from '../model/pageContent';

/* ROUTE
 *************************************/

exports.index = function(req, res) {

    let modelPageContent = new ModelPageContent(req.app);

    Promise.all([
        modelPageContent.store.dispatch(
            modelPageContent.getAll({
                filename: path.parse(req.path).name
            })
        )
    ]).then(() => {
        res.render('content', {
            modelPageContent: modelPageContent
        });
    });

};
