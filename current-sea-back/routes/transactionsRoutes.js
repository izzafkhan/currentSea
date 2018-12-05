const express = require('express');
const debug = require('debug')('app:transactionsRoutes');
const db = require('./db');

const transactionsRouter = express.Router();

module.exports = function router() {
  transactionsRouter.route('/get_transactions')
    .get((req, res) => {
      if (req.user) {
        db.query('SELECT * FROM transaction_table WHERE tt_user_id = ?', [req.user.username],
          (err, results) => {
            if (err) {
              debug('Error occurred in /get_transactions', err);
              res.status(500).json({ message: 'Error occurred getting transactions' });
            } else {
              res.status(200).json(results);
            }
          });
      } else {
        res.status(401).json({ message: 'User is not logged in' });
      }
    });

  transactionsRouter.route('/add_transactions')
    .post((req, res) => {
      if (req.user) {
        const {
          startDate, currencyId, description, balance, internalEntries,
        } = req.body;

        db.query('INSERT INTO transaction_table (tt_user_id, tt_date, tt_currency, tt_balance, tt_description) VALUES (?,?,?,?,?)',
          [req.user.username, startDate, currencyId, balance, description],
          (err, results) => {
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
                (err2) => {
                  if (err2) {
                    debug('Error occurred in /add_transactions', err2);
                    res.status(500).json({ message: 'Error occurred adding a transaction' });
                  } else {
                    res.status(201).json({ message: 'Transaction inserted' });
                  }
                });
            }
          });
      } else {
        res.status(401).json({ message: 'User is not logged in' });
      }
    });

  transactionsRouter.route('/get_details')
    .post((req, res) => {
      if (req.user) {
        debug(req.body);
        const { tt_transaction_id } = req.body;
        db.query('SELECT * FROM details_table WHERE dt_transactionID = ? AND dt_userID = ?',
          [tt_transaction_id, req.user.username], (err, results, fields) => {
            if (err) {
              debug('Error in /get_details', err);
              res.status(500).json({ message: 'Error has occurred while getting details' });
            } else {
              res.status(200).json(results);
            }
          });
      }
    });

  transactionsRouter.route('/edit_transactions')
    .post((req, res) => {
      const { balance } = req.body;
      var dt_transactionID, dt_accountID, dt_eventID, dt_debit, dt_credit;
      if (req.body.data && req.body.data.length > 0) {
        dt_transactionID = req.body.data[0].dt_transactionID;
        dt_accountID = req.body.data[0].dt_accountID;
        dt_eventID = req.body.data[0].dt_eventID;
        dt_debit = req.body.data[0].dt_debit;
        dt_credit = req.body.data[0].dt_credit;
      }
      db.query('SELECT * FROM transaction_table WHERE tt_transaction_id = ?', [dt_transactionID], (err, results, fields) => {
        if (results.length === 0) {
          res.status(401).json({ message: 'Transaction id does not exist.' });
        } else {
          //change this to UPDATE transaction_table SET tt_currency = ?
          db.query('UPDATE transaction_table SET tt_balance=? WHERE tt_transaction_id = ? and tt_user_id = ?;',
            [balance, dt_transactionID, req.user.username],
            (err, results, fields) => {
              if (err) {
                debug('An Error occurred while editing a transaction from transactions table', err);
                res.status(500).json({ message: 'Error occurred editing a transaction' });
              } else {
                db.query('UPDATE details_table SET dt_eventID = ?, dt_accountID = ?, dt_debit = ?, dt_credit = ? WHERE dt_transactionID = ?;',
                  [dt_eventID, dt_accountID, dt_debit, dt_credit, dt_transactionID],
                  (err, results, fields) => {
                    if (err) {
                      debug('An Error occurred while editing a transaction_detail in the details table', err);
                      res.status(500).json({ message: 'Error occurred editing a transaction_detail' });
                    } else {
                      res.status(201).json({ message: 'Transaction detail edited successfully' });
                    }
                  });
              }
            });
        }
      });
    });

  transactionsRouter.route('/delete_transactions')
    .post((req, res) => {
      if (req.user) {
        debug(req.body);
        const { tt_transaction_id } = req.body;
        db.query('SELECT tt_transaction_id from transaction_table where tt_transaction_id = ?',
          [tt_transaction_id], (err, result, fields) => {
            if (result.length === 0) {
              res.status(401).json({ message: 'Transaction id does not exist.' });
            } else {
              // Also deletes in details_table as foreign key and ON DELETE CASCADE is implemented
              db.query('DELETE FROM transaction_table WHERE tt_transaction_id = ? AND tt_user_id = ?',
                [tt_transaction_id, req.user.username], (err, results, fields) => {
                  if (err) {
                    debug('An Error occurred while deleting  a transaction from transactions table', err);
                    res.status(500).json({ message: 'Error occurred deleting a transaction' });
                  } else {
                    res.status(200).json({ message: 'Transaction deleted succsessfully' });
                  }
                });
            }
          });
      } else {
        res.status(401).json({ message: 'User is not logged in' });
      }
    });
  return transactionsRouter;
};
