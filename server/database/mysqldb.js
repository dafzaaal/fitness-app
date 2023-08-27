import mysql2 from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql2.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE_NAME,
}).promise();    

export async function getUsers(email) {
    return await pool.query("SELECT email FROM users WHERE username = ?;", [username]);
}

export async function checkEmail(email) {
    return await pool.query("SELECT COUNT(*) AS count FROM users WHERE email = ?", [email]);
}

export async function checkUser(username, password) {
    return await pool.query("SELECT COUNT(*) AS count FROM users WHERE username = ? AND password = ?", [username, password]);
}

export async function insertUser(name, username, password, email) {
    return await pool.query("INSERT INTO users (name, username, password, email) VALUES (?, ?, ?, ?)", [name, username, password, email]);
}

