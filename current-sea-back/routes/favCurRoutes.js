const express = require('express');
const db = require('./db');

const favCurRouter = express.Router();

module.exports = function router() {
  favCurRouter.use((err, req, res) => {
    if (!req.user) {
      res.status(401).send('User does not appear to exist.');
    }
  });

  favCurRouter.route('/add_fav_curr')
    .post((req, res) => {
      const { userId, currencyAbv } = req.body;
      db.query('SELECT * FROM Favorite_Currency_table WHERE fc_user_id = ? AND fc_currency_abv = ?', [userId, currencyAbv], (results, err) => {
        if (results.length !== 0) {
          db.query('INSERT INTO Favorite_Currency_table (fc_user_id, fc_currency_abv, fc_change_amount) VALUES (?, ?, ?);', [userId, currencyAbv, 0], () => {
            if (err) {
              throw err;
            }
          });
        } else {
          res.status(401).json({ message: 'Currency already favorited.' });
        }
      });
    });
  return favCurRouter;
};
