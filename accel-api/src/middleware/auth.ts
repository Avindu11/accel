import { NextFunction, Request, Response } from 'express'
import passport from '../config/passport'
import ApiError from '../util/ApiError'

export const authenticate = () => (req:Request, res:Response, next:NextFunction) => {

    passport.authenticate('jwt', { session: false }, (err:any, user:any, info:any ) => {

        if(err) return next(err);

        if(!user) {
            throw new ApiError('Unauthorized', 401)
        }

        console.log(user)

        req.user = user

        next()

    })(req, res, next)

}

export const authorize = (...roles:string[]) => (req:any, res:Response, next:NextFunction) => {

    const allowedRoles = req.user?.roles || []

    if (!roles.some(role => allowedRoles.includes(role))) {
        return res.status(403).json({ status: 'error', message: 'Forbidden' })
    }

    next()

}