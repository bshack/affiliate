const responseHeader = {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*'
};

/* MODELS
 *************************************/

 import ModelProduct from '../../model/product';
 import ModelCategory from '../../model/category';
 import ModelNavigationMain from '../../model/navigationMain';
 import ModelNavigationFooter from '../../model/navigationFooter';


/* ROUTE
 *************************************/

exports.get = function(req, res) {

    let modelProduct = new ModelProduct(req.app);
    let modelCategory = new ModelCategory(req.app);
    let modelNavigationMain = new ModelNavigationMain(req.app);
    let modelNavigationFooter = new ModelNavigationFooter(req.app);

    Promise.all([
        modelProduct.store.dispatch(
            modelProduct.getAll({
                'product.isFeatured': false,
                limit: 8
            })
        ),
        modelCategory.store.dispatch(
            modelCategory.getAll({})
        ),
        modelNavigationMain.store.dispatch(
            modelNavigationMain.getAll({})
        ),
        modelNavigationFooter.store.dispatch(
            modelNavigationFooter.getAll()
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
                navigationMain: modelNavigationMain.store.getState(),
                navigationFooter: modelNavigationFooter.store.getState(),
                categories: modelCategory.store.getState(),
                productsFeatured: modelProduct.store.getState()
            });
    })
    .catch((error) => {
        res.header(responseHeader)
            .status(500)
            .send(error);
    });

};
