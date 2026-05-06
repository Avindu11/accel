import { decimal, varchar } from "drizzle-orm/mysql-core";
import { text } from "drizzle-orm/mysql-core";
import { datetime } from "drizzle-orm/mysql-core";
import { boolean } from "drizzle-orm/mysql-core";
import { mysqlEnum } from "drizzle-orm/mysql-core";
import { int } from "drizzle-orm/mysql-core";
import { mysqlTable } from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("users", {
    id: int("id").primaryKey().autoincrement(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    firstName: varchar("first_name", { length: 255 }).notNull(),
    lastName: varchar("last_name", { length: 255 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    status: int("status").notNull(),
})

export const tokensTable = mysqlTable("tokens", {
    id: int("id").primaryKey().autoincrement(),
    userId: int("user_id").notNull().references(() => usersTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade'
    }),
    token: text("token").notNull(),
    expiresAt: datetime("expires_at").notNull(),
    blacklisted: boolean("blacklisted").notNull(),
})

export const salesPersonsTable = mysqlTable("sales_person", {
    id: int("id").primaryKey().autoincrement(),
    userId: int("user_id").notNull().references(() => usersTable.id),
    status: int("status").notNull(),
})

export const adminsTable = mysqlTable("admin", {
    id: int("id").primaryKey().autoincrement(),
    userId: int("user_id").notNull().references(() => usersTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade'
    }),
    status: int("status").notNull(),
})

export const leadsTable = mysqlTable("leads", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }).notNull(),
    companyName: varchar("company_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phoneNumber: varchar("phone_number", { length: 255 }).notNull(),
    salesPersonId: int("sales_person_id").notNull().references(() => salesPersonsTable.id),
    status: mysqlEnum("status", ["new", "contacted", "qualified", "proposal sent", "won", "lost"]).notNull(),
    estDealValue: decimal("est_deal_value", { precision: 10, scale: 2 }).notNull(),
})

export const leadNotesTable = mysqlTable("lead_notes", {
    id: int("id").primaryKey().autoincrement(),
    leadId: int("lead_id").notNull().references(() => leadsTable.id),
    content: text("content").notNull(),
    addedBy: int("added_by").notNull().references(() => usersTable.id),
})