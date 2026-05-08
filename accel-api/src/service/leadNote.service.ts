import { eq } from "drizzle-orm";
import db from "../db";
import { leadNotesTable, leadsTable, usersTable } from "../schema/schema";
import ApiError from "../util/ApiError";

interface NotePayload {
    leadId: number;
    content: string;
}

export async function getNotesById(id: number) {

    try {

        const note = await db.select().from(leadNotesTable).where(eq(leadNotesTable.id, id))

        if (!note[0]) {
            throw new ApiError(`No notes found with id: ${id}`, 404)
        }

        return note

    } catch (error: any | ApiError) {

        throw new ApiError(error.message || "Failed fetch Note", 500)

    }

}

export async function getNotesByLeadId(leadId: number) {

    try {

        const notes = await db.select().from(leadNotesTable).where(eq(leadNotesTable.leadId, leadId))
            .rightJoin(usersTable, eq(leadNotesTable.addedBy, usersTable.id))

        if (!notes[0]?.lead_notes) {
            throw new ApiError("No notes found", 404)
        }

        return notes

    } catch (error: any | ApiError) {

        throw new ApiError(error.message || "Failed fetch Notes", 500)

    }

}

export async function addNote(addedBy: number, notePayload: NotePayload) {

    try {

        const { leadId, content } = notePayload

        const newNote = await db.insert(leadNotesTable).values({ leadId, content, addedBy })

        return newNote

    } catch (error: any | ApiError) {

        throw new ApiError("Failed to add Note", 500)

    }

}

export async function updateNote(noteId: number, content: string) {

    try {

        const checkNote = await db.select().from(leadNotesTable).where(eq(leadNotesTable.id, noteId))

        if (!checkNote[0]) {
            throw new ApiError(`No notes found with id ${noteId}`, 404)
        }

        const updatedNote = await db.update(leadNotesTable).set({ content }).where(eq(leadNotesTable.id, noteId))

        return updatedNote

    } catch (error: any | ApiError) {

        throw new ApiError("Failed to update Note", 500)

    }

}

export async function deleteNote(noteId: number) {

    try {

        const checkNote = await db.select().from(leadNotesTable).where(eq(leadNotesTable.id, noteId))

        if (!checkNote[0]) {
            throw new ApiError(`No notes found with id ${noteId}`, 404)
        }

        const deleteRes = await db.delete(leadNotesTable).where(eq(leadNotesTable.id, noteId))

        return deleteRes

    } catch (error: any | ApiError) {

        throw new ApiError("Failed to delete Note", 500)

    }

}