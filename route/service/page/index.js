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

/* ROUTE
 *************************************/

exports.get = function(req, res) {

    let contentParams = {
        filename: 'index'
    };
    let productParams = {
        'product.isFeatured': false,
        offset: 8,
        limit: 8
    };
    let productFeaturedParams = {
        // 'product.isFeatured': true,
        limit: 8
    };

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

        let storeContentData = storeContent.store.getState();

        res.header(configPrivate.header.json)
            .status(200)
            .send({
                meta: {
                    title: storeContentData[0].metatitle + ' - ' + configPublic.name,
                    description: storeContentData[0].metadescription,
                    image: configPublic.social.image,
                    canonical: configPublic.www.origin
                },
                navigationMain: storeNavigationMain.store.getState(),
                navigationFooter: storeNavigationFooter.store.getState(),
                content: storeContentData,
                productFeatured: storeProductFeatured.store.getState(),
                product: storeProduct.store.getState()
            });
    })
    .catch((error) => {
        res.header(configPrivate.header.json)
            .status(404)
            .send(error);
    });

};
