export default (state = {}, action) => {
    switch (action.type) {
    case 'GET_DATA':
        state = action.data
        return state;
    case 'GET_DATA_ERROR':
        return state;
    default:
        return state;
    }
};
