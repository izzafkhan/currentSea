const passport = require('passport');
const { Strategy } = require('passport-local');

module.exports = function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'UserID',
      passwordField: 'Password',
      email: 'Email',
    }, (userID, password, email, done) => {
      const user = {
        userID, password, email,
      };
      done(null, user);
    },
  ));
};
