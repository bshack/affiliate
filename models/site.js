const redux = require('redux');
const thunk = require('redux-thunk').default;

// const ModelSite = require('./models/site');
//
// let modelSite = new ModelSite(app);

(() => {

    'use strict';
    module.exports = class {

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
            data
          };
        }


        handleGetError(hostname, error) {
          return {
            type: 'GET_SITE_DATA_ERROR',
            error
          };
        }

        getSite(hostname) {

          return function (dispatch, getState) {

              return app.get('databaseConnection')
                  .from('website')
                  .select('*')
                  .where({
                      hostname: hostname
                  })
                  .then((data) => {
                     dispatch(handleGetSuccess(data));
                  })
                  .catch((error) => {
                      dispatch(handleGetError(hostname, error));
                  });
          };
        }

        model() {
            return redux.createStore(
                this.reducers,
                redux.applyMiddleware(thunk)
            );
        }


    };
})();
