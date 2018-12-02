const express = require('express');
const debug = require('debug')('app:bkAccountRoutes');
const db = require('./db');

const bkAccountRouter = express.Router();

module.exports = function router() {

  bkAccountRouter.route('/get_accounts')
    .get((req, res) => {
      if (req.user) {
        db.query('SELECT at_account_name FROM account_table WHERE at_user_id = ?', [req.user.username],
          (err, results, fields) => {
            if (err) {
              debug('An error has occured in /get_accounts', err);
            } else {
              res.status(200).json({ results });
            }
          });
      } else {
        res.status(401).json({ message: 'User is not logged in' });
      }
    });

  bkAccountRouter.route('/add_account')
    .post((req, res) => {
      if (req.user) {
        const {
          accountName, accountId,
        } = req.body;
        db.query('SELECT at_account_name from account_table where at_user_id = ? and at_account_name = ? and at_account_id = ?',
          [req.user.username, accountName, accountId], (err, result, fields) => {
            if (err) {
              debug(err);
              res.status(500).json({ message: 'Some error occurred' });
            }
            if (result.length === 0) {
              if (accountId === '' || accountName === '') {
                res.status(401).json({ message: 'Please fill in the blank spaces of the parameters.' });
              } else {
                db.query('INSERT INTO account_table(at_account_name, at_account_id, at_user_id) VALUES (?, ?, ?);', [accountName, accountId, req.user.username],
                  (err2, results, fields) => {
                    if (err2) {
                      debug(err2);
                      res.status(500).json({ message: 'Some error occurred' });
                    }
                    res.status(201).json({ message: 'Account created' });
                  });
              }
            } else {
              res.status(401).json({ message: 'Account already exists.' });
            }
          });
      } else {
        res.status(401).json({ message: 'User is not logged in' });
      }
    });

  bkAccountRouter.route('/edit_account')
    .put((req, res) => {
      if (req.user) {
        const {
          accountId, accountName, newAccountId, newAccountName,
        } = req.body;
        db.query('SELECT account_name from account_table where at_user_id = ? AND at_account_name = ? AND at_account_id = ?', [req.user.username, accountName, accountId], (err, results) => {
          if (results.length !== 0) {
            if (newAccountId !== accountId || newAccountName !== accountName) {
              if (newAccountId !== accountId) {
                db.query(('UPDATE account_table SET at_account_id = ? WHERE at_user_id = ? AND at_account_id = ?', [newAccountId, req.user.username, accountId], () => {
                  if (err) {
                    debug(err);
                    res.status(500).json({ message: 'Some error occurred' });
                  }
                  debug(results);
                }));
              }
              if (newAccountName !== accountName) {
                db.query(('UPDATE account_table SET at_account_name = ? WHERE at_user_id = ? AND at_account_name = ?', [newAccountName, req.user.username, accountName], () => {
                  if (err) {
                    debug(err);
                    res.status(500).json({ message: 'Some error occurred' });
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
      } else {
        res.status(401).json({ message: 'User is not logged in' });
      }
    });

  bkAccountRouter.route('/delete_account')
    .delete((req, res) => {
      if (req.user) {
        const { userId, accountId, accountName } = req.body;
        db.query('SELECT account_name from account_table where at_user_id = ? AND at_account_name = ? OR at_account_id = ?', [userId, accountName, accountId], (err, results) => {
          if (results.length !== 0) {
            db.query('DELETE FROM account_table WHERE at_user_id = ? AND at_account_name = ? OR at_account_id = ?', [userId, accountName, accountId], () => {
              if (err) {
                debug(err);
                res.status(500).json({ message: 'Some error occurred' });
              }
            });
          } else {
            res.status(401).json({ message: 'Account not found.' });
          }
        });
      } else {
        res.status(401).json({ message: 'User is not logged in' });
      }
    });
  return bkAccountRouter;
};
