import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducerSearch from '../../reducer/search';

export default class {
    constructor() {
        this.store = createStore(
            reducerSearch,
            {
                data: {
                    brands: [],
                    programs: []
                }
            },
            applyMiddleware(thunk)
        );
    }
}
