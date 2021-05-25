const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
<<<<<<< HEAD
  port: '3306'
=======
  port: '3306',
  multipleStatements: true
>>>>>>> 89891abb5a035bb2dce882d03e9f5de97c55c991
});

module.exports = connection;