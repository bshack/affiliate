import path from 'path';

/* MODELS
 *************************************/

import StorePagePLP from '../store/page/plp';

let storePagePLP = new StorePagePLP();

/* ROUTE
 *************************************/

exports.index = function(req, res) {

    let pathData = path.parse(req.path);
    let productParams = {};
    let categoryParams = {};
    let breadcrumbParams = {};

    if (req.params.store) {
        productParams.programName = req.params.store;
        categoryParams.programName = productParams.programName;
        breadcrumbParams.programName = productParams.programName;
    } else if (req.params.brand) {
        productParams.brand = req.params.brand;
        categoryParams.brand = productParams.brand;
        breadcrumbParams.brand = productParams.brand;
    } else {
        productParams.path = path.dirname(req.path).substr(1);
        categoryParams.path = productParams.path;
        breadcrumbParams.path = productParams.path;
    }

    Promise.all([
        storePagePLP.store.dispatch(
            storePagePLP.getAll({
                product: productParams,
                category: categoryParams,
                breadcrumbs: breadcrumbParams
            })
        )
    ]).then(() => {
        res.render('plp', {
            storePagePLP: storePagePLP
        });
    });

};
