import db from "."
import { adminsTable, salesPersonsTable, usersTable } from "../schema/schema"


async function main() {

    console.log('------ SEEDING DB ------')

    try {
        
        console.log('>>>>>> Clearing old data')

        await db.delete(adminsTable)
        await db.delete(salesPersonsTable)
        await db.delete(usersTable)

        console.log('>>>>>>> Inserting Demo Users')

        const [userResult] = await db.insert(usersTable).values({
            email: 'demo@admin.com',
            firstName: 'admin',
            lastName: 'admin',
            password: '$2b$10$PCGxVYSNh.G2ZzXH7hB8E.Oq3N8GNTbFSXxLjFnQdr8FGT7uLGEmG',
            status: 1
        }).$returningId()

        const userId = userResult.id

        const [salesPersonResult] = await db.insert(salesPersonsTable).values({
            userId,
            status: 1
        })

        const [adminResult] = await db.insert(adminsTable).values({
            userId,
            status: 1
        })

        console.log('------ SEEDING COMPLETE ------')

    } catch (error) {

        console.error(">>>>>> Error while seeding", error)
        process.exit(1)
        
    } finally {

        process.exit(0)

    }

}

main()