import configPublic from '../../../configPublic.json';
import configPrivate from '../../../configPrivate.json';

/* MODELS
 *************************************/

import StoreProduct from '../../../store/product';
import StoreCategory from '../../../store/category';
import StoreNavigationMain from '../../../store/navigation/main';
import StoreNavigationFooter from '../../../store/navigation/footer';

/* ROUTE
 *************************************/

exports.get = function(req, res) {

    let storeProduct = new StoreProduct(req.app);
    let storeCategory = new StoreCategory(req.app);
    let storeNavigationMain = new StoreNavigationMain(req.app);
    let storeNavigationFooter = new StoreNavigationFooter(req.app);

    Promise.all([
        storeProduct.store.dispatch(
            storeProduct.getAll({
                'product.isFeatured': false,
                limit: 8
            })
        ),
        storeCategory.store.dispatch(
            storeCategory.getAll({})
        ),
        storeNavigationMain.store.dispatch(
            storeNavigationMain.getAll({})
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
                unsubscribe: {
                    email: req.query.email
                },
                configPublic: req.app.get('configPublic'),
                navigationMain: storeNavigationMain.store.getState(),
                navigationFooter: storeNavigationFooter.store.getState(),
                category: storeCategory.store.getState(),
                productFeatured: storeProduct.store.getState()
            });
    })
    .catch((error) => {
        res.header(configPrivate.header.json)
            .status(500)
            .send(error);
    });

};
