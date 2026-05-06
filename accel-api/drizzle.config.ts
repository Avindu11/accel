import { defineConfig } from 'drizzle-kit'
import { config } from './src/config/config'

export default defineConfig({
    out: './drizzle',
    schema: './src/schema/schema.ts',
    dialect: 'mysql',
    dbCredentials: {
        url: config.DB_URL!
    }
})