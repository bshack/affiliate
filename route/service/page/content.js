const responseHeader = {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*'
};

/* MODELS
 *************************************/

import StoreContent from '../../../store/content';
import StoreProduct from '../../../store/product';
import StoreCategory from '../../../store/category';
import StoreNavigationMain from '../../../store/navigationMain';
import StoreNavigationFooter from '../../../store/navigationFooter';
import StoreBreadcrumbs from '../../../store/breadcrumbs';

/* ROUTE
 *************************************/

exports.get = function(req, res) {

    let contentParams = {
        filename: req.query.filename
    };

    let storeContent = new StoreContent(req.app);
    let storeProduct = new StoreProduct(req.app);
    let storeCategory = new StoreCategory(req.app);
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
        storeCategory.store.dispatch(
            storeCategory.getAll({})
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
                navigationMain: storeNavigationMain.store.getState(),
                navigationFooter: storeNavigationFooter.store.getState(),
                breadcrumbs: storeBreadcrumbs.store.getState(),
                content: storeContent.store.getState(),
                categories: storeCategory.store.getState(),
                productsFeatured: storeProduct.store.getState()
            });
    })
    .catch((error) => {
        res.header(responseHeader)
            .status(500)
            .send(error);
    });

};
