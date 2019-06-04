import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
    case 'UPDATE_DATA':
        state = _.merge({}, state, action.data);
        return state;
    case 'GET_DATA':
        state = action.data;
        return state;
    case 'UPDATE_DATA_ERROR':
        return state;
    case 'GET_DATA_ERROR':
        return state;
    default:
        return state;
    }
};
