import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import _ from 'lodash';
import reducerStandard from '../../reducer/standard';

const getCategoryDetails = (data) => {
    return new Promise((resolve, reject) => {
        data[1] = {
            path: 'vehicles-and-parts'
        };
        data[2] = {
            path: 'vehicles-and-parts/vehicles/watercraft/yachts'
        };
        data[3] = {
            path: 'toys-and-games/toys/riding-toys/hobby-horses'
        };
        data[4] = {
            path: 'food-beverages-and-tobacco/food-items/bakery'
        };
        data[5] = {
            path: 'food-beverages-and-tobacco/food-items'
        };
        let fullPathsList = [];
        let i;
        for (i = 0; i < data.length; i++) {
            let productCategoryPathData = data[i].path.split('/');
            if (productCategoryPathData.length > 1 &&
                    fullPathsList.indexOf(productCategoryPathData[0]) === -1) {
                fullPathsList.push(productCategoryPathData[0]);
            }
            if (fullPathsList.indexOf(data[i].path) === -1) {
                fullPathsList.push(data[i].path);
            }

        }
        resolve(fullPathsList);
    })
};

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

            let whereData = {
                'product.isActive': true
            };
            return this.app.get('databaseConnection')
                .from('product')
                .select([
                    'category.path'
                ])
                .where(whereData)
                .orderBy('category.path', 'asc')
                .innerJoin('category', 'product.googleProductCategory', 'category.googleid')
                .distinct('category.path')
                .then(getCategoryDetails)
                .then((paths) => {
                    return new Promise((resolve, reject) => {
                        this.app.get('databaseConnection')
                            .from('category')
                            .select()
                            .whereIn('path', paths)
                            .orderBy('path', 'asc')
                            .then(resolve)
                            .catch(reject);
                    });
                })
                .then((data) => {
                    return new Promise((resolve, reject) => {
                        let i;
                        let normalized = [];
                        let normalizedCategories = [];
                        let activeFeatured = false;
                        for (i = 0; i < data.length; i++) {
                            let pathParts = data[i].path.split('/');
                            if (data[i].isFeatured === 1) {
                                data[i].children = [];
                                normalized.push(data[i]);
                                activeFeatured = (normalized.length - 1);
                            } else if (pathParts.length === 1) {
                                normalizedCategories.push(data[i]);
                            } else {
                                if (activeFeatured !== false &&
                                        normalized[activeFeatured].path === pathParts[0]) {
                                    normalized[activeFeatured].children.push(data[i]);
                                }
                            }
                        }
                        normalized.push({
                            title: 'All Categories',
                            path: false,
                            id: 0,
                            children: normalizedCategories,
                            isFeatured: 1
                        });
                        resolve(normalized);
                    })
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
