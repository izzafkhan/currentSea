const express = require('express');
const mysql = require('mysql');

const app = express();

const config = {
  host: 'currentsea-mysqldb.cewrfkrguurr.us-west-1.rds.amazonaws.com',
  user: 'admin',
  password: 'CurrentSea',
  port: 3306,
  database: 'currency_db',
};

const dbConnection = mysql.createConnection(config);

dbConnection.connect((err) => {
  if (err) { throw err; }
  console.log('Connection established');
});
