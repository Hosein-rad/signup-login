// import mysql from "mysql2/promise";

// const pool = mysql.createPool({
//   host: process.env.DB_HOST || "localhost",
//   user: process.env.DB_USER || "root",
//   password: process.env.DB_PASSWORD || "",
//   database: process.env.DB_NAME || "signinup",
//   waitForConnections: true,
//   connectionLimit: 10,
// });

// export default pool;

import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  ssl: {
    ca: process.env.DB_SSL_CA, // a string containing the certificate
  },
});

export default pool;
