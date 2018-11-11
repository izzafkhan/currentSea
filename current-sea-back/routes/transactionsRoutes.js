const express = require('express');

const transactionsRouter = express.Router();

module.exports = function router() {

    //Transaction Flows
    transactionsRouter.route('/add_transactions')
        .post((req, res) => {
            // Render respective html, ejs, or pug
        });

    transactionsRouter.route('/edit_transactions')
        .post((req, res) => {
            // Render respective html, ejs, or pug
        });

    transactionsRouter.route('/delete_transactions')
        .post((req, res) => {
            // Render respective html, ejs, or pug
        });
    return transactionsRouter;
}

