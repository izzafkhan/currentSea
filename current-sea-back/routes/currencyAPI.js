const { XMLHttpRequest } = require('xmlhttprequest');
const express = require('express');
const debug = require('debug')('app:currencyAPI');
const dbConnection = require('./db');

const APIRouter = express.Router();

module.exports = function router() {
  APIRouter.route('/update')
    .put((req, res) => {
      if (req.body.password === 'UPDATE') {
        const baseCurrencies = ['EUR', 'USD', 'GBP', 'JPY', 'RUB'];

        for (let i = 0; i < baseCurrencies.length; i += 1) {
          const xhr = new XMLHttpRequest();
          xhr.open('GET', `https://api.exchangeratesapi.io/latest?base=${baseCurrencies[i]}`, false);
          xhr.send(null);
          const { date, rates, base } = JSON.parse(xhr.responseText);
          for (let j = 0; j < Object.keys(rates).length; j += 1) {
            const currency = Object.keys(rates)[j];
            dbConnection.query('INSERT INTO currency_table(ct_date, ct_from, ct_to, ct_rate) VALUES (?, ?, ?, ?)',
              [date, base, currency, rates[currency]], (err, results, fields) => {
                if (err) debug(err);
              });
          }
        }

        debug('Database populated');
      } else {
        res.status(401).json({ message: 'Action not allowed' });
      }
    });
  return APIRouter;
};
