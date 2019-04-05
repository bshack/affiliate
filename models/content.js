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
                case 'GET_CONTENT_DATA':
                    state = action.data
                    return state;
                case 'GET_CONTENT_DATA_ERROR':
                    return state;
                default:
                    return state;
            }
        }

        handleGetSuccess(data) {
            return {
                type: 'GET_CONTENT_DATA',
                data: data
            };
        }

        handleGetError(error) {
            return {
                type: 'GET_CONTENT_DATA_ERROR',
                data: error
            };
        }

        getAll(params) {

            let whereParams = {
                isActive: true
            };

            if (params.filename) {
                whereParams.filename = params.filename;
            }

            return (dispatch, getState) => {
                return this.app.get('databaseConnection')
                    .from('content')
                    .select()
                    .where(whereParams)
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
