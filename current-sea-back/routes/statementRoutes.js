const express = require('express');

const statementRouter = express.Router();

module.exports = function router() {
  statementRouter.use((err, req, res) => {
    if (!req.user) {
      res.status(401).send('User does not appear to exist.');
    }
  });

  //Statement Flows
  statementRouter.route('/balance')
    .get((req, res) => {
      // Render respective html, ejs, or pug
    });

  statementRouter.route('/statement')
    .get((req, res) => {
      // Render respective html, ejs, or pug
    });
  return statementRouter;
}