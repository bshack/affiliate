import path from 'path';
import configPublic from '../../../configPublic.json';

/* MODELS
 *************************************/

import StoreProduct from '../../../store/product';
import StoreCategory from '../../../store/category';
import StoreNavigationMain from '../../../store/navigation/main';
import StoreNavigationFooter from '../../../store/navigation/footer';
import StoreBreadcrumbs from '../../../store/breadcrumbs';

/* CONSTANTS
 *************************************/

const responseHeader = {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*'
};

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
                config: configPublic,
                meta: {
                    title: 'yo title',
                    description: 'yo description',
                    image: 'yo image',
                    canonical: 'yo canonical'
                },
                configPublic: req.app.get('configPublic'),
                navigationMain: storeNavigationMain.store.getState(),
                navigationFooter: storeNavigationFooter.store.getState(),
                breadcrumb: storeBreadcrumbs.store.getState(),
                category: storeCategory.store.getState(),
                product: storeProduct.store.getState({})
            });
    })
    .catch((error) => {
        res.header(responseHeader)
            .status(500)
            .send(error);
    });

};
