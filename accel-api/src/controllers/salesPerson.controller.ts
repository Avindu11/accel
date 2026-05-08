import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

import * as salesPersonService from "../service/salesPerson.service"

export const getAllSalesPersons = expressAsyncHandler(async (req:Request, res:Response) => {

    const salesPersons = await salesPersonService.getAllSalesPersons()
    res.status(200).json(salesPersons)

})