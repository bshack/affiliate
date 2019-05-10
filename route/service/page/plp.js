const responseHeader = {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*'
};

import path from 'path';

/* MODELS
 *************************************/

import StoreProduct from '../../../store/product';
import StoreCategory from '../../../store/category';
import StoreNavigationMain from '../../../store/navigationMain';
import StoreNavigationFooter from '../../../store/navigationFooter';
import StoreBreadcrumbs from '../../../store/breadcrumbs';

/* ROUTE
 *************************************/

exports.get = function(req, res) {

    let storeProduct = new StoreProduct(req.app);
    let storeCategory = new StoreCategory(req.app);
    let storeNavigationMain = new StoreNavigationMain(req.app);
    let storeBreadcrumbs = new StoreBreadcrumbs(req.app);
    let storeNavigationFooter = new StoreNavigationFooter(req.app);

    Promise.all([
        storeProduct.store.dispatch(
            storeProduct.getAll(req.query.product)
        ),
        storeCategory.store.dispatch(
            storeCategory.getAll(req.query.category)
        ),
        storeNavigationMain.store.dispatch(
            storeNavigationMain.getAll({})
        ),
        storeBreadcrumbs.store.dispatch(
            storeBreadcrumbs.getAll(req.query.breadcrumbs)
        ),
        storeNavigationFooter.store.dispatch(
            storeNavigationFooter.getAll()
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
                navigationMain: storeNavigationMain.store.getState(),
                navigationFooter: storeNavigationFooter.store.getState(),
                breadcrumbs: storeBreadcrumbs.store.getState(),
                category: storeCategory.store.getState(),
                products: storeProduct.store.getState({})
            });
    })
    .catch((error) => {
        res.header(responseHeader)
            .status(500)
            .send(error);
    });

};
