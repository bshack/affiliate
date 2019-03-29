require('@gouch/to-title-case');
const redux = require('redux');
const thunk = require('redux-thunk').default;
const _ = require('lodash');

const buildCategoryHierarchy = (data) => {
    return new Promise((resolve, reject) => {

        data[1] = { seoDirectoryNamePart: 'shoes/dress' };
        data[2] = { seoDirectoryNamePart: 'shoes/dress/wedding' };
        data[3] = { seoDirectoryNamePart: 'shoes/basketball' };

        let categoryData = {
            paths: {},
            hierarchy: {}
        };
        let categoryHierarchy = {};
        let i;

        for (i = 0; i < data.length; i++) {

            let categoryLevel = {
                children: {}
            };

            let directories = data[i].seoDirectoryNamePart.split('/');
            let tmp = categoryLevel;
            let path = '';
            let ii;

            for (ii = 0, n = directories.length; ii < n; ii++) {

                path = path + '/' + directories[ii];
                tmp.children[directories[ii]] = {
                    title: directories[ii].replace(/-/g,' ').toTitleCase(),
                    path: path,
                    children: {}
                };

                categoryData.paths[path] = _.merge(categoryData.paths[path], tmp.children[directories[ii]]);
                delete categoryData.paths[path].children;

                tmp = tmp.children[directories[ii]];

            }

            categoryHierarchy = _.merge(categoryHierarchy, categoryLevel);

        }

        categoryData.hierarchy = categoryHierarchy.children;

        console.log(categoryData);

        resolve(categoryData);

    })
};

(() => {

    'use strict';
    module.exports = class {

        constructor(app) {
            this.app = app;
            this.store = redux.createStore(
                this.reducers,
                redux.applyMiddleware(thunk)
            );
        }

        reducers(state = {}, action) {
            switch (action.type) {
                case 'GET_CATEGORY_DATA':
                    state = action.data
                    return state;
                case 'GET_CATEGORY_DATA_ERROR':
                    return state;
                default:
                    return state;
            }
        }

        handleGetSuccess(data) {
            return {
                type: 'GET_CATEGORY_DATA',
                data: data
            };
        }

        handleGetError(error) {
            return {
                type: 'GET_CATEGORY_DATA_ERROR',
                data: error
            };
        }

        getOne(params) {

          return (dispatch, getState) => {
              return this.app.get('databaseConnection')
                  .from('product')
                  .distinct('seoDirectoryNamePart')
                  .select()
                  .where({
                       isActive: true
                  })
                  .limit(1)
                  .then((data) => {
                     dispatch(this.handleGetSuccess(data));
                  })
                  .catch((error) => {
                      dispatch(this.handleGetError(error));
                  });
          };

        }

        getAll(params) {

            return (dispatch, getState) => {
                return this.app.get('databaseConnection')
                    .from('product')
                    .distinct('seoDirectoryNamePart')
                    .select()
                    .where({
                         isActive: true
                    })
                    .then(buildCategoryHierarchy)
                    .then((data) => {
                       dispatch(this.handleGetSuccess(data));
                    })
                    .catch((error) => {
                        dispatch(this.handleGetError(error));
                    });
            };

        }

    };
})();
