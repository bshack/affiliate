import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducerStandard from '../reducer/standard';

const resultLimit = 5;

export default class {

    constructor(app) {
        this.app = app;
        this.store = createStore(
            reducerStandard,
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

    searchProducts(query) {
        return new Promise((resolve, reject) => {
            this.app.get('databaseConnection')
                .from('product')
                .select(['title'])
                .where('title', 'like', '%' + query + '%')
                .groupBy('title')
                .limit(resultLimit)
                .orderBy('title', 'desc')
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(data);
                });
        });
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

            if (params.q) {
                whereParams.q = params.q;
            }

            return Promise.all([
                this.searchBrands(whereParams.q),
                this.searchPrograms(whereParams.q),
                this.searchProducts(whereParams.q)
            ])
                .then((data) => {
                    dispatch(this.handleGetSuccess({
                        brands: data[0],
                        programs: data[1],
                        products: data[2]
                    }));
                })
                .catch((error) => {
                    dispatch(this.handleGetError(error));
                });

        };
    }

};
