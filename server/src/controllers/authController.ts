import { Request, Response, NextFunction } from "express";
import Schema from 'mongoose';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import ErrorHandler from "../utils/errorHandler";
import sendToken from '../utils/jwtToken';
import Member from "../models/member";
import IMember from "../types/types";

export const register = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {

        return next(new ErrorHandler('Please fill in all the fields', 400));
    }

    if (username && email && password) {

        const leastOneDigit = new RegExp('(?=.*[0-9])'); //should contain at least one digit
        const leastOneUppercase = new RegExp('(?=.*[A-Z])'); // should contain at least one upper case
        const least8Characters = new RegExp('[a-zA-Z0-9]{8,}');  // should contain at least 8 from the mentioned characters

        if (!(leastOneDigit.test(password) && leastOneUppercase.test(password) && least8Characters.test(password))) {
            return next(new ErrorHandler('Bad password', 400));
        }
    }
    const memberExist = await Member.findOne({ email }).select('+password')
    if (memberExist) {

        return next(new ErrorHandler('User already exists', 409));
    }

    const member = await Member.create([{
        "_id": new Schema.Types.ObjectId(),
        "username": username,
        "email": email,
        "password": password

    }])

    const newMember: IMember | null = await Member.findOne({ email }).select('+password')
    if (newMember) {
        sendToken(newMember, 200, res);
    }
})

export const login = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const { email, password } = req.body;

    //Check if email and password is entered by user
    if (!email || !password) {

        return next(new ErrorHandler('Please enter email & password', 400));
    }

    //Finding user in database
    const member = await Member.findOne({ email }).select('+password')

    if (!member) {
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }

    //Checkes if password is correct or not
    const isPasswordMatched = await member.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }

    member.lastLoginDate = new Date();
    await member.save()

    sendToken(member, 200, res)
})

export const logout = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    res.cookie('tweeterToken', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        successs: true,
        message: 'Logged out'
    })
})