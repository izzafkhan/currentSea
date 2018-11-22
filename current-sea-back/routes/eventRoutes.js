const express = require('express');

const eventRouter = express.Router();

module.exports = function router() {
    eventRouter.use((err, req, res) => {
        if (!req.user) {
          res.status(401).send('User does not appear to exist.');
        }
      });

    //Event Flows
    eventRouter.route('/create_event')
        .post((req, res) => {
            // Render respective html, ejs, or pug
        });

    eventRouter.route('/edit_event')
        .post((req, res) => {
            // Render respective html, ejs, or pug
        });

    eventRouter.route('/delete_event')
        .post((req, res) => {
            // Render respective html, ejs, or pug
        });

    eventRouter.route('/archive_event')
        .get((req, res) => {
            // Render respective html, ejs, or pug
        });
    return eventRouter;
}