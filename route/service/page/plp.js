import path from 'path';
import _ from 'lodash';
import configPublic from '../../../configPublic.json';
import configPrivate from '../../../configPrivate.json';

/* MODELS
 *************************************/

import StoreProduct from '../../../store/product';
import StoreCategory from '../../../store/category';
import StoreNavigationMain from '../../../store/navigation/main';
import StoreNavigationFooter from '../../../store/navigation/footer';
import StoreBreadcrumbs from '../../../store/breadcrumbs';

/* CACHE
 *************************************/

const utilityCache = require('../../../utility/cache');

/* ROUTE
 *************************************/

exports.get = function(req, res) {

    let productParams = JSON.parse(req.query.product);
    let categoryParams = JSON.parse(req.query.category);
    let breadcrumbParams = JSON.parse(req.query.breadcrumbs);
    let key = utilityCache.makeKey(_.extend({
        page: 'plp'
    }, productParams, categoryParams, breadcrumbParams));

    utilityCache
        .getJSON(key)
        .then((data) => {

            if (data) {

                res.header(configPrivate.header.json)
                    .status(200)
                    .send(data);

            } else {

                let storeProduct = new StoreProduct(req.app);
                let storeCategory = new StoreCategory(req.app);
                let storeNavigationMain = new StoreNavigationMain(req.app);
                let storeBreadcrumbs = new StoreBreadcrumbs(req.app);
                let storeNavigationFooter = new StoreNavigationFooter(req.app);

                Promise.all([
                    storeProduct.store.dispatch(
                        storeProduct.getAll(productParams)
                    ),
                    storeCategory.store.dispatch(
                        storeCategory.getAll(categoryParams)
                    ),
                    storeNavigationMain.store.dispatch(
                        storeNavigationMain.getAll({})
                    ),
                    storeBreadcrumbs.store.dispatch(
                        storeBreadcrumbs.getAll(breadcrumbParams)
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
                        configPublic: req.app.get('configPublic'),
                        navigationMain: storeNavigationMain.store.getState(),
                        navigationFooter: storeNavigationFooter.store.getState(),
                        breadcrumb: storeBreadcrumbs.store.getState(),
                        category: storeCategory.store.getState(),
                        product: storeProduct.store.getState({})
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
