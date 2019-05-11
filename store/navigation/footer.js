import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

export default class {

    constructor(app) {
        this.app = app;
        this.store = createStore(
            this.reducers,
            applyMiddleware(thunk)
        );
    }

    reducers(state = {}, action) {
        switch (action.type) {
            case 'GET_NAVIGATION_FOOTER_DATA':
                state = action.data
                return state;
            case 'GET_NAVIGATION_FOOTER_DATA_ERROR':
                return state;
            default:
                return state;
        }
    }

    handleGetSuccess(data) {
        return {
            type: 'GET_NAVIGATION_FOOTER_DATA',
            data: data
        };
    }

    handleGetError(error) {
        return {
            type: 'GET_NAVIGATION_FOOTER_DATA_ERROR',
            data: error
        };
    }

    getAll(params) {

        return (dispatch, getState) => {

            let whereParams = {
                'content.isActive': true,
                'menu-link.isActive': true,
                'menu.isActive': true
            };

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
