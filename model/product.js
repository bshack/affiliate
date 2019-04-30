const https = require('https');
const redux = require('redux');
const thunk = require('redux-thunk').default;
const moment = require('moment');
const fetch = require('node-fetch');
const request = require('request');
const fs = require('fs');
var rp = require('request-promise');

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
                return rp({
                    url : 'https://localhost:3000/service/products/',
                    json: true,
                    body: params
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
