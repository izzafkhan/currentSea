const express = require('express');
const debug = require('debug')('app:startBalanceRoutes.js');
const db = require('./db.js');

const startBalanceRouter = express.Router();

module.exports = function router() {
  startBalanceRouter.route('/set_balance')
    .post((req, res) => {
      if (req.user) {
        const { data } = req.body;
        let query = '';
        for (let i = 0; i < data.length; i += 1) {
          if (i === 0) {
            query += `at_account_id = ${data[i].bt_accountID}`;
          } else {
            query += ` OR at_account_id = ${data[i].bt_accountID}`;
          }
        }
        db.query(`SELECT * FROM account_table WHERE account_type = "Balance" AND at_user_id = ? AND (${query})`,
          [req.user.username], (err, results) => {
            if (err) {
              debug(err);
              res.status(500).json({ message: 'Some error occurred' });
            } else if (results.length === data.length) {
              let insert = '';
              for (let i = 0; i < data.length; i += 1) {
                if (i === data.length - 1) {
                  insert += `(${data[i].bt_accountID}, ${data[i].bt_initialBalance}, "${
                    data[i].bt_currency_abv}", "${req.user.username}")`;
                } else {
                  insert += `("${data[i].bt_accountID}", ${data[i].bt_initialBalance}, "${
                    data[i].bt_currency_abv}", "${req.user.username}"), `;
                }
              }
              db.query(`INSERT INTO initial_balance_table(bt_account_id, bt_initialBalance, bt_currency_abv, bt_user_id) VALUES ${insert
              } ON DUPLICATE KEY UPDATE bt_currency_abv=VALUES(bt_currency_abv), bt_initialBalance=VALUES(bt_initialBalance);`,
              (err2, results2) => {
                if (err2) {
                  debug(err2);
                  res.status(500).json({ message: 'Some error occurred' });
                } else {
                  res.status(201).json({ message: 'Initial balance set' });
                }
              });
            }
          });
      } else {
        res.status(401).json({ message: 'User not authenticated' });
      }
    });

  startBalanceRouter.route('/get_balance')
    .get((req, res) => {
      if (req.user) {
        db.query('SELECT * FROM initial_balance_table WHERE bt_user_id',
          [req.user.username], (err, results) => {
            if (err) {
              debug(err);
              res.status(500).json({ message: 'Some error occurred' });
            } else {
              res.status(200).json({ results });
            }
          });
      } else {
        res.status(401).json({ message: 'User not authenticated' });
      }
    });
  return startBalanceRouter;
};
