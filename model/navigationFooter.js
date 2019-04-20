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
                'content.isActive': true,
                'menu-link.isActive': true,
                'menu.isActive': true
            };

            return (dispatch, getState) => {
                return this.app.get('databaseConnection')
                    .from('menu-link')
                    .join('content', 'menu-link.content', '=', 'content.filename')
                    .join('menu', 'menu-link.menu', '=', 'menu.name')
                    .select([
                        'menu-link.*',
                        'content.title',
                        'content.filename'
                    ])
                    .where(whereParams)
                    .orderBy('menu-link.position', 'asc')
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
