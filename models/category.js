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
                   .select('category.*')
                   .from('website')
                   .innerJoin('websitecategory', 'website.id', 'websitecategory.website')
                   .innerJoin('category', 'category.id', 'websitecategory.category')
                   .limit(1)
                   .where({
                       'category.id': params.id,
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
                   .select('category.*')
                   .from('website')
                   .innerJoin('websitecategory', 'website.id', 'websitecategory.website')
                   .innerJoin('category', 'websitecategory.category', 'category.id')
                   .where({
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
