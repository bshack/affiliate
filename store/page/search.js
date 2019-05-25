import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

export default class {

    constructor(config) {
        this.config = config;
        this.store = createStore(
            this.reducers,
            {
                data: {
                    brands: [],
                    programs: []
                },
                config: {}
            },
            applyMiddleware(thunk)
        );
    }

    reducers(state = {}, action) {
        switch (action.type) {
        case 'GET_SEARCH_DATA':
            state = action.data
            return state;
        case 'GET_SEARCH_DATA_ERROR':
            return state;
        default:
            return state;
        }
    }

    handleGetSuccess(data) {
        return {
            type: 'GET_SEARCH_DATA',
            data: data
        };
    }

    handleGetError(error) {
        return {
            type: 'GET_SEARCH_DATA_ERROR',
            data: error
        };
    }

}
