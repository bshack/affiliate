const redux = require('redux');
const thunk = require('redux-thunk').default;
const _ = require('lodash');

const getCategoryDetails = (data) => {
    return new Promise((resolve, reject) => {

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

        getAll(params) {

            return (dispatch, getState) => {
                return this.app.get('databaseConnection')
                    .from('category')
                    .select([
                        'path'
                    ])
                    .where({
                        path: params.path
                    })
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
                    .then((categoryData) => {
                        return new Promise((resolve, reject) => {
                            if (params.filename) {
                                this.app.get('databaseConnection')
                                    .from('product')
                                    .select()
                                    .where({
                                        isActive: true,
                                        seoFilenamePart: params.filename
                                    })
                                    .then((productData) => {
                                        categoryData.push({
                                            title: productData[0].title,
                                            id: productData[0].seoFilenamePart
                                        });
                                        resolve(categoryData);
                                    })
                                    .catch(reject);
                            } else {
                                resolve(categoryData);
                            }

                        });
                    })
                    .then((data) => {
                        data.unshift({
                            id: 'home',
                            title: 'Home'
                        });
                       return data;
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
