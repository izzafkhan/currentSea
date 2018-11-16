const debug = require('debug')('app:account');
const db = require('../db');


function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

async function usernameDoesNotExist(username) {
  await db.query('SELECT ut_user_id FROM user_table WHERE ut_user_id=?', [username], (err, results, fields) => {
    if (err) throw err;
    if (results.length === 0) {
      debug(results.length);
      return true;
    }
    return false;
  });
}

async function emailDoesNotExist(emailID) {
  await db.query('SELECT ut_user_id FROM user_table WHERE ut_email=?', [emailID], (err, results, fields) => {
    if (err) throw err;
    if (results.length === 0) {
      debug(results.length);
      return true;
    }
    return false;
  });
}

module.exports = { validateEmail, usernameDoesNotExist, emailDoesNotExist };
