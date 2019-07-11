import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import config from '../../configPublic';
import reducerStandard from '../../reducer/standard';

const endPoint = config.api.origin + '/service/page/unsubscribe';

export default class {

    constructor() {
        this.store = createStore(
            reducerStandard,
            applyMiddleware(thunk)
        );
    }

    handleGetSuccess(data) {
        return {
            type: 'GET_DATA',
            data: data
        };
    }

    handleGetError(error) {
        return {
            type: 'GET_DATA_ERROR',
            data: error
        };
    }

    getAll(params) {
        return (dispatch, getState) => {

            if (typeof window !== 'undefined' && window.initialState) {
                dispatch(this.handleGetSuccess({
                    data: window.initialState
                }));
            } else {
                return axios.get(endPoint, {
                    params: params
                })
                    .then((response) => {
                        dispatch(this.handleGetSuccess(response));
                    })
                    .catch((error) => {
                        dispatch(this.handleGetError(error));
                    });
            }

        };

    }

}
