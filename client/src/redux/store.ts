import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    tweetsReducer,
    createNewTweetReducer,
    tweetReducer,
    myTweetsReducer,
    toggleStarReducer
} from './reducers/tweetReducers'
import {
    authReducer,
} from './reducers/userReducers'

const reducer = combineReducers({
    tweets: tweetsReducer,
    tweet: tweetReducer,
    myTweets: myTweetsReducer,
    toggleStar: toggleStarReducer,
    createNewTweet: createNewTweetReducer,
    auth: authReducer
})

let initialState = {}
const middlware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)));

export type RootState = ReturnType<typeof store.getState>

export default store;