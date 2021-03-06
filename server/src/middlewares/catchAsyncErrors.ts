import { Request, Response, NextFunction } from "express";
// import ITweet, { ITweetRequest } from "../types/types"
import { Schema } from 'mongoose'
export default (func: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>) =>
    (req: Request, res: Response, next: NextFunction): Promise<Response | void> =>
        Promise.resolve(func(req, res, next))
            .catch(next)