import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
    case 'LOADING_DATA':
        state = _.merge({}, state, action.data);
        state.isLoading = true;
        return state;
    case 'UPDATE_DATA':
        state = _.merge({}, state, action.data);
        delete state.isLoading;
        return state;
    case 'GET_DATA':
        state = action.data;
        delete state.isLoading;
        return state;
    case 'UPDATE_DATA_ERROR':
        delete state.isLoading;
        return state;
    case 'GET_DATA_ERROR':
        delete state.isLoading;
        return state;
    default:
        delete state.isLoading;
        return state;
    }
};
