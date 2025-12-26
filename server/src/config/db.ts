import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// ---- ENV SAFETY CHECKS  ----
const {
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_PORT,
} = process.env;

if (!DB_HOST || !DB_USER || !DB_NAME) {
  throw new Error("❌ Missing required database environment variables");
}

// ---- CREATE POOL ----
const db = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  port: DB_PORT ? Number(DB_PORT) : 3306, 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ---- TEST CONNECTION ON STARTUP ----
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ MySQL Database connected successfully");
    connection.release();
  } catch (error) {
    console.error("❌ Failed to connect to MySQL database:", error);
    process.exit(1); 
  }
})();

export default db;
