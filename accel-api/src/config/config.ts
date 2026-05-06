import dotenv from 'dotenv';

dotenv.config({
    path: `.env.${process.env.NODE_ENV || 'dev'}`
});

export const config = {

    PORT: process.env.PORT || 4500,
    JWT_SECRET: process.env.JWT_SECRET || null,
    DB_URL: process.env.DATABASE_URL || null,
    DB_USER: process.env.DB_USER || null,
    DB_PASSWORD: process.env.DB_PASSWORD || null,
    DB_HOST: process.env.DB_HOST || null,
    DB_PORT: process.env.DB_PORT || null,
    DB_NAME: process.env.DB_NAME || null

}