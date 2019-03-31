const redux = require('redux');
const thunk = require('redux-thunk').default;
const _ = require('lodash');

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
                case 'GET_CATEGORY_DATA':
                    state = action.data
                    return state;
                case 'GET_CATEGORY_DATA_ERROR':
                    return state;
                default:
                    return state;
            }
        }

        handleGetSuccess(data) {
            return {
                type: 'GET_CATEGORY_DATA',
                data: data
            };
        }

        handleGetError(error) {
            return {
                type: 'GET_CATEGORY_DATA_ERROR',
                data: error
            };
        }

        getAll(params) {

            return (dispatch, getState) => {
                return this.app.get('databaseConnection')
                    .from('category')
                    .select()
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
