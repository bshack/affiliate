import _ from 'lodash';
import configPublic from '../../../configPublic.json';
import configPrivate from '../../../configPrivate.json';

/* MODELS
 *************************************/

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

    let storeNavigationMain = new StoreNavigationMain(req.app);
    let storeNavigationFooter = new StoreNavigationFooter(req.app);

    Promise.all([
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
                    title: 'Style Guide',
                    description: 'Val Foundry style guide.',
                    image: '/' + configPublic.static.version + '/' + configPublic.social.image,
                    canonical: configPublic.www.origin + '/' + 'style.html'
                },
                unsubscribe: emailParams,
                navigationMain: storeNavigationMain.store.getState(),
                navigationFooter: storeNavigationFooter.store.getState()
            });

    })
    .catch((error) => {
        res.header(configPrivate.header.json)
            .status(404)
            .send(error);
    });

};
