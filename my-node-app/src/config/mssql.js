
// // src/config/mssql.js
// const sql = require("mssql");

// const config = {
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   server: process.env.DB_SERVER,      // localhost
//   database: process.env.DB_DATABASE,
//   port: 1433,                         // ép port
//   options: {
//     encrypt: false,
//     trustServerCertificate: true,
//   },
// };

// let pool;

// async function connectDB() {
//   if (!pool) {
//     pool = await sql.connect(config);
//     console.log("✅ Kết nối SQL Server thành công!");
//   }
//   return pool;
// }
// console.log("DB_SERVER =", process.env.DB_SERVER);
// console.log("DB_USER =", process.env.DB_USER);
// module.exports = { sql, connectDB };

// src/config/mssql.js
const sql = require("mssql");

const serverName = process.env.DB_INSTANCE
  ? `${process.env.DB_SERVER}\\${process.env.DB_INSTANCE}`
  : process.env.DB_SERVER;

console.log("🔌 SQL Server =", serverName);

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: serverName,              // localhost\SQLEXPRESS01
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let pool;

async function connectDB() {
  if (!pool) {
    pool = await sql.connect(config);
    console.log("✅ Kết nối SQL Server thành công!");
  }
  return pool;
}

module.exports = { sql, connectDB };