const mysql = require("mysql");

const dotenv = require("dotenv");

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DATA_HOST,
  user: process.env.DATA_USER,
  password: process.env.DATA_PASS,
  database: process.env.DATA_BASE
});

module.exports = connection;
