import { createPool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Create a connection pool to the MySQL database
// Ensure that the environment variables are set in a .env file

const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

export default pool;