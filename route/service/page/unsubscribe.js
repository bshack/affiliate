import _ from 'lodash';
import configPublic from '../../../configPublic.json';
import configPrivate from '../../../configPrivate.json';

/* MODELS
 *************************************/

import StoreProduct from '../../../store/product';
import StoreNavigationMain from '../../../store/navigation/main';
import StoreNavigationFooter from '../../../store/navigation/footer';

/* ROUTE
 *************************************/

exports.get = function(req, res) {

    let productParams = {
        'product.isFeatured': false,
        limit: 8
    };
    let emailParams = {
        email: req.query.email
    };

    let storeProduct = new StoreProduct(req.app);
    let storeNavigationMain = new StoreNavigationMain(req.app);
    let storeNavigationFooter = new StoreNavigationFooter(req.app);

    Promise.all([
        storeProduct.store.dispatch(
            storeProduct.getAll(productParams)
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
                meta: {
                    title: 'yo title',
                    description: 'yo description',
                    image: 'yo image',
                    canonical: 'yo canonical'
                },
                unsubscribe: emailParams,
                navigationMain: storeNavigationMain.store.getState(),
                navigationFooter: storeNavigationFooter.store.getState(),
                productFeatured: storeProduct.store.getState()
            });

    })
    .catch((error) => {
        res.header(configPrivate.header.json)
            .status(404)
            .send(error);
    });

};
