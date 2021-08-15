import React, { useEffect } from 'react';
import { getMyTweets, getTweets } from '../redux/actions/tweetActions';
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux'
import Card from './Card';
import { useHistory, useParams } from 'react-router-dom';
import { ITweet } from '../types/types';
import { loadUser } from '../redux/actions/userActions';
import image from '../images/dog_image.jpg'
import moment from 'moment';
import { DELETE_TWEET_RESET } from '../redux/constants/tweetConstants';
import { useTranslation } from 'react-i18next';

interface IParams {
    id: string;
}

const ProfilePage = () => {
    const { t } = useTranslation()
    const { tweets } = useSelector((state: RootState) => state.myTweets)
    const { user, isAuthenticated, loading } = useSelector((state: RootState) => state.auth)
    const { success, tweet: createdTweet } = useSelector((state: RootState) => state.createNewTweet)
    const { isDeleted, error } = useSelector((state: RootState) => state.tweet)
    const dispatch = useDispatch();
    const params: IParams = useParams();
    const history = useHistory();
    useEffect(() => {

        dispatch(getMyTweets(params?.id))

        if (loading === undefined) {
            dispatch(loadUser());
        }
        if (isAuthenticated) {
            history.push(`/profile/${user?.memberId}`)
        }
        if (success && createdTweet) {
            dispatch(getTweets());
        }
        if (isDeleted) {

            dispatch(getMyTweets(params?.id))
            dispatch({ type: DELETE_TWEET_RESET })
        }
    }, [dispatch, success, createdTweet, loading, isDeleted])

    return (

        <div className="container">
            <h1>{t('profile_page')}</h1>
            <div className="profile_box">
                <div className="profile_image">
                    <img src={image} className="card_image" alt="image" />
                </div>
                <div className="user_data">
                    <div className="user_data_item"><span>{t('username')}: </span>{user?.username}</div>
                    <div className="user_data_item"><span>{t('registration_date')}: </span>{moment(user?.registrationDate).format("DD/MM/YYYY")}</div>
                    <div className="user_data_item"><span>{t('last_login_date')}: </span>{moment(user?.lastLoginDate).format("DD/MM/YYYY")}</div>
                </div>
            </div>
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
        </div>
    )
}

export default ProfilePage;