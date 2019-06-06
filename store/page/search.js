import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducerStandard from '../../reducer/standard';

export default class {
    constructor() {
        this.store = createStore(
            reducerStandard,
            {
                data: {
                    brands: [],
                    programs: [],
                    products: []
                }
            },
            applyMiddleware(thunk)
        );
    }
}
