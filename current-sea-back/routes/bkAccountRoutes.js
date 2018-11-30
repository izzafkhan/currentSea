const express = require('express');
const debug = require('debug')('app:bkAccountRoutes');
const db = require('./db');

const bkAccountRouter = express.Router();

module.exports = function router() {
  bkAccountRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.status(401).json({ message: 'User is not logged in' });
    }
  });

  bkAccountRouter.route('/add_account')
    .post((req, res) => {
      const {
        accountName, accountId,
      } = req.body;
      db.query('SELECT at_account_name from account_table where at_user_id = ? and at_account_name = ? and at_account_id = ?',
        [req.user.username, accountName, accountId], (err, results, fields) => {
          if (err) {
            debug('An error occurred while adding a Bank account', err);
            res.status(500).json({ message: 'Some error occurred' });
          }
          if (results.length === 0) {
            if (accountId === '' || accountName === '') {
              res.status(401).json({ message: 'Please fill in the blank spaces of the parameters.' });
            } else {
              db.query('INSERT INTO account_table(at_account_name, at_account_id, at_user_id) VALUES (?, ?, ?);', [accountName, accountId, req.user.username],
                (err2, results, fields) => {
                  if (err2) {
                    debug('An error occurred while adding a Bank account', err2);
                    res.status(500).json({ message: 'Some error occurred' });
                  }
                  res.status(201).json({ message: 'Bank Account created' });
                });
            }
          } else {
            res.status(401).json({ message: 'Bank Account already exists.' });
          }
        });
    });

  bkAccountRouter.route('/edit_account')
    .put((req, res) => {
      const {
        accountId, accountName, newAccountId, newAccountName,
      } = req.body;
      if (newAccountId === '' || newAccountName === '') {
        res.status(400).json({ message: 'new AccountID and newAccountName cannot be empty' });
      } else {
        db.query('SELECT * from account_table where at_user_id = ? AND at_account_name = ? AND at_account_id = ?',
          [req.user.username, accountName, accountId], (err, results, fields) => {
            if (err) {
              debug('Error occurred in /edit_account', err);
              res.status(500).json({ message: 'An error has occurred' });
            } else if (results.length > 0) {
              db.query('SELECT * from account_table where at_user_id = ? AND (at_account_name = ? OR at_account_id = ?)',
                [req.user.username, newAccountName, newAccountId], (err3, results3, fields3) => {
                  if (err3) {
                    debug('Error occurred in /edit_account', err3);
                    res.status(500).json({ message: 'An error has occurred' });
                  } else if (results3.length === 0) {
                    db.query('UPDATE account_table SET at_account_name=?, at_account_id=? WHERE at_user_id = ? AND at_account_name = ? AND at_account_id = ?',
                      [newAccountName, newAccountId, req.user.username, accountName, accountId],
                      (err2, results2, fields2) => {
                        if (err2) {
                          debug('Error occurred in /edit_account', err2);
                          res.status(500).json({ message: 'An error has occurred' });
                        } else {
                          res.status(200).json({ message: 'Account modified successfully' });
                        }
                      });
                  } else {
                    res.status(401).json({ message: 'Account with the same id or name already exists' });
                  }
                });
            } else {
              res.status(401).json({ message: 'Account does not appear to exist' });
            }
          });
      }
    });

  bkAccountRouter.route('/delete_account')
    .delete((req, res) => {
      const { accountId, accountName } = req.body;
      db.query('SELECT * from account_table where at_user_id = ? AND at_account_name = ? AND at_account_id = ?',
        [req.user.username, accountName, accountId], (err, results, fields) => {
          if (err) {
            debug('Error occurred in /delete_account', err);
            res.status(500).json({ message: 'Some error occurred' });
          } else if (results.length > 0) {
            db.query('DELETE FROM account_table WHERE at_user_id = ? AND at_account_name = ? OR at_account_id = ?',
              [req.user.username, accountName, accountId], (err2, results2, fields2) => {
                if (err2) {
                  debug('An error occurred while deleting a bank account', err2);
                  res.status(500).json({ message: 'Some error occurred deleting a bank account' });
                } else {
                  res.status(200).json({ message: 'Bank account deleted successfully' });
                }
              });
          } else {
            res.status(404).json({ message: 'bank account not found.' });
          }
        });
    });
  return bkAccountRouter;
};
