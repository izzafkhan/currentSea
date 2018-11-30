const express = require('express');
const debug = require('debug')('app:statementRoutes');
const db = require('./db');

const statementRouter = express.Router();

module.exports = function router() {

  //Statement Flows
  statementRouter.route('/balance')
    .get((req, res) => {
      if (req.user) {
        db.query('SELECT * FROM balance_sheet_table where bt_user_id = ?', [req.user.username],
          (err, results, fields) => {
            if (err) {
              debug(err);
              res.status(500).json({ message: 'An error has occurred' });
            }
            const output = {};
            for (let i = 0; i < results.length; i += 1) {
              output.i = results[i];
            }
            res.status(200).json(output);
          });
      } else {
        res.status(401).json({ message: 'User not logged in' });
      }
    });

  statementRouter.route('/statement')
    .get((req, res) => {
      // Render respective html, ejs, or pug
    });

  /* Total sum(balance) within each month
  */

  statementRouter.route('/balancegraph')
    .get((req, res) => {
    });

  return statementRouter;
};
