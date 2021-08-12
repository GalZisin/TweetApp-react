import React, { useEffect, Fragment, useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store';
import { loadUser } from '../redux/actions/userActions';
import Card from './Card';
import { ITweet, IUser } from '../types/types';
import { createNewTweet, getTweets } from '../redux/actions/tweetActions';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LimitedTextarea from './LimitedTextArea';


const HomePage = () => {
    const { t } = useTranslation()
    const [tweetText, setTweetText] = useState('');
    const [firstTime, setFirstTime] = useState(true)
    const { tweets } = useSelector((state: RootState) => state.tweets)
    const { success, tweet: createdTweet } = useSelector((state: RootState) => state.createNewTweet)
    const { user, isAuthenticated, loading } = useSelector((state: RootState) => state.auth)
    const { tweets: updatedTweets, isStarToggled } = useSelector((state: RootState) => state.toggleStar)
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {

        if (loading === undefined) {
            dispatch(loadUser());
        }
        let interval = setInterval(() => {
            dispatch(getTweets())
        },
            //  (10000) // 10 seconds
            (100000) // 100 seconds
        )

        if (firstTime) {
            dispatch(getTweets())
            setFirstTime(false)
        }
        if (success && createdTweet) {
            dispatch(getTweets());
        }
        //destroy interval on unmount
        return () => clearInterval(interval)
    }, [dispatch, success, createdTweet, loading])


    const handleSubmitPost = (e: FormEvent): void => {
        e.preventDefault();
        dispatch(createNewTweet(tweetText))
        setTweetText('');
    }
    return (
        <div className="container">
            <h1>{t('home_page_title')}</h1>
            {loading ? <div>Loading...</div> : (
                <Fragment>
                    {user && isAuthenticated &&
                        <form onSubmit={handleSubmitPost}>
                            <LimitedTextarea limit={240} tweetText={tweetText} />
                        </form>
                    }
                    <div className="card">
                        {tweets && tweets.slice(0).reverse().map((tweet: ITweet) => (
                            <Card
                                key={tweet?._id}
                                tweetObj={tweet}
                                user={user}
                                tweetId={tweet?._id}
                            />
                        ))}
                    </div>
                </Fragment>
            )}
        </div>
    )
}

export default HomePage;