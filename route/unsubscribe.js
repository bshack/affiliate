/* MODELS
 *************************************/

import ModelProduct from '../model/product';
import ModelCategory from '../model/category';
import ModelNavigationMain from '../model/navigationMain';
import ModelNavigationFooter from '../model/navigationFooter';

/* ROUTE
 *************************************/

exports.index = function(req, res) {

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
    ]).then(() => {
        res.render('unsubscribe', {
            emailUnsubscribe: {
                email: req.query.email
            },
            configPublic: req.app.get('configPublic'),
            navigationMain: modelNavigationMain,
            navigationFooter: modelNavigationFooter,
            categories: modelCategory,
            products: modelProduct
        });
    });

};
