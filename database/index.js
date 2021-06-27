const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// Local Dev Config
const connection = mysql.createConnection({
  host: process.env.LOCAL_DB_HOST,
  user: process.env.LOCAL_DB_USER,
  password: process.env.LOCAL_DB_PASS,
  database: process.env.LOCAL_DB_DATABASE,
  port: '3306',
  multipleStatements: true
});

// Standard Deploy Config
/*
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port: '3306',
  multipleStatements: true
});
*/

// Docker config
/*
const connection = mysql.createConnection({
  host: process.env.DOCKER_PROD_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port: '3306',
  multipleStatements: true
});
*/


module.exports = connection;