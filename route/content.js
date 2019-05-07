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

    let contentParams = {
        filename: path.parse(req.path).name
    };

    let modelContent = new ModelContent(req.app);
    let modelProduct = new ModelProduct(req.app);
    let modelCategory = new ModelCategory(req.app);
    let modelNavigationMain = new ModelNavigationMain(req.app);
    let modelBreadcrumbs = new ModelBreadcrumbs(req.app);
    let modelNavigationFooter = new ModelNavigationFooter(req.app);

    Promise.all([
        modelContent.store.dispatch(
            modelContent.getAll(contentParams)
        ),
        modelProduct.store.dispatch(
            modelProduct.getAll({
                limit: 8
            })
        ),
        modelCategory.store.dispatch(
            modelCategory.getAll({})
        ),
        modelNavigationMain.store.dispatch(
            modelNavigationMain.getAll({})
        ),
        modelBreadcrumbs.store.dispatch(
            modelBreadcrumbs.getAll({})
        ),
        modelNavigationFooter.store.dispatch(
            modelNavigationFooter.getAll()
        )
    ]).then(() => {
        res.render('content', {
            configPublic: req.app.get('configPublic'),
            navigationMain: modelNavigationMain,
            navigationFooter: modelNavigationFooter,
            breadcrumbs: modelBreadcrumbs,
            content: modelContent,
            categories: modelCategory,
            products: modelProduct
        });
    });

};
