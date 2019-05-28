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
                return dispatch(this.handleGetSuccess([
                    {
                        title: params.brand
                    }
                ]));
            } else if (params.programName) {
                return dispatch(this.handleGetSuccess([
                    {
                        title: params.programName
                    }
                ]));
            } else if (params.path) {
                whereParams.path = params.path;
            }

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

        };

    }

};
