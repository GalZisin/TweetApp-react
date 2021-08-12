import axios from 'axios'
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_ERRORS
} from '../constants/userConstants'
import { AppDispatch, IAuthFunction, IConfigHeaders } from '../../types/types';

const baseUrl = 'http://localhost:8000';
// const baseUrl = '';

// Login
export const login = ({ email, password }: IAuthFunction) => async (dispatch: AppDispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })

        const config: IConfigHeaders = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.defaults.withCredentials = true;
        const { data } = await axios.post(baseUrl + '/api/auth/login', { email, password }, config)
        console.log(data)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.member
        })

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

// Register user
export const register = ({ name, email, password }: IAuthFunction) => async (dispatch: AppDispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST })

        const config: IConfigHeaders = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.defaults.withCredentials = true;
        const { data } = await axios.post(baseUrl + '/api/auth/register', { name, email, password }, config)

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Logout user
export const logout = () => async (dispatch: AppDispatch) => {

    try {
        await axios.get(baseUrl + '/api/auth/logout', { withCredentials: true })

        dispatch({
            type: LOGOUT_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Load user
export const loadUser = (): any => async (dispatch: AppDispatch) => {

    try {

        dispatch({ type: LOAD_USER_REQUEST })

        const { data } = await axios.get(baseUrl + '/api/members/me', { withCredentials: true })
        dispatch({
            type: LOAD_USER_SUCCESS,
            // payload: data.memberObj
            payload: data.member
        })

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear Errors
export const clearErrors = () => async (dispatch: Function) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}