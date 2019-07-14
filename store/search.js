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
                .select([
                    'product.brand',
                    'brand.label as brandName'
                ])
                .where('brand', 'like', '%' + params.q + '%')
                .where({
                    'product.isActive': true,
                    'product.isImageLinkProcessed': true
                })
                .innerJoin('brand', 'product.brand', 'brand.value')
                .groupBy('brand')
                .limit(resultLimit)
                .orderBy('brand', 'asc')
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
                .select([
                    'product.programName',
                    'store.label as storeName'
                ])
                .where('programName', 'like', '%' + params.q + '%')
                .where({
                    'product.isActive': true,
                    'product.isImageLinkProcessed': true
                })
                .innerJoin('store', 'product.programName', 'store.value')
                .groupBy('programName')
                .limit(resultLimit)
                .orderBy('programName', 'asc')
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
                    'product.isActive': true,
                    'product.isImageLinkProcessed': true
                })
                .innerJoin('category', 'product.googleProductCategory', 'category.googleid')
                .groupBy('product.title')
                .limit(resultLimit)
                .orderBy('product.title', 'asc')
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
