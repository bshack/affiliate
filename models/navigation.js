const redux = require('redux');
const thunk = require('redux-thunk').default;
const _ = require('lodash');

const getCategoryDetails = (data) => {
    return new Promise((resolve, reject) => {

        data[1] = {
            path: 'vehicles-and-parts/vehicles/watercraft/yachts'
        };
        data[2] = {
            path: 'toys-and-games/toys/riding-toys/hobby-horses'
        };
        data[3] = {
            path: 'food-beverages-and-tobacco/food-items/bakery'
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

(() => {

    'use strict';
    module.exports = class {

        constructor(app) {
            this.app = app;
            this.store = redux.createStore(
                this.reducers,
                redux.applyMiddleware(thunk)
            );
        }

        reducers(state = {}, action) {
            switch (action.type) {
                case 'GET_NAVIGATION_DATA':
                    state = action.data
                    return state;
                case 'GET_NAVIGATION_DATA_ERROR':
                    return state;
                default:
                    return state;
            }
        }

        handleGetSuccess(data) {
            return {
                type: 'GET_NAVIGATION_DATA',
                data: data
            };
        }

        handleGetError(error) {
            return {
                type: 'GET_NAVIGATION_DATA_ERROR',
                data: error
            };
        }

        getMainNavigation(params) {

            let whereData = {
                isActive: true
            };

            return (dispatch, getState) => {
                return this.app.get('databaseConnection')
                    .from('product')
                    .select([
                        'category.path',
                        'category.title AS categoryTitle'
                    ])
                    .where(whereData)
                    .orderBy('category.path', 'asc')
                    .innerJoin('category', 'product.googleProductCategory', 'category.googleid')
                    .distinct('category.path')
                    .then(getCategoryDetails)
                    .then((paths) => {
                        return new Promise((resolve, reject) => {
                            this.app.get('databaseConnection')
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
                            let categoryHierarchy = {};
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
                                }
                                categoryHierarchy = _.merge(categoryHierarchy, categoryLevel);
                            }
                            resolve(categoryHierarchy.children);
                        })
                    })
                    .then((data) => {
                        dispatch(this.handleGetSuccess(data));
                    })
                    .catch((error) => {
                        dispatch(this.handleGetError(error));
                    });
            };

        }

    };
})();
