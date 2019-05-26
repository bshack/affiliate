import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import config from '../../configPublic';

const endPoint = config.api.origin + '/service/page/plp';

export default class {

    constructor() {
        this.store = createStore(
            this.reducers,
            applyMiddleware(thunk)
        );
    }

    reducers(state = {}, action) {
        switch (action.type) {
        case 'GET_PLP_DATA':
            state = action.data
            return state;
        case 'GET_PLP_DATA_ERROR':
            return state;
        default:
            return state;
        }
    }

    handleGetSuccess(data) {
        return {
            type: 'GET_PLP_DATA',
            data: data
        };
    }

    handleGetError(error) {
        return {
            type: 'GET_PLP_DATA_ERROR',
            data: error
        };
    }

    getAll(params) {
        return (dispatch, getState) => {

            return axios.get(endPoint, {
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

}
