import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

import * as leadService from '../service/lead.service'

export const getLeads = expressAsyncHandler(async (req:any, res:Response) => {

    const leads = await leadService.getLeads(req.query)
    res.status(200).json(leads)

})


export const addLead = expressAsyncHandler(async (req:any, res:Response) => {

    const newLead = await leadService.addLead(req.user?.id, req.body)
    res.status(201).json(newLead)

})