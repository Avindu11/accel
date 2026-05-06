import mysql from 'mysql2/promise'
import { drizzle } from 'drizzle-orm/mysql2'
import { config } from '../config/config'

async function main() {

    const connection = await mysql.createConnection(`mysql://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}:${config.DB_PORT}/mysql`)
    connection.query(`CREATE DATABASE IF NOT EXISTS ${config.DB_NAME}`)
    connection.end()

}

main()