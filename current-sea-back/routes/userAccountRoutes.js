const express = require('express');
const debug = require('debug')('app:userAccountsRoutes');
const passport = require('passport');
const db = require('./db');
const { validateEmail, usernameDoesNotExist, emailDoesNotExist } = require('./validationHelperMethods/account');

const userAccountRouter = express.Router();


module.exports = function router() {
  // UserAccount Flows
  userAccountRouter.route('/')
    .get((req, res) => {
      // Render respective html, ejs, or pug
      res.send('Accounts');
      db.query('SELECT * FROM user_table where ut_user_id = "Test2" ', (err, results, fields) => {
        if (err) res.send(err);
        debug(results.length);
      });
    });

  userAccountRouter.route('/register')
    .post((req, res) => {
      const {
        username, firstName, lastName, emailID, password, confirmPassword,
      } = req.body;
      if (password === '') {
        res.status(401).json({ message: 'No password entered' });
      }
      if (password !== confirmPassword) {
        res.status(401).json({ message: 'Passwords do not match' });
      }
      if (!validateEmail(emailID)) {
        res.status(401).json({ message: 'Invalid email' });
      } else {
        db.query('SELECT ut_user_id FROM user_table WHERE ut_email=?', [emailID], (err, results, fields) => {
          if (results.length === 0) {
            db.query('SELECT ut_user_id FROM user_table WHERE ut_user_id=?', [username], (err, results2, fields) => {
              if (results2.length === 0) {
                db.query('INSERT INTO user_table (ut_user_id, ut_password, ut_first_name, ut_last_name, ut_email) VALUES (?, ?, ?, ?, ?)',
                  [username, password, firstName, lastName, emailID], (err, results3, fields) => {
                    res.status(201).send({ userID: username });
                  });
              } else {
                res.status(401).json({ message: 'Username already exists' });
              }
            });
          } else {
            res.status(401).json({ message: 'Email already exits' });
          }
        });
      }
    });

  userAccountRouter.route('/login')
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/',
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
};
