const express = require('express');

const pageRouter = express.Router();

function router(){

    //UserAccount Flows
    pageRouter.route('/')
        .post((req, res) => {
            // Render respective html, ejs, or pug
        });
    
    pageRouter.route('/register')
        .post((req, res) => {
            // Render respective html, ejs, or pug
        });

    pageRouter.route('/login')
        .post((req, res) => {
            // Render respective html, ejs, or pug
        });

    pageRouter.route('/logout')
        .get((req, res) => {
            // Render respective html, ejs, or pug
        });

    pageRouter.route('/change_password')
        .post((req, res) => {
            // Render respective html, ejs, or pug
        });

    //BKAccount Flows
    pageRouter.route('/add_account')
        .post((req, res) => {
            // Render respective html, ejs, or pug
        });

    pageRouter.route('/edit_account')
        .post((req, res) => {
            // Render respective html, ejs, or pug
        });

    pageRouter.route('/delete_account')
        .post((req, res) => {
            // Render respective html, ejs, or pug
        });

    //Transaction Flows
    pageRouter.route('/add_transactions')
        .post((req, res) => {
            // Render respective html, ejs, or pug
        });

    pageRouter.route('/edit_transactions')
        .post((req, res) => {
            // Render respective html, ejs, or pug
        });

    pageRouter.route('/delete_transactions')
        .post((req, res) => {
            // Render respective html, ejs, or pug
        });

    //Favorite Currency Flows
    pageRouter.route('/add_fav_curr')
        .post((req, res) =>{
            // Render respective html, ejs, or pug
        })
    return pageRouter;
}

module.exports = router;