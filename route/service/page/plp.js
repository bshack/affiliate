import path from 'path';
import _ from 'lodash';
import configPublic from '../../../configPublic.json';
import configPrivate from '../../../configPrivate.json';

/* MODELS
 *************************************/

import StoreProduct from '../../../store/product';
import StoreCampaign from '../../../store/campaign';
import StoreCategory from '../../../store/category';
import StoreNavigationMain from '../../../store/navigation/main';
import StoreNavigationFooter from '../../../store/navigation/footer';
import StoreBreadcrumbs from '../../../store/breadcrumbs';

/* ROUTE
 *************************************/

exports.get = function(req, res) {

    let productParams = JSON.parse(req.query.product);
    let campaignParams = JSON.parse(req.query.category);
    let categoryParams = JSON.parse(req.query.category);
    let breadcrumbParams = JSON.parse(req.query.breadcrumbs);

    productParams.isActive = true;
    productParams.availability = 'in stock';

    let storeProduct = new StoreProduct(req.app);
    let storeCampaign = new StoreCampaign(req.app);
    let storeCategory = new StoreCategory(req.app);
    let storeNavigationMain = new StoreNavigationMain(req.app);
    let storeBreadcrumbs = new StoreBreadcrumbs(req.app);
    let storeNavigationFooter = new StoreNavigationFooter(req.app);

    Promise.all([
        storeProduct.store.dispatch(
            storeProduct.getAll(productParams)
        ),
        storeCampaign.store.dispatch(
            storeCampaign.getAll(campaignParams)
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

        let storeCategoryData = storeCategory.store.getState();

        res.header(configPrivate.header.json)
            .status(200)
            .send({
                meta: {
                    title: storeCategoryData[0].title + ' - ' + configPublic.name,
                    image: configPublic.social.image,
                    canonical: configPublic.www.origin + '/' + storeCategoryData[0].path + '/index.html',
                    description: storeCategoryData[0].title + ' on Val Foundry. ' + configPublic.description
                },
                navigationMain: storeNavigationMain.store.getState(),
                navigationFooter: storeNavigationFooter.store.getState(),
                breadcrumb: storeBreadcrumbs.store.getState(),
                category: storeCategoryData,
                product: storeProduct.store.getState({}),
                campaign: storeCampaign.store.getState({})
            });

    })
    .catch((error) => {
        res.header(configPrivate.header.json)
            .status(404)
            .send(error);
    });

};
