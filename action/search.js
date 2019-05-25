import axios from 'axios';
export const GET_SEARCH_DATA = 'GET_SEARCH_DATA';
export const GET_SEARCH_DATA_ERROR = 'LOAD_SEARCH_ERROR';
export const loadSearchResults = (params) => dispatch => {
    return axios.get('https://dev.valfoundry.io:3000/service/search', {
        params: params
    })
        .then((response) => {
            dispatch({
                type: GET_SEARCH_DATA,
                data: {
                    data: response.data,
                    config: {}
                }
            });
        })
        .catch((error) => {
            dispatch({
                type: GET_SEARCH_DATA_ERROR,
                data: error
            });
        });
};
