const express = require('express');
const chalk = require('chalk');
const mysql = require('mysql');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 4000;

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/static/'))); // Serve static files from static folder

const userAccountRouter = require('./routes/userAccountRoutes.js');
const bkAccountRouter = require('./routes/bkAccountRoutes.js');
const transactionsRouter = require('./routes/transactionsRoutes.js');
const eventRouter = require('./routes/eventRoutes.js');
const statementRouter = require('./routes/statementRoutes.js');
const favCurRouter = require('./routes/favCurRoutes.js');

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
