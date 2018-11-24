const express = require('express');
const debug = require('debug')('app:transactionsRoutes');
const db = require('./db');

const transactionsRouter = express.Router();

module.exports = function router() {

  transactionsRouter.route('/add_transactions')
    .post((req, res) => {
      if (req.user) {
        const {
          userId, accountId, date, eventId, debitAmt, creditAmt, currencyId,
        } = req.body;

        // tt_transaction_id should be able to auto_increment itself without user input
        db.query('INSERT INTO tt_transaction_table(',
          'tt_user_id, tt_account_id, tt_date, tt_event_id, ',
          'tt_debit_amount, tt_credit_amount, tt_currency_abv) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
          [userId, accountId, date, eventId, debitAmt, creditAmt, currencyId], (results, err) => {
            if (err) {
              throw err;
            }
            debug(results);
          });
      } else {
        res.status(401).json({ message: 'User is not logged in' });

      };

      transactionsRouter.route('/edit_transactions')
        .put((req, res) => {
          if (req.user) {
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
          } else {
            res.status(401).json({ message: 'User is not logged in' });
          }
        });

      transactionsRouter.route('/delete_transactions')
        .delete((req, res) => {
          if (req.user) {
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
          } else {
            res.status(401).json({ message: 'User is not logged in' });

          }
        });
      return transactionsRouter;
    }

