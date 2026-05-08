import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

import * as leadNoteService from "../service/leadNote.service"

export const getNotesByLeadId = expressAsyncHandler(async (req: any, res: Response) => {

    const { id } = req.params

    const notes = await leadNoteService.getNotesByLeadId(Number(id))
    res.status(200).json(notes)

})

export const addNote = expressAsyncHandler(async (req: any, res: Response) => {

    const newNote = await leadNoteService.addNote(req.user.id, req.body)
    res.status(201).json(newNote)

})