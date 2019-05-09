const responseHeader = {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*'
};

import path from 'path';

/* MODELS
 *************************************/

import ModelProduct from '../../model/product';
import ModelCategory from '../../model/category';
import ModelNavigationMain from '../../model/navigationMain';
import ModelNavigationFooter from '../../model/navigationFooter';
import ModelBreadcrumbs from '../../model/breadcrumbs';

/* ROUTE
 *************************************/

exports.get = function(req, res) {

    let modelProduct = new ModelProduct(req.app);
    let modelCategory = new ModelCategory(req.app);
    let modelNavigationMain = new ModelNavigationMain(req.app);
    let modelBreadcrumbs = new ModelBreadcrumbs(req.app);
    let modelNavigationFooter = new ModelNavigationFooter(req.app);

    Promise.all([
        modelProduct.store.dispatch(
            modelProduct.getAll(req.query.product)
        ),
        modelCategory.store.dispatch(
            modelCategory.getAll(req.query.category)
        ),
        modelNavigationMain.store.dispatch(
            modelNavigationMain.getAll({})
        ),
        modelBreadcrumbs.store.dispatch(
            modelBreadcrumbs.getAll(req.query.breadcrumbs)
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
                configPublic: req.app.get('configPublic'),
                navigationMain: modelNavigationMain.store.getState(),
                navigationFooter: modelNavigationFooter.store.getState(),
                breadcrumbs: modelBreadcrumbs.store.getState(),
                category: modelCategory.store.getState(),
                products: modelProduct.store.getState({})
            });
    })
    .catch((error) => {
        res.header(responseHeader)
            .status(500)
            .send(error);
    });

};
