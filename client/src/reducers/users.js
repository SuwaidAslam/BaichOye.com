import {DELETE, FETCH_ALL, CREATE, UPDATE} from '../constants/actionTypes';
export default (users = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...users, action.payload];
        default:
            return users;
    }
}