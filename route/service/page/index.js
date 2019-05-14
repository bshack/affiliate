import _ from 'lodash';
import configPublic from '../../../configPublic.json';
import configPrivate from '../../../configPrivate.json';

/* MODELS
 *************************************/

import StoreContent from '../../../store/content';
import StoreProduct from '../../../store/product';
import StoreCategory from '../../../store/category';
import StoreNavigationMain from '../../../store/navigation/main';
import StoreNavigationFooter from '../../../store/navigation/footer';

/* CACHE
 *************************************/

const utilityCache = require('../../../utility/cache');

/* ROUTE
 *************************************/

exports.get = function(req, res) {

    let contentParams = {
        filename: 'index'
    };
    let productParams = {
        'product.isFeatured': false,
        limit: 8
    };
    let productFeaturedParams = {
        'product.isFeatured': false,
        limit: 8
    };

    let key = utilityCache.makeKey(_.extend({
        page: 'index'
    }, contentParams, productParams, productFeaturedParams));

    utilityCache
        .getJSON(key)
        .then((data) => {

            if (data) {

                res.header(configPrivate.header.json)
                    .status(200)
                    .send(data);

            } else {

                let storeContent = new StoreContent(req.app);
                let storeProduct = new StoreProduct(req.app);
                let storeProductFeatured = new StoreProduct(req.app);
                let storeCategory = new StoreCategory(req.app);
                let storeNavigationMain = new StoreNavigationMain(req.app);
                let storeNavigationFooter = new StoreNavigationFooter(req.app);

                Promise.all([
                    storeContent.store.dispatch(
                        storeContent.getAll(contentParams)
                    ),
                    storeProduct.store.dispatch(
                        storeProduct.getAll(productParams)
                    ),
                    storeProductFeatured.store.dispatch(
                        storeProductFeatured.getAll(productFeaturedParams)
                    ),
                    storeNavigationMain.store.dispatch(
                        storeNavigationMain.getAll({})
                    ),
                    storeNavigationFooter.store.dispatch(
                        storeNavigationFooter.getAll()
                    )
                ])
                .then(() => {
                    let responseData = {
                        config: configPublic,
                        meta: {
                            title: 'yo title',
                            description: 'yo description',
                            image: 'yo image',
                            canonical: 'yo canonical'
                        },
                        navigationMain: storeNavigationMain.store.getState(),
                        navigationFooter: storeNavigationFooter.store.getState(),
                        content: storeContent.store.getState(),
                        productFeatured: storeProductFeatured.store.getState(),
                        product: storeProduct.store.getState()
                    };
                    utilityCache
                        .setJSON(key, responseData)
                        .then((data) => {
                            res.header(configPrivate.header.json)
                                .status(200)
                                .send(responseData);
                        })
                        .catch((error) => {
                            console.error(data);
                        });
                })
                .catch((error) => {
                    res.header(configPrivate.header.json)
                        .status(500)
                        .send(error);
                });

            }
        })
        .catch((error) => {
            console.error(data);
        });

};
