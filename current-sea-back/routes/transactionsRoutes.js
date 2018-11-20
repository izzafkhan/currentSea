const express = require('express');
const debug = require('debug')('app:transactionsRoutes');
const db = require('./db');

const transactionsRouter = express.Router();

module.exports = function router() {
  transactionsRouter.route('/add_transactions')
    .post((req, res) => {
      const {
        userId, accountId, date, eventId, debitAmt, creditAmt, currencyId,
      } = req.body;

      // tt_transaction_id should be able to auto_increment itself without user input
      db.query('INSERT INTO tt_transaction_table(',
        'tt_user_id, tt_account_id, tt_date, tt_event_id, ',
        'tt_debit_amount, tt_credit_amount, tt_currency_abv) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
        [userId, accountId, date, eventId, debitAmt, creditAmt, currencyId], (results) => {
          if (err) {
            throw err;
          }
          debug(results);
        });
    });

  transactionsRouter.route('/edit_transactions')
    .post((req, res) => {
      const {
        transactionId, userId, accountId, date, eventId, debitAmt, creditAmt, currencyId,
      } = req.body;
      db.query('SELECT * FROM tt_transaction_table WHERE tt_transaction_id = ?', [transactionId], (results) => {
        if (results.length === 0) {
          res.status(401).json({ message: 'Transaction id does not exist.' });
        } else {
          db.query('UPDATE tt_transaction_table SET ',
            'tt_user_id = ?, tt_account_id = ?, tt_date = ?, tt_event_id = ?, ',
            'tt_debit_amount = ?, tt_credit_amount = ?, tt_currency_abv = ? WHERE tt_transaction_id = ?;',
            [userId, accountId, date, eventId, debitAmt, creditAmt, currencyId, transactionId], (err) => {
              if (err) {
                throw err;
              }
              debug(results);
            });
        }
      });
    });

  transactionsRouter.route('/delete_transactions')
    .post((req, res) => {
      const { transactionId } = req.body;
      db.query('SELECT tt_transaction_id from transaction_table where tt_transaction_id = ?', [transactionId], (err, result) => {
        if (result.length === 0) {
          res.status(401).json({ message: 'Transaction id does not exist.' });
        } else {
          db.query('DELETE FROM tt_transaction_table WHERE tt_transaction_id = ?;',
            [transactionId], (results) => {
              if (err) {
                throw err;
              }
              debug(results);
            });
        }
      });
    });
  return transactionsRouter;
}

