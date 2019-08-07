import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import _ from 'lodash';
import reducerStandard from '../../reducer/standard';

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

            return this.app.get('databaseConnection')
                .from('category')
                .select([
                    'id',
                    'path',
                    'title',
                    'isFeatured'
                ])
                .where({
                    isFeatured: true,
                    isActive: true
                })
                .then((data) => {
                    return new Promise((resolve, reject) => {
                        let i;
                        let normalized = [];
                        for (i = 0; i < data.length; i++) {
                            data[i].children = [];
                            normalized.push(data[i]);
                        }
                        // normalized.push({
                        //     title: 'View All Categories',
                        //     path: false,
                        //     id: 0,
                        //     children: [],
                        //     isFeatured: 1
                        // });
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
