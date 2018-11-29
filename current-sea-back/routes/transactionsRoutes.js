const express = require('express');
const debug = require('debug')('app:transactionsRoutes');
const db = require('./db');

const transactionsRouter = express.Router();

module.exports = function router() {
  /*transactionsRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.status(401).json({ message: 'User is not logged in' });
    }
  });*/

  transactionsRouter.route('/get_transactions')
    .get((req, res) => {
      db.query('SELECT * FROM transaction_table WHERE tt_user_id=?', [req.user.username], (err, results, fields) => {
        if (err) {
          debug('Error occurred while getting the transactions from the transactions table', err);
          res.status(500).json({ message: 'Internal SQL server error' });
        } else {
          res.status(200).json(results);
        }
      });
    });

  transactionsRouter.route('/add_transactions')
    .post((req, res) => {
            debug(req.body, req.user);

            res.status(200).send('Good');

      // tt_transaction_id should be able to auto_increment itself without user input
      /*db.query('INSERT INTO transaction_table(tt_user_id, tt_account_id, tt_date, tt_event_id,tt_debit_amount, tt_credit_amount, tt_currency_abv_changed) VALUES (?, ?, ?, ?, ?, ?, ?);',
        [req.user.username, accountId, date, eventId, debitAmt, creditAmt, currencyId],
        (err, results) => {
          if (err) {
            debug('An Error occurred while adding a transaction from transactions table', err);
            res.status(500).json({ message: 'Error occurred adding a transaction' });
          } else {
            res.status(201).json({ transactionID: results.insertId });
          }
        });*/
    });

  transactionsRouter.route('/edit_transactions')
    .post((req, res) => {
      const {
        transactionId, accountId, date, eventId, debitAmt, creditAmt, currencyId,
      } = req.body;
      db.query('SELECT * FROM transaction_table WHERE tt_transaction_id = ?', [transactionId], (err, results, fields) => {
        if (results.length === 0) {
          res.status(401).json({ message: 'Transaction id does not exist.' });
        } else {
          db.query('UPDATE transaction_table SET tt_user_id = ?, tt_account_id = ?, tt_date = ?, tt_event_id = ?, tt_debit_amount = ?, tt_credit_amount = ?, tt_currency_abv_changed = ? WHERE tt_transaction_id = ?;',
            [req.user.username, accountId, date, eventId, debitAmt, creditAmt, currencyId, transactionId],
            (err, results, fields) => {
              if (err) {
                debug('An Error occurred while editing a transaction from transactions table', err);
                res.status(500).json({ message: 'Error occurred editing a transaction' });
              } else {
                res.status(200).json({ message: 'Transaction edited successfully' });
              }
            });
        }
      });
    });

  transactionsRouter.route('/delete_transactions')
    .post((req, res) => {
      const { transactionId } = req.body;
      db.query('SELECT tt_transaction_id from transaction_table where tt_transaction_id = ?',
        [transactionId], (err, result, fields) => {
          if (result.length === 0) {
            res.status(401).json({ message: 'Transaction id does not exist.' });
          } else {
            db.query('DELETE FROM transaction_table WHERE tt_transaction_id = ? AND tt_user_id = ?',
              [transactionId, req.user.username], (err, results, fields) => {
                if (err) {
                  debug('An Error occurred while deleting  a transaction from transactions table', err);
                  res.status(500).json({ message: 'Error occurred deleting a transaction' });
                } else {
                  res.status(200).json({ message: 'Transaction deleted succsessfully' });
                }
              });
          }
        });
    });
  return transactionsRouter;
};
