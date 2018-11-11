const express = require('express');

const bkAccountRouter = express.Router();

module.exports = function router() {

    //BKAccount Flows
    bkAccountRouter.route('/add_account')
        .post((req, res) => {
            // Render respective html, ejs, or pug
        });

    bkAccountRouter.route('/edit_account')
        .post((req, res) => {
            // Render respective html, ejs, or pug
        });

    bkAccountRouter.route('/delete_account')
        .post((req, res) => {
            // Render respective html, ejs, or pug
        });
    return bkAccountRouter;
}

