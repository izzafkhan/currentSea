const express = require('express');
const eventRouter = express.Router();
const debug = require('debug')('app:eventRoutes');
const db = require('./db');

module.exports = function router() {
  eventRouter.route('/create_event')
    .post((req, res) => {
      if (req.user) {
        const { eventAbv, eventName, eventColor } = req.body;
        db.query('INSERT INTO event_table (et_event_abv, et_event_name, et_event_color, et_user_id) VALUES (?, ?, ?,?);', [eventAbv, eventName, eventColor, req.user.username], (err, results) => {
          if (err) {
            debug('Error occurred while inserting to event_table in create_event route', err);
            res.status(500).json({ message: 'Some error occurred' });
          } else {
            res.status(201).json({ message: 'Event created' });
          }
        });
      } else {
        res.status(401).json({ message: 'User not logged in' });
      }
    });

  eventRouter.route('/edit_event')
    .put((req, res) => {
      if (req.user) {
        const { eventId, eventAbv, eventName, eventColor } = req.body;
        db.query('UPDATE event_table SET et_event_abv = ?, et_event_name = ?, et_event_color = ? WHERE et_event_id = ? and et_user_id=?;', [eventAbv, eventName, eventColor, eventId, req.user.username], (err) => {
          if (err) {
            debug('Error occurred while updating event_table in edit_event route', err);
            res.status(500).json({ message: 'Some error occurred' });
          } else {
            res.status(201).json({ message: 'Event updated' });
          }
        });
      } else {
        res.status(401).json({ message: 'User not logged in' });
      }
    });

  eventRouter.route('/delete_event')
    .post((req, res) => {

        if (req.user) {
            const { eventId } = req.body;
            debug(req.body);
            db.query('SELECT * from details_table where dt_userID = ? AND dt_eventID = ?',
                [req.user.username, eventId], (err, results) => {
                    if (err) {
                        debug(err);
                        res.status(500).json({ message: 'Some error occurred' });
                    }
                    if (results.length !== 0) {
                        res.status(401).json({ message: 'Event already used, please transfer your transactions from this event to another one' });
                    } else {
                        db.query('DELETE FROM event_table WHERE et_user_id = ? AND et_event_id = ?',
                            [req.user.username, eventId], (err1, results) => {
                                if (err1) {
                                    debug(err1);
                                    res.status(500).json({ message: 'Some error occurred' });
                                } else {
                                    res.status(200).json({ message: 'Account deleted successfully' });
                                }
                            });
                    }
                });
        } else {
            res.status(401).json({ message: 'User is not logged in' });
        }
    });

  eventRouter.route('/archive_event')
    .post((req, res) => {
      if (req.user) {
        const { eventId } = req.body;
        db.query('SELECT et_event_id from event_table where et_event_id = ?', [eventId], (err, result) => {
          if (err) {
            debug('Error occurred while querying event_table in archive_event route', err);
            res.status(500).json({ message: 'Some error occurred' });
          } else {
            if (result === 'undefined' || result == null || result.length === 0) {
              res.status(400).json({ message: 'Event id does not exist.' });
            } else {
              db.query('UPDATE event_table SET et_is_archived = TRUE WHERE et_event_id = ?;', [eventId], (err) => {
                if (err) {
                  debug('Error occurred while updating event in archive_event route', err);
                  res.status(500).json({ message: 'Some error occurred' });
                } else {
                  res.status(200).json({ message: 'Event archived successfully' });
                }
              });
            }
          }
        });
      } else {
        res.status(401).json({ message: 'User not logged in' });
      }
    });

  eventRouter.route('/get_all_events/')
    .get((req, res) => {
      if (req.user) {
        db.query('SELECT * from event_table where et_user_id = ?', [req.user.username], (err, result) => {
          if (err) {
            debug(err);
            res.status(400).json({ message: 'Some error occurred.' });
          } else {
            res.status(200).json(result);
          }
        });
      } else {
        res.status(401).json({ message: 'User not logged in' });
      }
    });

  return eventRouter;
}