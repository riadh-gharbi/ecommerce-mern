/*
    -- Auth Actions --
    loadUser
    register
    login
    logout

    -- Helper Function --
    tokenConfig
*/
import axios from 'axios';
import { returnErrors } from './errorActions';
import {
    USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL
    , REGISTER_SUCCESS
} from './types';

export const loadUser = () => (dispatch, getState) => {
    //User Loading
    dispatch({ type: USER_LOADING });

    axios.get('api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        })).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            })
        })
}

export const register = ({ name, email, password }) => dispatch => {
    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //Request Body
    const body = JSON.stringify({ name, email, password });

    axios.post('api/auth/register', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

export const login = ({ email, password }) => dispatch => {
    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    //Request Body
    const body = JSON.stringify({ email, password });

    axios.post('api/auth/login', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}