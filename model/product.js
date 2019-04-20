const redux = require('redux');
const thunk = require('redux-thunk').default;
const moment = require('moment');

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
                case 'GET_PRODUCT_DATA':
                    state = action.data
                    return state;
                case 'GET_PRODUCT_DATA_ERROR':
                    return state;
                default:
                    return state;
            }
        }

        handleGetSuccess(data) {
            return {
                type: 'GET_PRODUCT_DATA',
                data: data
            };
        }

        handleGetError(error) {
            return {
                type: 'GET_PRODUCT_DATA_ERROR',
                data: error
            };
        }

        getAll(params) {

            return (dispatch, getState) => {

                let whereParams = {
                    isActive: true
                };

                let limitParam = 1000;
                let skipParam = false;
                let oldestProductCreationDate = moment(new Date()).subtract(60, 'days').format('YYYY-MM-DD HH:mm:ss');

                if (params.filename) {
                    whereParams.seoFilenamePart = params.filename;
                }

                if (params.brand) {
                    whereParams.brand = params.brand;
                }

                if (params.programName) {
                    whereParams.programName = params.programName;
                }

                if (params['product.isFeatured']) {
                    whereParams['product.isFeatured'] = params['product.isFeatured'];
                }

                if (params.limit) {
                    limitParam = params.limit;
                }

                if (params.skipFilename) {
                    skipParam = params.skipFilename;
                }

                return this.app.get('databaseConnection')
                    .from('product')
                    .select([
                        'product.*',
                        'category.isFeatured',
                        'category.path',
                        'category.title AS categoryTitle'
                    ])
                    .limit(limitParam)
                    .innerJoin('category', 'product.googleProductCategory', 'category.googleid')
                    .where((builder) => {
                        if (params.path && !params.filename) {
                            if (skipParam) {
                                builder
                                    .where(whereParams)
                                    .where('product.timestamp', '>', oldestProductCreationDate)
                                    .andWhere('category.path', 'like', '%' + params.path)
                                    .whereNot('product.seoFilenamePart', skipParam);
                            } else {
                                builder
                                    .where(whereParams)
                                    .where('product.timestamp', '>', oldestProductCreationDate)
                                    .andWhere('category.path', 'like', '%' + params.path);
                            }
                        } else {
                            builder
                                .where(whereParams)
                                .where('product.timestamp', '>', oldestProductCreationDate);
                        }
                    })
                    .orderBy('product.isFeatured', 'desc')
                    .orderBy('category.isFeatured', 'desc')
                    .orderBy('product.timestamp', 'desc')
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
