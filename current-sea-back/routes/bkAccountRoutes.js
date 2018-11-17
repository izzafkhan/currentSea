const express = require('express');
const debug = require('debug')('app:bkAccountsRoutes');
const db = require('./db');

const bkAccountRouter = express.Router();

module.exports = function router() {
  bkAccountRouter.route('/add_account')
    .post((req, res) => {
      const {
        userId, accountName, accountId,
      } = req.body;
      db.query('SELECT at_account_name from account_table where at_user_id = ? and at_account_name = ? and at_account_id = ?', [userId, accountName, accountId], (err, result) => {
        if (result.length === 0) {
          if (accountId === '' || accountName === '') {
            res.status(401).json({ message: 'Please fill in the blank spaces of the parameters.' });
          } else {
            db.query('INSERT INTO account_table(at_account_name, at_account_id, at_user_id) VALUES (?, ?, ?);', [accountName, accountId, userId], (results) => {
              if (err) {
                throw err;
              }
              debug(results);
            });
          }
        } else {
          res.status(401).json({ message: 'Account already exists.' });
        }
      });
    });

  bkAccountRouter.route('/edit_account')
    .post((req, res) => {
      const { userId, accountId, accountName, newAccountId, newAccountName } = req.body;
      db.query('SELECT account_name from account_table where at_user_id = ? AND at_account_name = ? AND at_account_id = ?', [userId, accountName, accountId], (err, results) => {
        if (results.length !== 0) {
          if (newAccountId !== accountId || newAccountName !== accountName) {
            if (newAccountId !== accountId) {
              db.query(('UPDATE account_table SET at_account_id = ? WHERE at_user_id = ? AND at_account_id = ?', [newAccountId, userId, accountId], () => {
                if (err) {
                  throw err;
                }
                debug(results);
              }));
            }
            if (newAccountName !== accountName) {
              db.query(('UPDATE account_table SET at_account_name = ? WHERE at_user_id = ? AND at_account_name = ?', [newAccountName, userId, accountName], () => {
                if (err) {
                  throw err;
                }
                debug(results);
              }));
            }
          } else if (newAccountId === '' || newAccountName === '') {
            res.status(401).json({ message: 'Attempted changes cannot be blank.' });
          } else {
            res.status(401).json({ message: 'Account name and id are not changed.' });
          }
        } else {
          res.status(401).json({ message: 'Account not found.' });
        }
      });
    });

  bkAccountRouter.route('/delete_account')
    .post((req, res) => {
      const { userId, accountId, accountName } = req.body;
      db.query('SELECT account_name from account_table where at_user_id = ? AND at_account_name = ? AND at_account_id = ?', [userId, accountName, accountId], (err, results) => {
        if (results.length !== 0) {
          db.query('DELETE FROM account_table WHERE at_user_id = ? AND at_account_name = ? AND at_account_id = ?', [userId, accountName, accountId], () => {
            if (err) {
              throw err;
            }
          });
        } else {
          res.status(401).json({ message: 'Account not found.' });
        }
      });
    });
  return bkAccountRouter;
};
