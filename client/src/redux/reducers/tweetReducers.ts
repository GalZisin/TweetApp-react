import {
    ANONYMOUS_TWEETS_REQUEST,
    ANONYMOUS_TWEETS_SUCCESS,
    ANONYMOUS_TWEETS_FAIL,
    NEW_TWEET_REQUEST,
    NEW_TWEET_SUCCESS,
    NEW_TWEET_FAIL,
    DELETE_TWEET_REQUEST,
    DELETE_TWEET_SUCCESS,
    DELETE_TWEET_FAIL,
    DELETE_TWEET_RESET,
    CLEAR_ERRORS,
    MY_TWEETS_REQUEST,
    MY_TWEETS_SUCCESS,
    MY_TWEETS_FAIL,
    TOGGLE_STAR_REQUEST,
    TOGGLE_STAR_SUCCESS,
    TOGGLE_STAR_FAIL

} from '../constants/tweetConstants'
import { IAction, IState } from "../../types/types";

export const tweetsReducer = (state: IState = { tweets: [] }, action: IAction): IState => {
    switch (action.type) {
        case ANONYMOUS_TWEETS_REQUEST:
            return {
                loading: true,
                tweets: []
            }
        case ANONYMOUS_TWEETS_SUCCESS:
            return {
                loading: false,
                tweets: action.payload
            }
        case ANONYMOUS_TWEETS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: undefined
            }
        default:
            return state;
    }
}

export const createNewTweetReducer = (state: IState = { tweet: {} }, action: IAction): IState => {

    switch (action.type) {

        case NEW_TWEET_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NEW_TWEET_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                tweet: action.payload.createdTweet
            }
        case NEW_TWEET_FAIL:
            return {
                ...state,
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


export const tweetReducer = (state: IState = {}, action: IAction): IState => {
    switch (action.type) {
        case DELETE_TWEET_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_TWEET_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case DELETE_TWEET_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case DELETE_TWEET_RESET:
            return {
                ...state,
                isDeleted: false
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


export const myTweetsReducer = (state: IState = { tweets: [] }, action: IAction): IState => {
    switch (action.type) {

        case MY_TWEETS_REQUEST:
            return {
                loading: true
            }

        case MY_TWEETS_SUCCESS:
            return {
                loading: false,
                tweets: action.payload
            }

        case MY_TWEETS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: undefined
            }

        default:
            return state;
    }
}

export const toggleStarReducer = (state: IState = { tweets: [] }, action: IAction): IState => {
    switch (action.type) {
        case TOGGLE_STAR_REQUEST:
            return {
                loading: true
            }
        case TOGGLE_STAR_SUCCESS:
            return {
                ...state,
                isStarToggled: true,
                tweets: action.payload
            }
        case TOGGLE_STAR_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}