import _ from 'lodash';
import configPublic from '../../../configPublic.json';
import configPrivate from '../../../configPrivate.json';

/* MODELS
 *************************************/

import StoreContent from '../../../store/content';
import StoreProduct from '../../../store/product';
import StoreNavigationMain from '../../../store/navigation/main';
import StoreNavigationFooter from '../../../store/navigation/footer';
import StoreBreadcrumbs from '../../../store/breadcrumbs';


/* ROUTE
 *************************************/

exports.get = function(req, res) {

    let contentParams = {
        filename: req.query.filename
    };

    let storeContent = new StoreContent(req.app);
    let storeProduct = new StoreProduct(req.app);
    let storeNavigationMain = new StoreNavigationMain(req.app);
    let storeBreadcrumbs = new StoreBreadcrumbs(req.app);
    let storeNavigationFooter = new StoreNavigationFooter(req.app);

    Promise.all([
        storeContent.store.dispatch(
            storeContent.getAll(contentParams)
        ),
        storeProduct.store.dispatch(
            storeProduct.getAll({
                limit: 8
            })
        ),
        storeNavigationMain.store.dispatch(
            storeNavigationMain.getAll({})
        ),
        storeBreadcrumbs.store.dispatch(
            storeBreadcrumbs.getAll({})
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
                config: configPublic,
                meta: {
                    title: storeContentData[0].metatitle + ' - ' + configPublic.name,
                    description: storeContentData[0].metadescription,
                    image: configPublic.social.image,
                    canonical: configPublic.www.origin + '/' +  storeContentData[0].filename + '.html'
                },
                navigationMain: storeNavigationMain.store.getState(),
                navigationFooter: storeNavigationFooter.store.getState(),
                breadcrumb: storeBreadcrumbs.store.getState(),
                content: storeContentData,
                productFeatured: storeProduct.store.getState()
            });
    })
    .catch((error) => {
        res.header(configPrivate.header.json)
            .status(404)
            .send(error);
    });
};
