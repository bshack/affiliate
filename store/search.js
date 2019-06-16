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

    searchBrands(params) {
        return new Promise((resolve, reject) => {
            this.app.get('databaseConnection')
                .from('product')
                .select(['brand'])
                .where('brand', 'like', '%' + params.q + '%')
                .where({
                    isActive: params.isActive
                })
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

    searchPrograms(params) {
        return new Promise((resolve, reject) => {
            this.app.get('databaseConnection')
                .from('product')
                .select(['programName'])
                .where('programName', 'like', '%' + params.q + '%')
                .where({
                    isActive: params.isActive
                })
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

    searchProducts(params) {
        return new Promise((resolve, reject) => {
            this.app.get('databaseConnection')
                .from('product')
                .select([
                    'product.title',
                    'product.seoFilenamePart',
                    'category.path'
                ])
                .where('product.title', 'like', '%' + params.q + '%')
                .where({
                    'product.isActive': params.isActive
                })
                .innerJoin('category', 'product.googleProductCategory', 'category.googleid')
                .groupBy('product.title')
                .limit(resultLimit)
                .orderBy('product.title', 'desc')
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
                this.searchBrands(whereParams),
                this.searchPrograms(whereParams),
                this.searchProducts(whereParams)
            ])
                .then((data) => {
                    dispatch(this.handleGetSuccess({
                        query: whereParams.q || '',
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
