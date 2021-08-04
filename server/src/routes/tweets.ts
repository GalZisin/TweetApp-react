import { Router } from 'express';

import { getTweets, deleteTweet, newTweet, starToggle } from '../controllers/tweetController';

import { isAuthenticatedUser } from '../middlewares/auth';

const router = Router();

router.route('/')
    .get(getTweets)
    .post(isAuthenticatedUser, newTweet)

router.route('/:id').delete(isAuthenticatedUser, deleteTweet)

router.route('/:id/star-toggle').post(isAuthenticatedUser, starToggle)
export default router;