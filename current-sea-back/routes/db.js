const mysql = require('mysql');
const debug = require('debug')('app:db');

const config = {
  host: 'currentsea-mysqldb.cewrfkrguurr.us-west-1.rds.amazonaws.com',
  user: 'admin',
  password: 'CurrentSea',
  port: 3306,
  database: 'currency_db',
};

function handleDisconnect() {
  const dbConnection = mysql.createConnection(config);
  dbConnection.connect((err) => {
    if (err) {
      console.log('Error when connecting to db:', err);
      setTimeout(handleDisconnect, 8000);
    } else {
      console.log('Connection established with MySQL DB');
    }
  });
  dbConnection.on('error', (err) => {
    console.log('Error occurred in MySQL DB connection', err);
    handleDisconnect();
  });

  return dbConnection;
}

const dbConnection = handleDisconnect();

module.exports = dbConnection;
