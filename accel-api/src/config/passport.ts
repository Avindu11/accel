import passport from 'passport'
import passportJWT from 'passport-jwt'
import { config } from './config'
import db from '../db'
import { adminsTable, salesPersonsTable, usersTable } from '../schema/schema'
import { eq } from 'drizzle-orm'

const options = {
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET!
}

passport.use(
    new passportJWT.Strategy(options, async (payload, done) => {
        try {

            const user = await db
                .select()
                .from(usersTable)
                .where(eq(usersTable.id, payload.userId))
                .leftJoin(adminsTable, eq(adminsTable.userId, usersTable.id))
                .leftJoin(salesPersonsTable, eq(salesPersonsTable.userId, usersTable.id));

            if (!user.length) return done(null, false);

            const roles: string[] = [];

            if (user[0].admin) roles.push('admin');
            if (user[0].sales_person) roles.push('sales_person');

            return done(null, {
                id: user[0].users.id,
                roles
            });

        } catch (error) {
            return done(error);
        }
    })
);

export default passport