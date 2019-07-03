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

            let whereParams = {
                isActive: true
            };

            if (params.filename) {
                whereParams.filename = params.filename;
            }

            return this.app.get('databaseConnection')
                .from('content')
                .select()
                .where((builder) => {
                    if (whereParams.filename && typeof whereParams.filename === 'object') {
                        let filenames = whereParams.filename;
                        delete whereParams.filename;
                        builder
                            .whereIn('filename', filenames)
                            .where(whereParams);
                    } else {
                        builder.where(whereParams);
                    }
                })
                .then((data) => {
                    dispatch(this.handleGetSuccess(data));
                })
                .catch((error) => {
                    dispatch(this.handleGetError(error));
                });

        };
    }

};
