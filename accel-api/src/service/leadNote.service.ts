import { eq } from "drizzle-orm";
import db from "../db";
import { leadNotesTable, usersTable } from "../schema/schema";
import ApiError from "../util/ApiError";

interface NotePayload {
    leadId: number;
    content: string;
}

export async function getNotesByLeadId(leadId: number) {

    try {

        const notes = await db.select().from(leadNotesTable).where(eq(leadNotesTable.leadId, leadId))
            .leftJoin(usersTable, eq(leadNotesTable.addedBy, usersTable.id))

        if (!notes[0]) {
            throw new ApiError("No notes found", 404)
        }

        return notes

    } catch (error: any | ApiError) {

        throw new ApiError("Failed to add Note", 500)

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