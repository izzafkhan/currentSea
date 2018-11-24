const express = require('express');
const eventRouter = express.Router();
const debug = require('debug')('app:eventRoutes');
const db = require('./db');

module.exports = function router() {

    eventRouter.use((err, req, res, next) => {
        if (!req.user) {
            res.status(401).json({message: 'User not logged in'});
        }
        next();
    });

    eventRouter.route('/create_event')
        .post((req, res) => {
            const { eventAbv, transactionId, eventName } = req.body;
            db.query('INSERT INTO event_table (et_event_abv, et_transaction_id, et_event_name) VALUES (?, ?, ?);', [eventAbv, transactionId, eventName], (err,results) => {
                if (err) {
                    debug('Error occurred while inserting to event_table in create_event route' + err);
                    res.status(500).json({message: 'Some error occurred'});
                }
                res.status(201).json({message: 'Event created'});
            });
        });

    eventRouter.route('/edit_event')
        .post((req, res) => {
            const { eventId, eventAbv, transactionId, eventName } = req.body;
            db.query('UPDATE event_table SET et_event_abv = ?, et_transaction_id = ?, et_event_name = ?) WHERE et_event_id = ?;', [eventAbv, transactionId, eventName, eventId], (err,results) => {
                if (err) {
                    debug('Error occurred while updating event_table in edit_event route' + err);
                    res.status(500).json({message: 'Some error occurred'});
                }
                res.status(201).json({message: 'Event updated'});
            });
        });

    eventRouter.route('/delete_event')
        .post((req, res) => {
            const { eventId } = req.body;
            db.query('SELECT et_event_id from event_table where et_event_id = ?', [eventId], (err, result) => {
                if (result.length === 0) {
                    res.status(400).json({ message: 'Event id does not exist.' });
                } else {
                    db.query('DELETE FROM et_event_table WHERE et_event_id = ?;', [eventId], (err, results) => {
                        if (err) {
                            debug('Error occurred while deleting event in delete_event route' + err);
                            res.status(500).json({message: 'Some error occurred'});
                        }
                        res.status(200).json({message: 'Event deleted'});
                    });
                }
            });
        });

    eventRouter.route('/archive_event')
        .get((req, res) => {
            // Render respective html, ejs, or pug
        });
    return eventRouter;
}