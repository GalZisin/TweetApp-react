import axios from "axios";
import { AppDispatch, ITweet } from "../../types/types";
import {
    ANONYMOUS_TWEETS_REQUEST,
    ANONYMOUS_TWEETS_SUCCESS,
    ANONYMOUS_TWEETS_FAIL,
    DELETE_TWEET_REQUEST,
    DELETE_TWEET_SUCCESS,
    DELETE_TWEET_FAIL,
    NEW_TWEET_REQUEST,
    NEW_TWEET_SUCCESS,
    NEW_TWEET_FAIL,
    MY_TWEETS_REQUEST,
    MY_TWEETS_SUCCESS,
    MY_TWEETS_FAIL,
    TOGGLE_STAR_REQUEST,
    TOGGLE_STAR_SUCCESS,
    TOGGLE_STAR_FAIL
} from '../constants/tweetConstants'

const baseUrl = 'http://localhost:8000';
// const baseUrl = '';

export const getTweets = () => async (dispatch: AppDispatch) => {
    try {

        dispatch({ type: ANONYMOUS_TWEETS_REQUEST })

        const { data } = await axios.get(baseUrl + `/api/tweets`, { withCredentials: true })

        dispatch({
            type: ANONYMOUS_TWEETS_SUCCESS,
            payload: data.tweets
        })
    } catch (error) {
        dispatch({
            type: ANONYMOUS_TWEETS_FAIL,
            payload: error.response.data.message
        })
    }
}


// Delete tweet
export const deleteTweet = (id: string) => async (dispatch: AppDispatch) => {
    try {

        dispatch({ type: DELETE_TWEET_REQUEST })
        axios.defaults.withCredentials = true;
        const { data } = await axios.delete(baseUrl + `/api/tweets/${id}`)

        dispatch({
            type: DELETE_TWEET_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_TWEET_FAIL,
            payload: error.response.data.message
        })
    }
}

export interface ICreateNewTweet {
    newTweet: {
        tweetText: string;
    }
}
export const createNewTweet = (tweetText: string) => async (dispatch: AppDispatch) => {
    console.log("text:", tweetText)
    try {

        dispatch({ type: NEW_TWEET_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.defaults.withCredentials = true;
        const { data } = await axios.post(baseUrl + `/api/tweets`, { tweetText }, config)
        console.log("data", data)
        dispatch({
            type: NEW_TWEET_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_TWEET_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getMyTweets = (memberId: string) => async (dispatch: AppDispatch) => {
    try {

        dispatch({ type: MY_TWEETS_REQUEST })
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(baseUrl + `/api/members/${memberId}/tweets`, { withCredentials: true })

        console.log("getMyTweets data", data)
        dispatch({
            type: MY_TWEETS_SUCCESS,
            payload: data.tweets
        })
    } catch (error) {
        dispatch({
            type: MY_TWEETS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const toggleStar = (tweetId: string) => async (dispatch: AppDispatch) => {
    try {

        dispatch({ type: TOGGLE_STAR_REQUEST })
        axios.defaults.withCredentials = true;
        const { data } = await axios.post(baseUrl + `/api/tweets/${tweetId}/star-toggle`, { withCredentials: true })

        dispatch({
            type: TOGGLE_STAR_SUCCESS,
            payload: data.updatatedTweets
        })
    } catch (error) {
        dispatch({
            type: TOGGLE_STAR_FAIL,
            payload: error.response.data.message
        })
    }
}