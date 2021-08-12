import React, { useEffect, useState } from 'react';
import image from '../images/dog_image.jpg'
import DeleteIcon from '@material-ui/icons/Delete';
// import ReplyIcon from '@material-ui/icons/Reply';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import moment from 'moment'
import { ITweet, IUser } from '../types/types';
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux'
import { deleteTweet, getTweets, toggleStar } from '../redux/actions/tweetActions';
import { DELETE_TWEET_RESET } from '../redux/constants/tweetConstants';
import { useConfirm } from "material-ui-confirm";
import AddTweetModal from './auth/AddTweetModal';
import { useParams } from 'react-router-dom';

export interface IProps {
    tweetId?: string;
    tweetObj: ITweet | undefined;
    user: IUser | undefined;
}

interface IParams {
    id: string;
}
const Card = ({ tweetObj, user, tweetId }: IProps) => {

    const dispatch = useDispatch();
    const confirm = useConfirm();
    const params: IParams = useParams();
    const [starCounter, setStarCounter] = useState(tweetObj?.stars?.length!);
    const [userClicked, setUserClicked] = useState(!!tweetObj?.stars?.find((i) => i === user?.memberId));
    const { tweets } = useSelector((state: RootState) => state.tweets)
    const { isDeleted, error } = useSelector((state: RootState) => state.tweet)
    const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth)
    const { tweets: updatedTweets, isStarToggled } = useSelector((state: RootState) => state.toggleStar)

    const handleDelete = async (tweetId: string): Promise<any> => {
        await confirm({ description: 'This will permanently delete the tweet' })
        dispatch(deleteTweet(tweetId))
    }
    const handleToggleStar = (tweetId: string) => {

        userClicked ? setStarCounter(starCounter - 1) : setStarCounter(starCounter + 1);
        setUserClicked(!userClicked)
        dispatch(toggleStar(tweetId))
    }

    useEffect(() => {
        if (isDeleted) {
            dispatch(getTweets());
            dispatch({ type: DELETE_TWEET_RESET })
        }
    }, [dispatch, isDeleted])
    return (
        <div className="card_style">
            <img src={image} className="card_image" alt="image" />
            <div className="card_content">
                <div className="card_poster_date">
                    {tweetObj?.memberId?.username || user?.username} - {moment(tweetObj?.postDate).format("DD/MM/YYYY")}
                </div>
                <div className="card_text">
                    {tweetObj?.text}
                </div>
            </div>

            <div className="card_buttons">
                <div className="card_icons">
                    {(tweetObj?.memberId?._id || tweetObj?.memberId) === user?.memberId && isAuthenticated && <DeleteIcon className="deleteIcon" onClick={() => handleDelete(tweetId!)} />}
                    {isAuthenticated && <AddTweetModal tweetId={tweetId} />}
                    <span className="stars_counter">{starCounter}</span><StarRoundedIcon className="starIcon" onClick={() => handleToggleStar(tweetId!)} />
                </div>
            </div>

        </div>
    )
}
export default Card;

// {tweetObj?.stars?.length}