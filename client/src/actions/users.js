import * as api from '../api';

//Action creators
export const getUsers = () => async (dispatch) => {
    try {
        const {data} = await api.fetchUsers();
        dispatch({
            type: 'FETCH_ALL',
            payload: data
        });
    } catch (error) {
        console.log(error);
    }
}

export const createUser = (user) => async (dispatch) => {
    try {
        const { data } = await api.createUser(user);
        dispatch({
            type: 'CREATE',
            payload: data
        });
    } catch (error) {
        console.log(error);
    }
}