const redux = require('redux');
const thunk = require('redux-thunk').default;
const axios = require('axios');
const UtilityAjax = require('../utility/ajax');

const utilityAjax = new UtilityAjax();

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
                return axios.get('https://dev.api.valfoundry.io:3000/service/products/', {
                    params: params
                })
                    .then((response) => {
                        dispatch(this.handleGetSuccess(response.data));
                    })
                    .catch((error) => {
                        dispatch(this.handleGetError(error));
                    });
            };
        }

    };
})();
