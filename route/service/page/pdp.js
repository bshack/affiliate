import path from 'path';
import _ from 'lodash';
import configPublic from '../../../configPublic.json';
import configPrivate from '../../../configPrivate.json';

/* MODELS
 *************************************/

import StoreProduct from '../../../store/product';
import StoreNavigationMain from '../../../store/navigation/main';
import StoreNavigationFooter from '../../../store/navigation/footer';
import StoreBreadcrumbs from '../../../store/breadcrumbs';

/* ROUTE
 *************************************/

exports.get = function(req, res) {

    let productParams = JSON.parse(req.query.product);
    let productRecommendationsParams = JSON.parse(req.query.recommendations);

    productRecommendationsParams.isActive = true;
    productRecommendationsParams.availability = 'in stock';

    let storeProduct = new StoreProduct(req.app);
    let storeProductRecommendations = new StoreProduct(req.app);
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

        let storeProductData = storeProduct.store.getState();

        res.header(configPrivate.header.json)
            .status(200)
            .send({
                meta: {
                    title: storeProductData[0].title + ' - ' + configPublic.name,
                    description: storeProductData[0].description,
                    image: configPublic.cdn.origin + '/' + storeProductData[0].path + '/' + storeProductData[0].seoFilenamePart  + '-large@2x.jpg',
                    canonical: configPublic.www.origin + '/' + storeProductData[0].path + '/' + storeProductData[0].seoFilenamePart  + '.html'
                },
                navigationMain: storeNavigationMain.store.getState(),
                navigationFooter: storeNavigationFooter.store.getState(),
                breadcrumb: storeBreadcrumbs.store.getState(),
                product: storeProductData,
                productRecommendation: storeProductRecommendations.store.getState()
            });
    })
    .catch((error) => {
        res.header(configPrivate.header.json)
            .status(404)
            .send(error);
    });
};
