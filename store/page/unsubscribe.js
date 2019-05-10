import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

export default class {

    constructor() {
        this.store = createStore(
            this.reducers,
            applyMiddleware(thunk)
        );
    }

    reducers(state = {}, action) {
        switch (action.type) {
            case 'GET_UNSUBSCRIBE_DATA':
                state = action.data
                return state;
            case 'GET_UNSUBSCRIBE_DATA_ERROR':
                return state;
            default:
                return state;
        }
    }

    handleGetSuccess(data) {
        return {
            type: 'GET_UNSUBSCRIBE_DATA',
            data: data
        };
    }

    handleGetError(error) {
        return {
            type: 'GET_UNSUBSCRIBE_DATA_ERROR',
            data: error
        };
    }

    getAll(params) {
        return (dispatch, getState) => {
            return axios.get('https://dev.api.valfoundry.io:3000/service/page/unsubscribe', {
                params: params
            })
                .then((response) => {
                    dispatch(this.handleGetSuccess(response));
                })
                .catch((error) => {
                    dispatch(this.handleGetError(error));
                });
        };

    }

};
