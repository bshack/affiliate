import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducerStandard from '../reducer/standard';

export default class {

    constructor(app) {
        this.app = app;
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

            let whereParams = {};

            if (params.brand) {

                return this.app.get('databaseConnection')
                    .from('brand')
                    .select(['label'])
                    .where({
                        value: params.brand
                    })
                    .then((data) => {
                        dispatch(this.handleGetSuccess([
                            {
                                title: data[0].label
                            }
                        ]));
                    })
                    .catch((error) => {
                        dispatch(this.handleGetError(error));
                    });

            } else if (params.programName) {

                return this.app.get('databaseConnection')
                    .from('store')
                    .select(['label'])
                    .where({
                        value: params.programName
                    })
                    .then((data) => {
                        dispatch(this.handleGetSuccess([
                            {
                                title: data[0].label
                            }
                        ]));
                    })
                    .catch((error) => {
                        dispatch(this.handleGetError(error));
                    });

            } else if (params.path) {

                whereParams.path = params.path;

                return this.app.get('databaseConnection')
                    .from('category')
                    .select()
                    .where(whereParams)
                    .then((data) => {
                        dispatch(this.handleGetSuccess(data));
                    })
                    .catch((error) => {
                        dispatch(this.handleGetError(error));
                    });

            }

        };

    }

};
