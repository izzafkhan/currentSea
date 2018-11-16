const express = require('express');
const debug = require('debug')('app:bkAccountsRoutes');
const db = require('./db');
const bkAccountRouter = express.Router();

module.exports = function router() {
  bkAccountRouter.route('/add_account')
    .post((req, res) => {
      const {
        userId, accountName,
      } = req.body;
      db.query('SELECT at_account_name from account_table where at_user_id = ? and at_account_name = ?', [userId, accountName], (err, result) => {
        if (result.length === 0) {
          db.query('INSERT INTO account_table(at_account_name, at_account_id, at_user_id) VALUES WHERE at_user_id = ? AND at_account_name = ?', [userId, accountName], (err, result) => {
            if (err) {
              throw err;
            }
            debug(result);
          });
        } else {
          res.status(401).json({ message: 'Account already exists.' });
        }
      });
    });

  bkAccountRouter.route('/edit_account')
    .post((req, res) => {
      // Render respective html, ejs, or pug
    });

  bkAccountRouter.route('/delete_account')
    .post((req, res) => {
      const { userId, accountId, accountName } = req.body;
      db.query('SELECT account_name from account_table where at_user_id = ? AND at_account_name = ? AND at_account_id = ?', [userId, accountName, accountId], (err, result) => {
        if (result.length !== 0) {
          db.query('DELETE FROM account_table WHERE at_user_id = ? AND at_account_name = ? AND at_account_id = ?', [userId, accountName, accountId], (err) => {
            if (err) {
              throw err;
            }
          });
        }
      });
    });
  return bkAccountRouter;
};
