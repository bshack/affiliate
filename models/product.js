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

        getOne(params) {

          return (dispatch, getState) => {
              return this.app.get('databaseConnection')
                  .from('product')
                  .select()
                  .innerJoin('category', 'product.googleProductCategory', 'category.googleid')
                  .where({
                      id: params.id,
                      isActive: true
                  })
                  .limit(1)
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

              let whereData = {
                   isActive: true
              };

              if (params.seoDirectoryNamePart) {
                  whereData.seoDirectoryNamePart = params.seoDirectoryNamePart;
              }

              return this.app.get('databaseConnection')
                  .from('product')
                  .select()
                  .innerJoin('category', 'product.googleProductCategory', 'category.googleid')
                  .where(whereData)
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
