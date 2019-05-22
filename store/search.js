import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const resultLimit = 10;

export default class {

    constructor(app) {
        this.app = app;
        this.store = createStore(
            this.reducers,
            applyMiddleware(thunk)
        );
    }

    searchBrands(query) {
        return new Promise((resolve, reject) => {
            this.app.get('databaseConnection')
                .from('product')
                .select(['brand'])
                .where('brand', 'like', '%' + query + '%')
                .groupBy('brand')
                .limit(resultLimit)
                .orderBy('brand', 'desc')
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(data);
                });
        });
    }

    searchPrograms(query) {
        return new Promise((resolve, reject) => {
            this.app.get('databaseConnection')
                .from('product')
                .select(['programName'])
                .where('programName', 'like', '%' + query + '%')
                .groupBy('programName')
                .limit(resultLimit)
                .orderBy('programName', 'desc')
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(data);
                });
        });
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

            if (params.q) {
                whereParams.q = params.q;
            }

            return Promise.all([
                this.searchBrands(whereParams.q),
                this.searchPrograms(whereParams.q)
            ])
                .then((data) => {
                    dispatch(this.handleGetSuccess({
                        brands: data[0],
                        programs: data[1]
                    }));
                })
                .catch((error) => {
                    dispatch(this.handleGetError(error));
                });

        };
    }

};
