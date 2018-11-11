const express = require('express');

const favCurRouter = express.Router();

module.exports = function router() {

    //Favorite Currency Flows
    favCurRouter.route('/add_fav_curr')
        .post((req, res) =>{
            // Render respective html, ejs, or pug
        });
    return favCurRouter;
}