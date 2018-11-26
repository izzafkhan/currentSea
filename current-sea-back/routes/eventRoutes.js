const express = require('express');
const eventRouter = express.Router();
const debug = require('debug')('app:eventRoutes');
const db = require('./db');

module.exports = function router() {

    eventRouter.route('/create_event')
        .post((req, res) => {
            const { eventAbv, transactionId, eventName } = req.body;
            db.query('INSERT INTO event_table (et_event_abv, et_transaction_id, et_event_name, et_user_id) VALUES (?, ?, ?, ?);', [eventAbv, transactionId, eventName, req.user.username], (err,results) => {
                if (err) {
                    debug('Error occurred while inserting to event_table in create_event route', err);
                    res.status(500).json({message: 'Some error occurred'});
                } else {
                    res.status(201).json({message: 'Event created'});
                }
            });
        });

    eventRouter.route('/edit_event')
        .put((req, res) => {
            const { eventId, eventAbv, transactionId, eventName } = req.body;
            db.query('UPDATE event_table SET et_event_abv = ?, et_transaction_id = ?, et_event_name = ? WHERE et_event_id = ? and et_user_id=?;', [eventAbv, transactionId, eventName, eventId, req.user.username], (err,results) => {
                if (err) {
                    debug('Error occurred while updating event_table in edit_event route', err);
                    res.status(500).json({message: 'Some error occurred'});
                } else {
                    res.status(201).json({message: 'Event updated'});
                }
            });
        });

    eventRouter.route('/delete_event')
        .post((req, res) => {
            const { eventId } = req.body;
            db.query('SELECT et_event_id from event_table where et_event_id = ?', [eventId], (err, result) => {
                if (err) {
                    debug('Error occurred while querying event_table in delete_event route', err);
                    res.status(500).json({message: 'Some error occurred'});
                } else {
                    if (result== 'undefined' || result == null ||  result.length === 0) {
                        res.status(400).json({ message: 'Event id does not exist.' });
                    } else {
                        db.query('DELETE FROM event_table WHERE et_event_id = ?;', [eventId], (err1, results) => {
                            if (err1) {
                                debug('Error occurred while deleting event in delete_event route', err);
                                res.status(500).json({message: 'Some error occurred'});
                            } else {
                                res.status(200).json({message: 'Event deleted successfully'});
                            }
                        });
                    }
                }
            });
        });

    eventRouter.route('/archive_event')
        .post((req, res) => {
            const { eventId } = req.body;
            db.query('SELECT et_event_id from event_table where et_event_id = ?', [eventId], (err, result) => {
                if (err) {
                    debug('Error occurred while querying event_table in archive_event route', err);
                    res.status(500).json({message: 'Some error occurred'});
                } else {
                    if (result== 'undefined' || result == null ||  result.length === 0) {
                        res.status(400).json({ message: 'Event id does not exist.' });
                    } else {
                        db.query('UPDATE event_table SET et_is_archived = TRUE WHERE et_event_id = ?;', [eventId], (err, results) => {
                            if (err) {
                                debug('Error occurred while updating event in archive_event route', err);
                                res.status(500).json({message: 'Some error occurred'});
                            } else {
                                res.status(200).json({message: 'Event archived successfully'});
                            }
                        });
                    }
                }
            });
        });

    eventRouter.route('/get_all_events/')
        .get((req, res) => {
            db.query('SELECT * from event_table where et_user_id = ?', [req.user.username], (err, result) => {
                if (result== 'undefined' || result == null ||  result.length === 0) {
                    res.status(400).json({ message: 'User id does not exist.' });
                } else {
                    res.status(200).json(result);
                }
            });
        });

    return eventRouter;
}