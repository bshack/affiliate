import path from 'path';
import configPublic from '../../../configPublic.json';
import configPrivate from '../../../configPrivate.json';

/* MODELS
 *************************************/

import StoreProduct from '../../../store/product';
import StoreCategory from '../../../store/category';
import StoreNavigationMain from '../../../store/navigation/main';
import StoreNavigationFooter from '../../../store/navigation/footer';
import StoreBreadcrumbs from '../../../store/breadcrumbs';

/* ROUTE
 *************************************/

exports.get = function(req, res) {

    let pathData = path.parse(req.path);
    let productParams = req.query.product;
    let productRecommendationsParams = req.query.recommendations;
    let storeProduct = new StoreProduct(req.app);
    let storeProductRecommendations = new StoreProduct(req.app);
    let storeCategory = new StoreCategory(req.app);
    let storeNavigationMain = new StoreNavigationMain(req.app);
    let storeBreadcrumbs = new StoreBreadcrumbs(req.app);
    let storeNavigationFooter = new StoreNavigationFooter(req.app);

    Promise.all([
        storeProduct.store.dispatch(
            storeProduct.getAll(productParams)
        ),
        storeProductRecommendations.store.dispatch(
            storeProductRecommendations.getAll(productRecommendationsParams)
        ),
        storeCategory.store.dispatch(
            storeCategory.getAll({})
        ),
        storeNavigationMain.store.dispatch(
            storeNavigationMain.getAll({})
        ),
        storeBreadcrumbs.store.dispatch(
            storeBreadcrumbs.getAll(productParams)
        ),
        storeNavigationFooter.store.dispatch(
            storeNavigationFooter.getAll()
        )
    ])
    .then(() => {
        res.header(configPrivate.header.json)
            .status(200)
            .send({
                config: configPublic,
                meta: {
                    title: 'yo title',
                    description: 'yo description',
                    image: 'yo image',
                    canonical: 'yo canonical'
                },
                navigationMain: storeNavigationMain.store.getState(),
                navigationFooter: storeNavigationFooter.store.getState(),
                breadcrumb: storeBreadcrumbs.store.getState(),
                category: storeCategory.store.getState(),
                product: storeProduct.store.getState(),
                productRecommendation: storeProductRecommendations.store.getState()
            });
    })
    .catch((error) => {
        res.header(configPrivate.header.json)
            .status(500)
            .send(error);
    });

};
