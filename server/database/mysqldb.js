import mysql2 from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql2.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE_NAME,
}).promise();

export async function getUsers() {
    return await pool.query("SELECT * FROM users;");
}

export async function checkUser(username, password) {
    return await pool.query("SELECT COUNT(*) FROM users WHERE username = ? AND password = ?", [username, password]);
}

