import { and, eq, like } from "drizzle-orm";
import db from "../db";
import { leadsTable, salesPersonsTable } from "../schema/schema";
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

export async function getLeads(query:queryPayload) {

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