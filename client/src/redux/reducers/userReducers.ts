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
import { IAction, IState } from "../../types/types";

export const authReducer = (state: IState = { user: {} }, action: IAction): IState => {

    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false,
            }
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: undefined
            }
        case LOAD_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: undefined,
                error: action.payload
            }
        case LOGOUT_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: undefined,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: undefined
            }
        default:
            return state
    }
}