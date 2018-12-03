const express = require('express');
const debug = require('debug')('app:statementRoutes');
const db = require('./db');

const statementRouter = express.Router();

module.exports = function router() {

  //Statement Flows
  statementRouter.route('/balance')
    .get((req, res) => {
      if (req.user) {
        const { dateFrom, dateTo } = req.body;
        db.query('SELECT * FROM transaction_table where tt_user_id = ? AND tt_date >= ? AND tt_date <= ? GROUP BY tt_transaction_id',
          [req.user.username, dateFrom, dateTo],
          (err, results1) => {
            if (err) {
              debug(err);
              res.status(500).json({ message: 'An error has occurred when getting transactions from transaction_table' });
            } else {
              const transactionID = results1.transaction_id;
              db.query('SELECT * FROM detail_table AND account_table WHERE at_user_id = ? AND dt_user_id = ? AND dt_transaction_id = ?' 
              + 'GROUP BY at_account_id HAVING dt_debit = SUM(dt_debit) AND dt_credit = SUM(dt_credit)',
              [req.user.username, req.user.username, transactionID],
              (err, results2) => {
                if (err) {
                  debug(err);
                  res.status(500).json({ message: 'An error has occurred when getting transactions from detail_table' });
                } else {
                  const accountID = results2.account_id;
                  const accountName = results2.accout_name;
                  const output = {};
                  for (let i = 0; i < accountID.length; i += 1) {
                    if  (accountID[i].credit) {
                      output.i = {account_id: accountID[i], account_name: accountName, 
                        start_amount: 0, change_amount: accountID[i].credit, end_amount: (start_amount - change-amount)};                 
                    }
                    res.status(200).json(output); 
                  }
                }
              });
            }
          });
      } else {
        res.status(401).json({ message: 'User not logged in' });
      }
    });


  statementRouter.route('/statement')
    .get((req, res) => {
      if (req.user) {
        const { dateFrom, dateTo } = req.body;
        db.query('SELECT * FROM transaction_table where tt_user_id = ? AND tt_date >= ? AND tt_date <= ? GROUP BY tt_transaction_id',
          [req.user.username, dateFrom, dateTo],
          (err, results1) => {
            if (err) {
              debug(err);
              res.status(500).json({ message: 'An error has occurred when getting transactions from transaction_table' });
            } else {
              const transactionID = results1.transaction_id;
              db.query('SELECT * FROM detail_table AND account_table WHERE at_user_id = ? AND dt_user_id = ? AND dt_transaction_id = ?' 
              + 'GROUP BY at_account_id HAVING dt_debit = SUM(dt_debit) AND dt_credit = SUM(dt_credit)',
              [req.user.username, req.user.username, transactionID],
              (err, results2) => {
                if (err) {
                  debug(err);
                  res.status(500).json({ message: 'An error has occurred when getting transactions from detail_table' });
                } else {
                  const accountID = results2.account_id;
                  const accountName = results2.accout_name;
                  const output = {};
                  for (let i = 0; i < accountID.length; i += 1) {
                    if  (accountID[i].debit) {
                      output.i = {account_id: accountID[i], account_name: accountName, 
                        change_amount: accountID[i].credit };                 
                    }
                    res.status(200).json(output); 
                  }
                }
              });
            }
          });
      } else {
        res.status(401).json({ message: 'User not logged in' });
      }
    });

  return statementRouter;
};
