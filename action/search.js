import axios from 'axios';
import config from '../configPublic';

const endPoint = config.api.origin + '/service/search';

export const LOADING_DATA = 'LOADING_DATA';
export const GET_DATA = 'GET_DATA';
export const GET_DATA_ERROR = 'GET_DATA_ERROR';
export const queryBrandsStores = (params) => dispatch => {
    dispatch({
        type: LOADING_DATA
    });
    return axios.get(endPoint, {
        params: params
    })
        .then((response) => {
            dispatch({
                type: GET_DATA,
                data: {
                    data: response.data,
                    config: {}
                }
            });
        })
        .catch((error) => {
            dispatch({
                type: GET_DATA_ERROR,
                data: error
            });
        });
};
