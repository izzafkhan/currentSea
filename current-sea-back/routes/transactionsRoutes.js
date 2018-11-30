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
  }); */

  transactionsRouter.route('/get_transactions')
    .get((req, res) => {

    });

  transactionsRouter.route('/add_transactions')
    .post((req, res) => {
      if (req.user) {
        const {
          startDate, currencyId, description, balance, internalEntries,
        } = req.body;

        db.query('INSERT INTO transaction_table (tt_user_id, tt_date, tt_currency, tt_balance, tt_description) VALUES (?,?,?,?,?)',
          [req.user.username, startDate, currencyId, balance, description],
          (err, results, fields) => {
            if (err) {
              debug('Error occurred in /add_transactions', err);
              res.status(500).json({ message: 'Error occurred adding a transaction' });
            } else {
              const transactionID = results.insertId;
              let query = '';
              for (let i = 0; i < internalEntries.length; i += 1) {
                const { account, debit, credit, event } = internalEntries[i];
                if (i === 0) {
                  query += `("${transactionID}", "${req.user.username}", "${account}", "${event}", ${debit}, ${credit})`;
                } else {
                  query += `, ("${transactionID}", "${req.user.username}", "${account}", "${event}", ${debit}, ${credit})`;
                }
              }
              debug(query);
              db.query('INSERT INTO details_table (dt_transactionID, dt_userID, dt_accountID, dt_eventID, dt_debit, dt_credit) VALUES ' + query,
                (err2, results2, fields2) => {
                  if (err2) {
                    debug('Error occurred in /add_transactions', err2);
                    res.status(500).json({ message: 'Error occurred adding a transaction' });
                  } else {
                    debug(results2);
                  }
                });
              res.status(201).json({ message: 'Transaction inserted' });
            }
          });
      } else {
        res.status(401).json({ message: 'User is not logged in' });
      }
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
