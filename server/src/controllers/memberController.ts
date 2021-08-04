import { Request, Response, NextFunction } from "express";
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import ErrorHandler from "../utils/errorHandler";
import Member from "../models/member";
import Tweet from "../models/tweet";

// GET: /members/:id
export const getMember = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const member = await Member.findById(req.params.id);

    if (!member) {
        return next(new ErrorHandler('Member not found', 404));
    }
    res.status(200).json({
        success: true,
        member
    })
})

// GET: /members/:id/tweets
export const getMemberTweetsById = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const memberId = req.params.id;

    const filterByMemberId: any = { "member": { "$in": memberId } }

    const tweets = await Tweet.find(filterByMemberId)

    res.status(200).json({
        success: true,
        tweets
    })
})