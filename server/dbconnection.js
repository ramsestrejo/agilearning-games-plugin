import { config } from 'dotenv';
import Db from 'mysql2-async';

config();

// Create the connection to database
const configuration = {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'agilearning-api',
}
if (process.env.DATABASE_SOCKET) {
    configuration.socketPath = process.env.DATABASE_SOCKET
} else {
    configuration.host = process.env.DB_HOST
}

const db = new Db(configuration)

export default db