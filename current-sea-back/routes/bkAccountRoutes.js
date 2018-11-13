const express = require('express');
const debug = require('debug')('app:bkAccountsRoutes');
const db = require('../db');
const bkAccountRouter = express.Router();

module.exports = function router() {

  //BKAccount Flows
  bkAccountRouter.route('/add_account')
    .post((req, res) => {
      const { userId } = req.params;
      const { accountName } = req.params;
      const q = `INSERT INTO account_table(at_account_name, at_account_id, at_user_id)VALUES WHERE at_user_id = ${userId} AND at_account_name = ${accountName}`;
      db.query(q, (err, result) => {
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
      const q = `DELETE FROM account_table WHERE at_user_id = ${userId} AND at_account_name = ${accountName} AND at_account_id = ${accountId}`;
      db.query(q, (err, result) => {
        debug(result);
        if (err) {
          throw err;
        }
      });
    });
  return bkAccountRouter;
}

