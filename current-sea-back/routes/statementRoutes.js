const express = require('express');
const math = require('mathjs');
const debug = require('debug')('app:statementRoutes');
const db = require('./db');

const statementRouter = express.Router();

module.exports = function router() {
  //Statement Flows
  statementRouter.route('/balance')
    .get((req, res) => {
      if (req.user) {
        const { dateFrom, dateTo } = req.body;
        db.query('SELECT * FROM transaction_table where tt_user_id = ? AND tt_date >= ? AND tt_date <= ?',
          [req.user.username, dateFrom, dateTo],
          (err, results1) => {
            if (err) {
              debug(err);
              res.status(500).json({ message: 'An error has occurred when getting transactions from transaction_table' });
            } else {
              const { tt_transaction_id } = results1;
              
              db.query('SELECT * FROM detail_table, transaction_table, account_table'
              + 'WHERE at_user_id = dt_userID AND at_account_id = dt_accountID'
              + 'AND tt_user_id = dt_userID AND tt_transaction_id = dt_transactionID AND dt_userID = ?'
              + 'AND dt_transactionID = ? AND at_account_type = ? ORDER BY dt_accountID, tt_date ASC',
              [req.user.username, tt_transaction_id, 'Balance'],
              (err, results2) => {
                const start_amount = [];
                const change_amount = [];
                const end_amount = [];
                const accountId = [];
                const accountName = [];
                if (err) {
                  debug(err);
                  res.status(500).json({ message: 'An error has occurred when getting transactions from detail_table' });
                } else {
                  let start = 0;
                  let end = 0;
                  for (let i = 0; i < results2.length; i += 1) {
                    let total_change = 0;
                    accountId.push(results2[i].dt_accountID);
                    accountName.push(results2[i].at_account_name);
                    //credit not null for first transaction
                    if(results2[i].dt_credit){
                      total_change -= results2[i].dt_credit;
                      start_amount.push('('+results2[i].dt_credit+')');
                      start = results2[i].dt_credit;
                    }
                    //debit not null for first transaction
                    else if(results2[i].dt_debit){ 
                      total_change += results2[i].dt_debit;
                      start_amount.push(results2[i].dt_debit);
                      start = results2[i].dt_debit;
                    }
                    //loop through same account_id
                    while(results2[i].dt_accountID === results2[i+1].dt_accountID){
                      if(results2[i+1].dt_credit)
                        total_change -= results2[i+1].dt_credit; 
                      else if(results2[i+1].dt_debit)
                        total_change += results2[i+1].dt_debit;
                      i++;
                    }
                    //push the total change amount for each account
                    if( total_change < 0)
                      change_amount.push('('+math.abv(total_change)+')');
                    else
                      change_amount.push(total_change);
                    //calculate the end amount
                    end = start + total_change;
                    if( end < 0)
                      end_amount.push('('+math.abv(end)+')');
                    else
                      end_amount.push(end);
                  }
                  //deal with return object
                  const output = {};
                  for (let i = 0; i < accountId.length; i += 1) {
                    output.i = { 
                      accountName: accountName[i], 
                      accountNumber: accountId[i],
                      start: start_amount[i], 
                      change: change_amount[i], 
                      end: end_amount[i]
                    };
                    res.status(200).json(output); 
                  }
                }
              });
            }
          });
      } else {
        res.status(401).json({ message: 'User not logged in' });
      }
    });

  
  
  statementRouter.route('/statement')
    .get((req, res) => {
      if (req.user) {
        const { dateFrom, dateTo } = req.body;
        db.query('SELECT * FROM transaction_table where tt_user_id = ? AND tt_date >= ? AND tt_date <= ?',
          [req.user.username, dateFrom, dateTo],
          (err, results1) => {
            if (err) {
              debug(err);
              res.status(500).json({ message: 'An error has occurred when getting transactions from transaction_table' });
            } else {
              const { tt_transaction_id } = results1;
              
              db.query('SELECT * FROM detail_table, transaction_table, account_table'
              + 'WHERE at_user_id = dt_userID AND at_account_id = dt_accountID'
              + 'AND tt_user_id = dt_userID AND tt_transaction_id = dt_transactionID AND dt_userID = ?'
              + 'AND dt_transactionID = ? AND at_account_type = ? ORDER BY dt_accountID, tt_date ASC',
              [req.user.username, tt_transaction_id, 'Income'],
              (err, results2) => {
                const end_amount = [];
                const accountId = [];
                const accountName = [];
                if (err) {
                  debug(err);
                  res.status(500).json({ message: 'An error has occurred when getting transactions from detail_table' });
                } else {
                  let start = 0;
                  let end = 0;
                  for (let i = 0; i < results2.length; i += 1) {
                    let total_change = 0;
                    accountId.push(results2[i].dt_accountID);
                    accountName.push(results2[i].at_account_name);
                    //credit not null for first transaction
                    if(results2[i].dt_credit){
                      total_change -= results2[i].dt_credit;
                      start = results2[i].dt_credit;
                    }
                    //debit not null for first transaction
                    else if(results2[i].dt_debit){ 
                      total_change += results2[i].dt_debit;
                      start = results2[i].dt_debit;
                    }
                    //loop through same account_id
                    while(results2[i].dt_accountID === results2[i+1].dt_accountID){
                      if(results2[i+1].dt_credit)
                        total_change -= results2[i+1].dt_credit; 
                      else if(results2[i+1].dt_debit)
                        total_change += results2[i+1].dt_debit;
                      i++;
                    }
                    //calculate the end amount
                    end = start + total_change;
                    if( end < 0)
                      end_amount.push('('+math.abv(end)+')');
                    else
                      end_amount.push(end);
                  }
                  //deal with return object
                  const output = {};
                  for (let i = 0; i < accountId.length; i += 1) {
                    output.i = { 
                      accountName: accountName[i], 
                      accountNumber: accountId[i], 
                      endAmount: end_amount[i]
                    };
                    res.status(200).json(output); 
                  }
                }
              });
            }
          });
      } else {
        res.status(401).json({ message: 'User not logged in' });
      }
    });

  return statementRouter;
};
