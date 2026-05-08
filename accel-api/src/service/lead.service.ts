import { and, eq, like } from "drizzle-orm";
import db from "../db";
import { leadNotesTable, leadsTable, salesPersonsTable } from "../schema/schema";
import ApiError from "../util/ApiError";

interface leadPayload {
    name: string;
    companyName: string | undefined;
    email: string;
    phoneNumber: string;
    leadSource: string;
    status: "new" | "contacted" | "qualified" | "proposal sent" | "won" | "lost";
    estDealValue: string;
}

interface queryPayload {
    search: string; searchBy: string, source: string, status: "new" | "contacted" | "qualified" | "proposal sent" | "won" | "lost"
}

export async function getLeads(query: queryPayload) {

    try {

        const { search, searchBy, source, status } = query;

        const conditions = []

        if (status) {
            conditions.push(eq(leadsTable.status, status))
        }

        if (source) {
            conditions.push(eq(leadsTable.leadSource, source))
        }

        if (search && searchBy) {

            let searchColumn;

            switch (searchBy) {
                case 'name':
                    searchColumn = leadsTable.name;
                    break;
                case 'email':
                    searchColumn = leadsTable.email;
                    break;
                case 'company':
                    searchColumn = leadsTable.companyName;
                    break;
                default:
                    searchColumn = leadsTable.name;
            }

            conditions.push(like(searchColumn, `%${search}%`))

        }

        const leads = await db.select().from(leadsTable).where(conditions.length > 0 ? and(...conditions) : undefined)
        return leads;

    } catch (error: any | ApiError) {

        throw new ApiError(error.message || "Failed fetch leads", 500)

    }

}

export async function getLeadsOfSalesPerson(userId: number, query: queryPayload) {

    try {

        const { search, searchBy, source, status } = query;

        const salesPerson = await db.select().from(salesPersonsTable).where(eq(salesPersonsTable.userId, userId))

        if (!salesPerson[0] || salesPerson[0].status !== 1) {

            throw new ApiError('User is not authorized to perform this action', 403)

        }

        const conditions = []

        conditions.push(eq(leadsTable.salesPersonId, salesPerson[0].id))

        if (status) {
            conditions.push(eq(leadsTable.status, status))
        }

        if (source) {
            conditions.push(eq(leadsTable.leadSource, source))
        }

        if (search && searchBy) {

            let searchColumn;

            switch (searchBy) {
                case 'name':
                    searchColumn = leadsTable.name;
                    break;
                case 'email':
                    searchColumn = leadsTable.email;
                    break;
                case 'company':
                    searchColumn = leadsTable.companyName;
                    break;
                default:
                    searchColumn = leadsTable.name;
            }

            conditions.push(like(searchColumn, `%${search}%`))

        }

        const leads = await db.select().from(leadsTable).where(conditions.length > 0 ? and(...conditions) : undefined)
        return leads;

    } catch (error: any | ApiError) {

        throw new ApiError(error.message || "Failed fetch leads", 500)

    }

}

export async function getLeadById(id: number) {

    try {

        const lead = await db.select().from(leadsTable).where(eq(leadsTable.id, id))
            .leftJoin(leadNotesTable, eq(leadsTable.id, leadNotesTable.leadId))

        if (!lead[0]) {

            throw new ApiError(`No lead found with id: ${id}`, 404)

        }

        return lead[0]

    } catch (error: any | ApiError) {

        throw new ApiError(error.message || "Failed to add Lead", 500)

    }

}

export async function addLead(userId: number, leadPayload: leadPayload) {

    try {

        const { name, companyName, email, phoneNumber, leadSource, status, estDealValue } = leadPayload

        const salesPerson = await db.select().from(salesPersonsTable).where(eq(salesPersonsTable.userId, userId));

        if (salesPerson[0].status !== 1) {
            throw new ApiError("User is forbidden from performing this action", 403)
        }

        const newLead = db.insert(leadsTable).values({ name, companyName, email, phoneNumber, leadSource, status, estDealValue, salesPersonId: salesPerson[0].id })

        return newLead

    } catch (error: any | ApiError) {

        throw new ApiError(error.message || "Failed to add Lead", 500)

    }

}

export async function updateLead(leadId: number, leadPayload: leadPayload) {

    try {

        const { name, companyName, email, phoneNumber, leadSource, status, estDealValue } = leadPayload

        const checkLead = await db.select().from(leadsTable).where(eq(leadsTable.id, leadId))

        if (!checkLead[0]) {

            throw new ApiError(`No lead found with id: ${leadId}`, 404)

        }

        const update = await db.update(leadsTable).set({ name, companyName, email, phoneNumber, leadSource, status, estDealValue }).where(eq(leadsTable.id, leadId))

        return update

    } catch (error: any | ApiError) {

        throw new ApiError(error.message || "Failed to add Lead", 500)

    }

}

export async function deleteLead(leadId: number) {

    try {

        const checkLead = await db.select().from(leadsTable).where(eq(leadsTable.id, leadId))

        if (!checkLead[0]) {
            throw new ApiError(`No lead found with id: ${leadId}`, 404)
        }

        const deleteLead = await db.delete(leadsTable).where(eq(leadsTable.id, leadId))

        return deleteLead

    } catch (error: any | ApiError) {

        throw new ApiError(error.message || "Failed to add Lead", 500)

    }

}