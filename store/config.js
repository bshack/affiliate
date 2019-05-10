const redux = require('redux');

(() => {

    'use strict';
    module.exports = class {

        constructor(state) {
            this.store = redux.createStore(
                this.reducers,
                state
            );
        }

        reducers(state = {}, action) {
            switch (action.type) {
                case 'GET_GLOBAL_DATA':
                    state = action.data
                    return state;
                case 'GET_GLOBAL_DATA_ERROR':
                    return state;
                default:
                    return state;
            }
        }

        handleGetSuccess(data) {
            return {
                type: 'GET_GLOBAL_DATA',
                data: data
            };
        }

        handleGetError(error) {
            return {
                type: 'GET_GLOBAL_DATA_ERROR',
                data: error
            };
        }

    };
})();
