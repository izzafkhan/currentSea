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
        db.query('SELECT et_event_id from event_table where et_event_id = ?', [eventId], (err, result) => {
          if (err) {
            debug('Error occurred while querying event_table in delete_event route', err);
            res.status(500).json({ message: 'Some error occurred' });
          } else {
            if (result === 'undefined' || result == null || result.length === 0) {
              return res.status(400).json({ message: 'Event id does not exist.' });
            } else {

              db.query('SELECT dt_eventID from details_table where dt_eventID = ?', [eventId], (err2) => {
                if (err2) {
                  debug('Error occurred while querying details_table', err2);
                  return res.status(500).json({ message: 'Some error occurred' });
                }
                return res.status(401).json({ message: 'This event is being used by transactions, please delete those transactions before you delete this event' });
              });


              db.query('DELETE FROM event_table WHERE et_event_id = ?;', [eventId], (err1) => {
                if (err1) {
                  debug('Error occurred while deleting event in delete_event route', err);
                  res.status(500).json({ message: 'Some error occurred' });
                } else {
                  res.status(200).json({ message: 'Event deleted successfully' });
                }
              });
            }
          }
        });
      } else {
        res.status(401).json({ message: 'User not logged in' });
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
          if (result === 'undefined' || result == null || result.length === 0) {
            res.status(400).json({ message: 'User id does not exist.' });
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