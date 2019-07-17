import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import moment from 'moment';
import reducerStandard from '../reducer/standard';

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

            let now = moment().format('YYYY/MM/DD HH:mm:ss');

            let whereParams = {
                'campaign.isActive': true
            };

            let limitParam = 300;

            if (params.id) {
                whereParams.id = parseInt(params.id);
            }

            if (params.brand) {
                whereParams.brand = params.brand;
            }

            if (params.programName) {
                whereParams.store = params.programName;
            }

            if (params.path) {
                whereParams.path = params.path;
            }

            if (typeof params.limit !== 'undefined' && params.limit === false) {
                limitParam = '';
            } else if (params.limit) {
                limitParam = parseInt(params.limit, 10);
            }

            return this.app.get('databaseConnection')
                .from('campaign')
                .select([
                    'campaign.*',
                    'brand.label AS brandName',
                    'store.label AS storeName',
                    'category.path AS path'
                ])
                .limit(limitParam)
                .innerJoin('category', 'campaign.category', 'category.googleid')
                .innerJoin('brand', 'campaign.brand', 'brand.value')
                .innerJoin('store', 'campaign.store', 'store.value')
                .where((builder) => {
                    if (whereParams.path) {
                        builder
                            .where(whereParams)
                            .where('campaign.startDate', '<', now)
                            .where('campaign.endDate', '>', now)
                            .where('path', 'like', whereParams.path + '%');
                    } else {
                        builder
                            .where(whereParams)
                            .where('campaign.startDate', '<', now)
                            .where('campaign.endDate', '>', now);
                    }
                })
                .orderBy('campaign.isExclusive', 'desc')
                .orderBy('campaign.timestamp', 'desc')
                .groupBy('campaign.title')
                .then((data) => {
                    dispatch(this.handleGetSuccess(data));
                })
                .catch((error) => {
                    dispatch(this.handleGetError(error));
                });
        };
    }

};
