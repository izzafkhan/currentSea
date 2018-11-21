const express = require('express');

const statementRouter = express.Router();

module.exports = function router() {

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