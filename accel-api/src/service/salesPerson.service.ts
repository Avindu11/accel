import { eq } from "drizzle-orm";
import db from "../db";
import { salesPersonsTable, usersTable } from "../schema/schema";
import ApiError from "../util/ApiError";

export async function getAllSalesPersons() {

    try {
        
        const salesPersons = await db.select().from(salesPersonsTable)
            .leftJoin(usersTable, eq(salesPersonsTable.userId, usersTable.id))

        if (salesPersons.length <= 0) {
            throw new ApiError("No sales persons found", 404)
        }

        return salesPersons

    } catch (error: any | ApiError) {
        
        throw new ApiError(error.message || "Failed to fetch sales persons", 500)

    }

}