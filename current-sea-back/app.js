const express = require('express');
const chalk = require('chalk');
const mysql = require('mysql');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT;

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/static/'))); // Serve static files from static folder

const userAccountRouter = require('./src/routes/userAccountRoutes.js');
const bkAccountRouter = require('./src/routes/bkAccountRoutes.js');
const transactionsRouter = require('./src/routes/transactionsRoutes.js');
const eventRouter = require('./src/routes/eventRoutes.js');
const statementRouter = require('./src/routes/statementRoutes.js');
const favCurRouter = require('./src/routes/favCurRoutes.js');

app.use('/user', userAccountRouter);
app.use('/bookkeeping', bkAccountRouter);
app.use('/transactions', transactionsRouter);
app.use('/event', eventRouter);
app.use('/statement', statementRouter);
app.use('/favcur', favCurRouter);

app.get('/', (req, res) => {
  res.send('Test message');
});

// Database configuration DO NOT MODIFY!
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
  debug('Connection established with MySQL');
});

app.listen(port, () => {
  debug(`Listening on port ${chalk.green(port)}`);
});
