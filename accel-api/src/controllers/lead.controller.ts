import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

import * as leadService from '../service/lead.service'

export const getLeads = expressAsyncHandler(async (req: any, res: Response) => {

    const leads = await leadService.getLeads(req.query)
    res.status(200).json(leads)

})

export const getLeadsOfSalesPerson = expressAsyncHandler(async (req: any, res:Response) => {

    const leads = await leadService.getLeadsOfSalesPerson(req.user?.id, req.query)
    res.status(200).json(leads)

})

export const getLeadsSummaryOfSalesPerson = expressAsyncHandler(async (req:any, res:Response) => {

    const summary = await leadService.getLeadsSummaryOfSalesPerson(req.user?.id);
    res.status(200).json(summary)

})

export const getLeadById = expressAsyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params;

    const lead = await leadService.getLeadById(Number(id))
    res.status(200).json(lead)

})

export const addLead = expressAsyncHandler(async (req: any, res: Response) => {

    const newLead = await leadService.addLead(req.user?.id, req.body)
    res.status(201).json(newLead)

})

export const updateLead = expressAsyncHandler(async (req: any, res: Response) => {

    const { id } = req.params;

    const updatedLead = await leadService.updateLead(Number(id), req.body)
    res.status(200).json(updatedLead)

})

export const deleteLead = expressAsyncHandler(async (req: any, res: Response) => {

    const { id } = req.params

    const deletedLead = await leadService.deleteLead(Number(id))
    res.status(204).json(deletedLead)

})