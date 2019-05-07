/* MODELS
 *************************************/

 import ModelContent from '../model/content';
 import ModelProduct from '../model/product';
 import ModelCategory from '../model/category';
 import ModelNavigationMain from '../model/navigationMain';
 import ModelNavigationFooter from '../model/navigationFooter';

/* ROUTE
 *************************************/

exports.index = function(req, res) {

    let contentParams = {
        filename: 'index'
    };

    let modelContent = new ModelContent(req.app);
    let modelProduct = new ModelProduct(req.app);
    let modelProductFeatured = new ModelProduct(req.app);
    let modelCategory = new ModelCategory(req.app);
    let modelNavigationMain = new ModelNavigationMain(req.app);
    let modelNavigationFooter = new ModelNavigationFooter(req.app);

    Promise.all([
        modelContent.store.dispatch(
            modelContent.getAll(contentParams)
        ),
        modelProduct.store.dispatch(
            modelProduct.getAll({
                'product.isFeatured': false,
                limit: 8
            })
        ),
        modelProductFeatured.store.dispatch(
            modelProductFeatured.getAll({
                'product.isFeatured': true,
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
    ]).then(() => {
        res.render('index', {
            configPublic: req.app.get('configPublic'),
            navigationMain: modelNavigationMain,
            navigationFooter: modelNavigationFooter,
            content: modelContent,
            categories: modelCategory,
            productsFeatured: modelProductFeatured,
            products: modelProduct
        });
    });

};
