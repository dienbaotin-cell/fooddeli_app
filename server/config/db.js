const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') }); // Load file .env đúng thư mục

const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: String(process.env.DB_PASS),
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  // Serverless-friendly settings
  max: 1, // Giới hạn connections cho serverless
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Không connect ngay - để lazy connection
if (process.env.NODE_ENV !== 'production') {
  pool.connect()
    .then(() => console.log("✅ Connected to Google Cloud SQL PostgreSQL!"))
    .catch(err => console.error("❌ Connection error:", err.message));
}

module.exports = pool;
