const express = require('express');
const debug = require('debug')('app:transactionsRoutes');
const db = require('./db');

const transactionsRouter = express.Router();

module.exports = function router() {
  transactionsRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.status(401).json({ message: 'User does not appear to exist' });
    }
  });

  transactionsRouter.route('/add_transactions')
    .post((req, res) => {
      debug(req.user);
      const {
        accountId, date, eventId, debitAmt, creditAmt, currencyId,
      } = req.body;

      // tt_transaction_id should be able to auto_increment itself without user input
      db.query('INSERT INTO transaction_table(tt_user_id, tt_account_id, tt_date, tt_event_id,tt_debit_amount, tt_credit_amount, tt_currency_abv_changed) VALUES (?, ?, ?, ?, ?, ?, ?);',
        [req.user.username, accountId, date, eventId, debitAmt, creditAmt, currencyId],
        (err, results) => {
          if (err) {
            throw err;
          }
          debug(results);
          res.status(201).json({ message: 'Transaction created' });
        });
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
                throw err;
              }
              res.status(200).json({ message: 'Transaction edited successfully' });
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
            db.query('DELETE FROM transaction_table WHERE tt_transaction_id = ?;',
              [transactionId], (err, results, fields) => {
                if (err) {
                  throw err;
                }
                res.status(200).json({ message: 'Transaction deleted succsessfully' });
              });
          }
        });
    });
  return transactionsRouter;
};
