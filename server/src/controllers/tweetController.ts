import { Request, Response, NextFunction } from "express";
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import ErrorHandler from "../utils/errorHandler";
import { Schema } from 'mongoose'
import Tweet from "../models/tweet";
import Member from "../models/member";
import IMember, { ITweet } from "../types/types";

// GET: /tweets
export const getTweets = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const tweets: any = await Tweet.find();

    if (!tweets) {
        return next(new ErrorHandler('Tweets not found', 404));
    }
    res.status(200).json({
        success: true,
        tweets
    })
})


export const newTweet = catchAsyncErrors(async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {

    const { text } = req.body.newTweet;

    const regex = new RegExp('^[A-Za-z\s]{1,240}$');

    if (regex.test(text)) {
        return next(new ErrorHandler('content must be no longer then 240 characters', 400));
    }

    let tweet: any = new Tweet();
    tweet.member = req.member._id;
    tweet.text = text;

    const createdTweet = await tweet.save({ validateBeforeSave: false });

    await Member.findOneAndUpdate(
        { _id: req.member._id },
        { $push: { tweets: createdTweet } },
    );

    res.status(201).json({
        success: true,
        createdTweet
    })

})

export const deleteTweet = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const tweet = await Tweet.findById(req.params.id);

    if (!tweet) {
        return next(new ErrorHandler('Tweet not found', 404))
    }

    await Tweet.remove();

    res.status(200).json({
        success: true,
        message: 'The Tweet has been deleted.'
    })

})

export const starToggle = catchAsyncErrors(async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {

    const tweet: any = await Tweet.findById(req.params.id);
    console.log(tweet)
    console.log(req.member._id)
    if (tweet.stars.includes(req.member._id)) {

        const index = tweet.stars.indexOf(req.member._id);
        if (index > -1) {
            tweet.stars.splice(index, 1);
        }
    } else {
        tweet.stars.push(req.member._id)
    }

    let tweetUpdated: any = await Tweet.findByIdAndUpdate(req.params.id, tweet, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        tweetUpdated
    })
})