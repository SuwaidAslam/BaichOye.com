import {DELETE, FETCH_ALL, CREATE, UPDATE} from '../constants/actionTypes';

const initialState = []
export default (users = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...users, action.payload];
        default:
            return users;
    }
}