const { Strategy } = require('passport-local');
const debug = require('debug')('app:local.strategy');
const db = require('../routes/db');
const { MD5 } = require('../routes/validationHelperMethods/account');

module.exports = function localStrategy(passport) {
  passport.use('local', new Strategy(
    {
      usernameField: 'id',
      passwordField: 'password',
    }, (id, password, done) => {
      db.query('SELECT * FROM user_table where ut_user_id=? or ut_email=?', [id, id],
        (err, results, fields) => {
          if (err) debug(err);
          if (results.length !== 0) {
            const userJSON = JSON.parse(JSON.stringify(results[0]));
            const { ut_user_id, ut_email, ut_password } = userJSON;
            if (id === ut_user_id || id === ut_email) {
              if (MD5(ut_user_id + password) === ut_password) {
                const user = {
                  username: ut_user_id,
                };
                done(err, user);
              } else {
                done(err, false);
              }
            } else {
              done(err, false);
            }
          } else {
            done(err, false);
          }
        });
    },
  ));
};
