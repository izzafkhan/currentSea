const express = require('express');

const userAccountRouter = express.Router();

module.exports = function router() {

    //UserAccount Flows
    userAccountRouter.route('/')
        .post((req, res) => {
            // Render respective html, ejs, or pug
        });

    userAccountRouter.route('/register')
        .post((req, res) => {
            // Render respective html, ejs, or pug
        });

    userAccountRouter.route('/login')
        .post((req, res) => {
            // Render respective html, ejs, or pug
        });

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