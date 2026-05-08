import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

import * as leadNoteService from "../service/leadNote.service"

export const getNoteById = expressAsyncHandler(async (req: any, res: Response) => {

    const { id } = req.params

    const note = await leadNoteService.getNotesById(Number(id))
    res.status(200).json(note)

})

export const getNotesByLeadId = expressAsyncHandler(async (req: any, res: Response) => {

    const { id } = req.params

    const notes = await leadNoteService.getNotesByLeadId(Number(id))
    res.status(200).json(notes)

})

export const addNote = expressAsyncHandler(async (req: any, res: Response) => {

    const newNote = await leadNoteService.addNote(req.user.id, req.body)
    res.status(201).json(newNote)

})

export const updateNote = expressAsyncHandler(async (req: any, res: Response) => {

    const { content } = req.body
    const { id } = req.params

    const updatedNote = await leadNoteService.updateNote(Number(id), content)
    res.status(200).json(updatedNote)

})

export const deleteNote = expressAsyncHandler(async (req: any, res: Response) => {

    const { id } = req.params

    const deletedNote = await leadNoteService.deleteNote(Number(id))
    res.status(204).json(deletedNote)

})