import { createPool } from 'mysql2/promise'
import 'dotenv/config'

export const pool = createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'shopdb'
})