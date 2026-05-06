import { Request, Response } from "express"
import expressAsyncHandler from "express-async-handler"
import * as authService from "../service/auth.service"

export const signUp = expressAsyncHandler(async (req:Request, res:Response) => {

    const { email, password, firstName, lastName } = req.body;

    const newUser = await authService.signUp({ email, password, firstName, lastName });
    res.status(201).json(newUser);

})

export const signIn = expressAsyncHandler(async (req:Request, res:Response) => {

    const { email, password } = req.body

    const signedInUser = await authService.signIn({ email, password });
    res.status(200).json(signedInUser)

})