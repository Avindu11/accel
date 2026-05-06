import { config } from '../config/config'
import { drizzle } from 'drizzle-orm/mysql2'

const db = drizzle(config.DB_URL!)

export default db