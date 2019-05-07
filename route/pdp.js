import path from 'path';

/* MODELS
 *************************************/

import ModelContent from '../model/content';
import ModelProduct from '../model/product';
import ModelCategory from '../model/category';
import ModelNavigationMain from '../model/navigationMain';
import ModelNavigationFooter from '../model/navigationFooter';
import ModelBreadcrumbs from '../model/breadcrumbs';

/* ROUTE
 *************************************/

exports.index = function(req, res) {

    let pathData = path.parse(req.path);
    let productParams = {
        path: pathData.dir.substr(1),
        filename: pathData.name
    };
    let productRecommendationsParams = {
        skipFilename: pathData.name,
        path: pathData.dir.substr(1),
        limit: 8
    };
    let modelProduct = new ModelProduct(req.app);
    let modelProductRecommendations = new ModelProduct(req.app);
    let modelCategory = new ModelCategory(req.app);
    let modelNavigationMain = new ModelNavigationMain(req.app);
    let modelBreadcrumbs = new ModelBreadcrumbs(req.app);
    let modelNavigationFooter = new ModelNavigationFooter(req.app);

    Promise.all([
        modelProduct.store.dispatch(
            modelProduct.getAll(productParams)
        ),
        modelProductRecommendations.store.dispatch(
            modelProductRecommendations.getAll(productRecommendationsParams)
        ),
        modelCategory.store.dispatch(
            modelCategory.getAll({})
        ),
        modelNavigationMain.store.dispatch(
            modelNavigationMain.getAll({})
        ),
        modelBreadcrumbs.store.dispatch(
            modelBreadcrumbs.getAll(productParams)
        ),
        modelNavigationFooter.store.dispatch(
            modelNavigationFooter.getAll()
        )
    ]).then(() => {
        res.render('pdp', {
            configPublic: req.app.get('configPublic'),
            navigationMain: modelNavigationMain,
            navigationFooter: modelNavigationFooter,
            breadcrumbs: modelBreadcrumbs,
            categories: modelCategory,
            products: modelProduct,
            productRecommendations: modelProductRecommendations
        });
    });

};
