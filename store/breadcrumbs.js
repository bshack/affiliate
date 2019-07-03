import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import _ from 'lodash';
import reducerStandard from '../reducer/standard';

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
            if (params.programName) {
                dispatch(this.handleGetSuccess([
                    {
                        id: 'home',
                        title: 'Home'
                    },
                    {
                        id: params.programName,
                        title: params.programName
                    }
                ]));
            } else if (params.brand) {
                dispatch(this.handleGetSuccess([
                    {
                        id: 'home',
                        title: 'Home'
                    },
                    {
                        id: params.brand,
                        title: params.brand
                    }
                ]));

            } else if (params.path) {

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

            } else if (params.filename) {

                params.isActive = true;

                return this.app.get('databaseConnection')
                    .from('content')
                    .select(['id', 'title', 'filename'])
                    .where(params)
                    .then((data) => {
                        dispatch(this.handleGetSuccess([
                            {
                                id: 'home',
                                title: 'Home',
                            },
                            {
                                id: data[0].id,
                                title: data[0].title,
                                url: data[0].filename
                            }
                        ]));
                    })
                    .catch((error) => {
                        dispatch(this.handleGetError(error));
                    });
            }
        };

    }

};
