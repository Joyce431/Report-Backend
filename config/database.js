const { Sequelize } = require("sequelize");
const mysql = require("mysql2/promise");

const DB_NAME = "report_system";
const DB_USER = "root";
const DB_PASSWORD = "joyce1";
const DB_HOST = "localhost";

(async () => {
  try {
    // Connect to MySQL without specifying database
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
    });

    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    console.log(`✅ Database "${DB_NAME}" is ready`);
    await connection.end();
  } catch (err) {
    console.error("❌ Error creating database:", err);
  }
})();

// Create Sequelize instance
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
