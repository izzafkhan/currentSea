const express = require('express');
const debug = require('debug')('app:favCurRoutes');
const db = require('./db');

const favCurRouter = express.Router();

module.exports = function router() {
  favCurRouter.route('/currencies').get((req, res) => {
    db.query('SELECT DISTINCT ct_from FROM currency_table', (err, results, fields) => {
      if (err) {
        debug(err);
        res.status(500).json({ message: 'Some error occurred' });
      } else {
        const output = [];
        for (let i = 0; i < results.length; i += 1) {
          output[i] = results[i].ct_from;
        }
        res.status(200).json({ currencies: output });
      }
    });
  });

  favCurRouter.route('/add_fav_cur')
    .post((req, res) => {
      if (req.user) {
        const { currencyFrom, currencyTo } = req.body;
        db.query('SELECT * FROM favorite_currency_table WHERE ft_user_id = ? AND ft_from = ? AND ft_to = ?',
          [req.user.username, currencyFrom, currencyTo], (err, results, fields) => {
            if (err) {
              debug(err);
              res.status(500).json({ message: 'Some error occurred' });
            }
            debug(results);
            if (results.length === 0) {
              db.query('INSERT INTO favorite_currency_table (ft_user_id, ft_from, ft_to, ft_change_in_amount) VALUES (?, ?, ?, ?);',
                [req.user.username, currencyFrom, currencyTo, 0], (err2, results2, fields2) => {
                  if (err2) {
                    debug(err2);
                    res.status(500).json({ message: 'Some error occurred' });
                  } else {
                    res.status(201).json({ message: 'Currencies inserted successfully' });
                  }
                });
            } else {
              res.status(401).json({ message: 'Currency already favorited.' });
            }
          });
      } else {
        res.status(401).json({ message: 'User is not logged in' });
      }
    });

  favCurRouter.route('/remove_fav_cur')
    .post((req, res) => {
      if (req.user) {
        const { currencyFrom, currencyTo } = req.body;
        db.query('SELECT * FROM favorite_currency_table WHERE ft_user_id = ? AND ft_from = ? AND ft_to = ?',
          [req.user.username, currencyFrom, currencyTo], (err, results, fields) => {
            if (err) {
              debug(err);
              res.status(500).json({ message: 'Some error occurred' });
            }
            debug(results);
            if (results.length === 0) {
              res.status(401).json({ message: 'Currency not found.' });
            } else {
              db.query('DELETE FROM favorite_currency_table WHERE ft_user_id = ? AND ft_from = ? AND ft_to = ?',
                [req.user.username, currencyFrom, currencyTo], (err2, results2, fields2) => {
                  if (err2) {
                    debug(err2);
                    res.status(500).json({ message: 'Some error occurred' });
                  } else {
                    res.status(201).json({ message: 'Currencies unfavorited.' });
                  }
                });
            }
          });
      } else {
        res.status(401).json({ message: 'User is not logged in' });
      }
    });

  favCurRouter.route('/get_historic_rate').get((req, res) => {
    const { from, to, date } = req.query;
    db.query('SELECT ct_rate FROM currency_table WHERE ct_from = ? AND ct_to = ? AND ct_date = ?',
      [from, to, date], (err, results, fields) => {
        if (err) {
          debug(err);
          res.status(500).json({ message: 'Some error occurred' });
        }
        if (results.length > 0) {
          res.status(200).json({ rate: results[0].ct_rate });
        } else {
          res.status(200).json({ message: 'No rates for these currencies and this day' });
        }
      });
  });
  return favCurRouter;
};
