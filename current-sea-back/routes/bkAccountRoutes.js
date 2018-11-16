const express = require('express');
const debug = require('debug')('app:bkAccountsRoutes');
//const db = require('../db');
const bkAccountRouter = express.Router();

module.exports = function router() {
  bkAccountRouter.route('/add_account')
    .post((req, res) => {
      const { userId } = req.params;
      const { accountName } = req.params;
      db.query('INSERT INTO account_table(at_account_name, at_account_id, at_user_id) VALUES WHERE at_user_id = ? AND at_account_name = ?', [userId, accountName], (err) => {
        if (err) {
          throw err;
        }
      });
    });

  bkAccountRouter.route('/edit_account')
    .post((req, res) => {
      // Render respective html, ejs, or pug
    });

  bkAccountRouter.route('/delete_account')
    .post((req, res) => {
      const { userId } = req.params;
      const { accountName } = req.params;
      const { accountId } = req.params;
      db.query('DELETE FROM account_table WHERE at_user_id = ? AND at_account_name = ? AND at_account_id = ?', [userId, accountName, accountId], (err) => {
        if (err) {
          throw err;
        }
      });
    });
  return bkAccountRouter;
};
