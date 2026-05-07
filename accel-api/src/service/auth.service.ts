import { eq } from "drizzle-orm";
import jwt from 'jsonwebtoken'

import db from "../db";
import { adminsTable, salesPersonsTable, tokensTable, usersTable } from "../schema/schema";
import ApiError from "../util/ApiError";
import { config } from "../config/config";
import { comparePassword, hashPassword } from "../util/password";

interface UserInfo {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

interface SignInPayload {
    email: string;
    password: string;
}

export async function signUp(userInfo: UserInfo) {

    try {

        const { email, password, firstName, lastName } = userInfo;

        const newUser = await db.transaction(async (tx) => {

            const existingUser = await tx.select().from(usersTable).where(eq(usersTable.email, email));

            if (existingUser.length > 0) {
                throw new ApiError("User with this email already exists", 400);
            }

            const hashedPassword = await hashPassword(password)

            const userAdd = await tx.insert(usersTable).values({ email, firstName, lastName, password: hashedPassword, status: 1 }).$returningId();

            const checkAdmins = await tx.select().from(adminsTable)
            if (checkAdmins.length == 0) {
                await tx.insert(adminsTable).values({ status: 1, userId: userAdd[0].id })
            }

            const salesPersonAdd = await tx.insert(salesPersonsTable).values({ status: 1, userId: userAdd[0].id })

            const newUser = await tx.select().from(usersTable).where(eq(usersTable.id, userAdd[0].id))
                .leftJoin(adminsTable, eq(usersTable.id, adminsTable.userId))
                .leftJoin(salesPersonsTable, eq(usersTable.id, salesPersonsTable.userId));

            return newUser[0]

        })

        const accessToken = jwt.sign(
            { userId: newUser.users.id },
            config.JWT_SECRET!,
            { expiresIn: '45m' }
        )

        const refreshToken = jwt.sign(
            { userId: newUser.users.id },
            config.JWT_SECRET!,
            { expiresIn: '1h' }
        )

        const decoded = jwt.decode(refreshToken) as { exp: number };

        await db.insert(tokensTable).values({ userId: newUser.users.id, token: refreshToken, expiresAt: new Date(decoded.exp * 1000), blacklisted: false })

        return { user: newUser, accessToken, refreshToken };

    } catch (error: any | ApiError) {

        throw new ApiError(error.message || "Failed to sign up user", 400);

    }

}

export async function signIn(signInPayload: SignInPayload) {

    try {

        const { email, password } = signInPayload;

        const checkUser = await db.select().from(usersTable).where(eq(usersTable.email, email))
            .leftJoin(adminsTable, eq(usersTable.id, adminsTable.userId))
            .leftJoin(salesPersonsTable, eq(usersTable.id, salesPersonsTable.userId));

        if (checkUser.length == 0) {
            throw new ApiError("No user found with this email", 404);
        }

        const checkPassword = await comparePassword(password, checkUser[0].users.password)

        if (!checkPassword) {
            throw new ApiError("Invalid Credentials", 400)
        }

        const accessToken = jwt.sign(
            { userId: checkUser[0].users.id },
            config.JWT_SECRET!,
            { expiresIn: '45m' }
        )

        const refreshToken = jwt.sign(
            { userId: checkUser[0].users.id },
            config.JWT_SECRET!,
            { expiresIn: '1h' }
        )

        const decoded = jwt.decode(refreshToken) as { exp: number };

        await db.insert(tokensTable).values({ userId: checkUser[0].users.id, token: refreshToken, expiresAt: new Date(decoded.exp * 1000), blacklisted: false })

        return { user: checkUser[0], accessToken, refreshToken };

    } catch (error: any | ApiError) {

        throw new ApiError(error.message || "Failed to sign up user", 400);

    }

}