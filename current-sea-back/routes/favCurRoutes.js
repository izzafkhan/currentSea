const express = require('express');
const debug = require('debug')('app:favCurRoutes');
const moment = require('moment');
const db = require('./db');

const favCurRouter = express.Router();

module.exports = function router() {
  favCurRouter.route('/currencies').get((req, res) => {
    db.query('SELECT DISTINCT ct_from FROM currency_table', (err, results) => {
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

  favCurRouter.route('/get_fav_cur')
    .get((req, res) => {
      if (req.user) {
        db.query('SELECT * FROM favorite_currency_table WHERE ft_user_id = ?', [req.user.username],
          (err, results) => {
            if (err) {
              debug(err);
              res.status(500).json({ message: 'Some error occurred' });
            } else {
              res.status(200).json({ results });
            }
          });
      } else {
        res.status(401).json({ message: 'User is not logged in' });
      }
    });

  favCurRouter.route('/add_fav_cur')
    .post((req, res) => {
      if (req.user) {
        const { currencyFrom, currencyTo } = req.body;
        db.query('SELECT * FROM favorite_currency_table WHERE ft_user_id = ? AND ft_from = ? AND ft_to = ?',
          [req.user.username, currencyFrom, currencyTo], (err, results) => {
            if (err) {
              debug(err);
              res.status(500).json({ message: 'Some error occurred' });
            }
            debug(results);
            if (results.length === 0) {
              db.query('INSERT INTO favorite_currency_table (ft_user_id, ft_from, ft_to, ft_change_in_amount) VALUES (?, ?, ?, ?);',
                [req.user.username, currencyFrom, currencyTo, 0], (err2) => {
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
          [req.user.username, currencyFrom, currencyTo], (err, results) => {
            if (err) {
              debug(err);
              res.status(500).json({ message: 'Some error occurred' });
            }
            debug(results);
            if (results.length === 0) {
              res.status(401).json({ message: 'Currency not found.' });
            } else {
              db.query('DELETE FROM favorite_currency_table WHERE ft_user_id = ? AND ft_from = ? AND ft_to = ?',
                [req.user.username, currencyFrom, currencyTo], (err2) => {
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

  favCurRouter.route('/gethistoricrate').get((req, res) => {
    const { from, to, date } = req.body;
    debug(moment().format('YYYY-MM-DD'));
    db.query('SELECT ct_rate FROM currency_table WHERE ct_from = ? AND ct_to = ? AND ct_date = ?',
      [from, to, date], (err, results) => {
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

  favCurRouter.route('/getrate').post((req, res) => {
    debug(req.body);
    let { from, to } = req.body;
    db.query('select * from currency_table where ct_from = ? AND ct_to = ? order by ct_date desc LIMIT 1;',
      [from, to], (err, results) => {
        console.log('cp1');
        if (err) {
          debug(err);
          return res.status(500).json({ message: 'Some error occurred' });
        }
        if (results && results.length > 0) {
          res.status(200).json({ rate: results[0].ct_rate });
        } else {
          res.status(200).json({ message: 'No current rate for these currencies.' });
        }
      });
  });

  favCurRouter.route('/get_all_rates').post((req, res) => {
    const { from } = req.body;
    db.query('SELECT * FROM currency_table WHERE ct_from = ? AND ct_date <= ? ORDER BY ct_date desc, ct_to asc LIMIT 66',
      [from, moment().format('YYYY-MM-DD')], (err, results) => {
        if (err) {
          debug(err);
          res.status(500).json({ message: 'Some error occurred' });
        } else {
          res.status(200).json({ results });
        }
      });
  });
  return favCurRouter;
};
