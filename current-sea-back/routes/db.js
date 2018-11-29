const mysql = require('mysql');
const debug = require('debug')('app:db');

const config = {
  host: 'currentsea-mysqldb.cewrfkrguurr.us-west-1.rds.amazonaws.com',
  user: 'admin',
  password: 'CurrentSea',
  port: 3306,
  database: 'currency_db',
};

const dbConnection = mysql.createConnection(config);

dbConnection.connect((err) => {
  if (err) { debug('DATABASE NOT CONNECTED'); }
  debug('Connection established with MySQL');
});

module.exports = dbConnection;
