const express = require('express');
const debug = require('debug')('app:userAccountsRoutes');
const passport = require('passport');
const db = require('../db');

const userAccountRouter = express.Router();

module.exports = function router() {
  // UserAccount Flows
  userAccountRouter.route('/')
    .get((req, res) => {
      // Render respective html, ejs, or pug
      res.send('Accounts');
    });

  userAccountRouter.route('/register')
    .get((req, res) => {
      db.query('SELECT * FROM user_table', (err, result, fields) => {
        if (err) throw err;
        debug(result);
        res.send(result);
      });
    });

  userAccountRouter.route('/login')
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }));

  userAccountRouter.route('/logout')
    .get((req, res) => {
      // Render respective html, ejs, or pug
    });

  userAccountRouter.route('/change_password')
    .post((req, res) => {
      // Render respective html, ejs, or pug
    });
  return userAccountRouter;
}
