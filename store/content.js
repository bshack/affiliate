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
            case 'GET_CONTENT_DATA':
                state = action.data
                return state;
            case 'GET_CONTENT_DATA_ERROR':
                return state;
            default:
                return state;
        }
    }

    handleGetSuccess(data) {
        return {
            type: 'GET_CONTENT_DATA',
            data: data
        };
    }

    handleGetError(error) {
        return {
            type: 'GET_CONTENT_DATA_ERROR',
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
