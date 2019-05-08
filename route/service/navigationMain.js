const responseHeader = {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*'
};
const _ = require('lodash');
const getCategoryDetails = (data) => {
    return new Promise((resolve, reject) => {
        data[1] = {
            path: 'vehicles-and-parts'
        };
        data[2] = {
            path: 'vehicles-and-parts/vehicles/watercraft/yachts'
        };
        data[3] = {
            path: 'toys-and-games/toys/riding-toys/hobby-horses'
        };
        data[4] = {
            path: 'food-beverages-and-tobacco/food-items/bakery'
        };
        data[5] = {
            path: 'food-beverages-and-tobacco/food-items'
        };
        let fullPathsList = [];
        let i;
        for (i = 0; i < data.length; i++) {
            let newPath = '';
            let productCategoryPathData = data[i].path.split('/');
            let ii;
            for (ii = 0; ii < productCategoryPathData.length; ii++) {
                if (newPath === '') {
                    newPath = productCategoryPathData[ii];
                } else {
                    newPath = newPath + '/' + productCategoryPathData[ii];
                }
                fullPathsList.push(newPath);
            }

        }
        resolve(fullPathsList);
    })
};

exports.get = function(req, res, next) {

    let params = req.query;

    let whereData = {
        isActive: true
    };
    return req.app.get('databaseConnection')
        .from('product')
        .select([
            'category.path'
        ])
        .where(whereData)
        .orderBy('category.path', 'asc')
        .innerJoin('category', 'product.googleProductCategory', 'category.googleid')
        .distinct('category.path')
        .then(getCategoryDetails)
        .then((paths) => {
            return new Promise((resolve, reject) => {
                req.app.get('databaseConnection')
                    .from('category')
                    .select()
                    .whereIn('path', paths)
                    .orderBy('path', 'asc')
                    .then(resolve)
                    .catch(reject);
            });
        })
        .then((data) => {
            return new Promise((resolve, reject) => {
                let categoryAll = {};
                let categoryFeatured = {};
                let i;
                for (i = 0; i < data.length; i++) {
                    let categoryLevel = {
                        children: {}
                    };
                    let directories = data[i].path.split('/');
                    let tmp = categoryLevel;
                    let path = '';
                    let ii;
                    for (ii = 0; ii < directories.length; ii++) {
                        if (path === '') {
                            path = directories[ii];
                        } else {
                            path = path + '/' + directories[ii];
                        }
                        tmp.children[directories[ii]] = data[data.findIndex(obj => obj.path === path)];
                        tmp.children[directories[ii]].children = {};
                        tmp = tmp.children[directories[ii]];
                        if (tmp.isFeatured) {
                            categoryFeatured[tmp.path] = tmp;
                        }
                    }
                    categoryAll = _.merge(categoryAll, categoryLevel);
                }
                categoryFeatured['asdfsadf'] = {
                    title: 'All Categories',
                    path: '',
                    id: 0,
                    children: categoryAll.children,
                    isFeatured: 1
                };
                resolve(categoryFeatured);
            })
        })
        .then((data) => {
            res.header(responseHeader)
                .status(200)
                .send({
                    success: false,
                    data: data
                });
        })
        .catch((error) => {
            res.header(responseHeader)
                .status(200)
                .send({
                    success: false,
                    message: 'nope'
                });
        });

};
