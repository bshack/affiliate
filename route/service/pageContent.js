const responseHeader = {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*'
};

/* MODELS
 *************************************/

import ModelContent from '../../model/content';
import ModelProduct from '../../model/product';
import ModelCategory from '../../model/category';
import ModelNavigationMain from '../../model/navigationMain';
import ModelNavigationFooter from '../../model/navigationFooter';
import ModelBreadcrumbs from '../../model/breadcrumbs';

/* ROUTE
 *************************************/

exports.get = function(req, res) {

    let contentParams = {
        filename: req.query.filename
    };

    let modelContent = new ModelContent(req.app);
    let modelProduct = new ModelProduct(req.app);
    let modelCategory = new ModelCategory(req.app);
    let modelNavigationMain = new ModelNavigationMain(req.app);
    let modelBreadcrumbs = new ModelBreadcrumbs(req.app);
    let modelNavigationFooter = new ModelNavigationFooter(req.app);

    Promise.all([
        modelContent.store.dispatch(
            modelContent.getAll(contentParams)
        ),
        modelProduct.store.dispatch(
            modelProduct.getAll({
                limit: 8
            })
        ),
        modelCategory.store.dispatch(
            modelCategory.getAll({})
        ),
        modelNavigationMain.store.dispatch(
            modelNavigationMain.getAll({})
        ),
        modelBreadcrumbs.store.dispatch(
            modelBreadcrumbs.getAll({})
        ),
        modelNavigationFooter.store.dispatch(
            modelNavigationFooter.getAll()
        )
    ])
    .then(() => {
        res.header(responseHeader)
            .status(200)
            .send({
                config: req.app.get('configPublic').store.getState(),
                meta: {
                    title: 'yo title',
                    description: 'yo description',
                    image: 'yo image',
                    canonical: 'yo canonical'
                },
                navigationMain: modelNavigationMain.store.getState(),
                navigationFooter: modelNavigationFooter.store.getState(),
                breadcrumbs: modelBreadcrumbs.store.getState(),
                content: modelContent.store.getState(),
                categories: modelCategory.store.getState(),
                productsFeatured: modelProduct.store.getState()
            });
    })
    .catch((error) => {
        res.header(responseHeader)
            .status(500)
            .send(error);
    });

};
