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
                    'product.availability': 'in stock',
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

    searchCategories(params) {
        return new Promise((resolve, reject) => {
            this.app.get('databaseConnection')
                .from('product')
                .innerJoin('category', 'product.googleProductCategory', 'category.googleid')
                .select([
                    'category.title',
                    'category.path'
                ])
                .where('category.title', 'like', '%' + params.q + '%')
                .where({
                    'category.isActive': true,
                    'product.isActive': true,
                    'product.availability': 'in stock',
                    'product.isImageLinkProcessed': true
                })
                .orderBy('category.title', 'asc')
                .groupBy('category.title')
                .limit(resultLimit)
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
                    'product.availability': 'in stock',
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
                    'product.availability': 'in stock',
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
                this.searchCategories(whereParams),
                this.searchProducts(whereParams)
            ])
                .then((data) => {
                    dispatch(this.handleGetSuccess({
                        query: whereParams.q || '',
                        brands: data[0],
                        programs: data[1],
                        categories: data[2],
                        products: data[3]
                    }));
                })
                .catch((error) => {
                    dispatch(this.handleGetError(error));
                });

        };
    }

};
