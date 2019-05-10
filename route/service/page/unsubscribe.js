const responseHeader = {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*'
};

/* MODELS
 *************************************/

 import StoreProduct from '../../../store/product';
 import StoreCategory from '../../../store/category';
 import StoreNavigationMain from '../../../store/navigationMain';
 import StoreNavigationFooter from '../../../store/navigationFooter';


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
                unsubscribe: {
                    email: req.query.email
                },
                configPublic: req.app.get('configPublic'),
                navigationMain: storeNavigationMain.store.getState(),
                navigationFooter: storeNavigationFooter.store.getState(),
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
