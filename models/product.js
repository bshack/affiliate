const redux = require('redux');
const thunk = require('redux-thunk').default;

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
                case 'GET_SITE_DATA':
                    state = action.data
                    return state;
                case 'GET_SITE_DATA_ERROR':
                    return state;
                default:
                    return state;
            }
        }

        handleGetSuccess(data) {
            return {
                type: 'GET_SITE_DATA',
                data: data
            };
        }

        handleGetError(error) {
            return {
                type: 'GET_SITE_DATA_ERROR',
                data: error
            };
        }

        getOne(params) {

          return (dispatch, getState) => {

              return this.app.get('databaseConnection')
                   .select('product.*')
                   .from('product')
                   .innerJoin('categoryproduct', 'categoryproduct.product', 'product.id')
                   .innerJoin('category', 'category.id', 'categoryproduct.category')
                   .innerJoin('websitecategory', 'websitecategory.category', 'category.id')
                   .innerJoin('website', 'website.id', 'websitecategory.website')
                   .where({
                       'product.id': params.id,
                       'website.hostname': params.hostname
                   })
                   .then((data) => {
                      dispatch(this.handleGetSuccess(data));
                   })
                   .catch((error) => {
                       dispatch(this.handleGetError(error));
                   });

          };
        }

        getAll(params) {

          return (dispatch, getState) => {

              return this.app.get('databaseConnection')
                   .select('product.*')
                   .from('product')
                   .innerJoin('categoryproduct', 'categoryproduct.product', 'product.id')
                   .innerJoin('category', 'category.id', 'categoryproduct.category')
                   .innerJoin('websitecategory', 'websitecategory.category', 'category.id')
                   .innerJoin('website', 'website.id', 'websitecategory.website')
                   .where({
                       'category.id': params.category,
                       'website.hostname': params.hostname
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
