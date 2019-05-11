import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import _ from 'lodash';

const getCategoryDetails = (data) => {
    return new Promise((resolve, reject) => {

        let fullPathsList = [];
        let i;
        for (i = 0; i < data.length; i++) {
            let newPath = '';
            let productCategoryPathData = data[i].path.split('/');
            let ii;
            for (ii = 0; ii < productCategoryPathData.length; ii++) {
                if (newPath === '') {
                    newPath = productCategoryPathData[ii];
                } else {
                    newPath = newPath + '/' + productCategoryPathData[ii];
                }
                fullPathsList.push(newPath);
            }

        }

        resolve(fullPathsList);

    })
};

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
            case 'GET_BREADCRUMBS_DATA':
                state = action.data
                return state;
            case 'GET_BREADCRUMBS_DATA_ERROR':
                return state;
            default:
                return state;
        }
    }

    handleGetSuccess(data) {
        return {
            type: 'GET_BREADCRUMBS_DATA',
            data: data
        };
    }

    handleGetError(error) {
        return {
            type: 'GET_BREADCRUMBS_DATA_ERROR',
            data: error
        };
    }

    getAll(params) {

        return (dispatch, getState) => {
            if (params.programName) {
                res.header(responseHeader)
                    .status(200)
                    .send({
                        success: true,
                        data: [
                            {
                                id: 'home',
                                title: 'Home'
                            },
                            {
                                id: params.programName,
                                title: params.programName
                            }
                        ]
                    });
            } else if (params.brand) {

                res.header(responseHeader)
                    .status(200)
                    .send({
                        success: true,
                        data: [
                            {
                                id: 'home',
                                title: 'Home'
                            },
                            {
                                id: params.brand,
                                title: params.brand
                            }
                        ]
                    });
            } else {
                return this.app.get('databaseConnection')
                    .from('category')
                    .select([
                        'path'
                    ])
                    .where({
                        path: params.path
                    })
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
                    .then((categoryData) => {
                        return new Promise((resolve, reject) => {
                            if (params.filename) {
                                this.app.get('databaseConnection')
                                    .from('product')
                                    .select()
                                    .where({
                                        isActive: true,
                                        seoFilenamePart: params.filename
                                    })
                                    .then((productData) => {
                                        categoryData.push({
                                            title: productData[0].title,
                                            id: productData[0].seoFilenamePart
                                        });
                                        resolve(categoryData);
                                    })
                                    .catch(reject);
                            } else {
                                resolve(categoryData);
                            }

                        });
                    })
                    .then((data) => {
                        data.unshift({
                            id: 'home',
                            title: 'Home'
                        });
                        return data;
                    })
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
