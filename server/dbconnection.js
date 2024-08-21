import { config } from "dotenv";
import Db from "mysql2-async";

config();

// Create the connection to database
const configuration = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 100000,
};

const db = new Db(configuration);

export default db;
