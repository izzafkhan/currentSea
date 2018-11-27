import React, { Component } from 'react';
import Header from '../Header.js';
import { Link } from "react-router-dom";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-table/react-table.css'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

var data = [
    {
         acctNum: '2193', acctName : 'Food', type: 'debit'
    }
    ,{acctNum: '2348203', acctName : 'Cash', type: 'credit'}
];
function onInsert(row){
    let newRow = '';
    
}

export default class Accounts extends Component{
    constructor(props){
        super(props);
       
    }
   
    
  render() {
    const cellEditP = {
        mode: 'click',
    }

      return(
        
        <div>     
            <Header/>
            <h1 align="center"> My Accounts </h1>
            <BootstrapTable data = {data}
                            insertRow = {true}
                            pagination = {true}
                            cellEdit = {cellEditP}
                            exportCSV
                            csvFileName = 'MyAccounts.csv'
                           

            >
                <TableHeaderColumn isKey dataField = 'acctNum'
                                    headerAlign="center"
                                    width = "40%"
                                    dataAlign = "right">
                                    
                    Account Number
                </TableHeaderColumn>
                <TableHeaderColumn dataField = 'acctName'
                                    dataAlign = "right">
                    Account Name
                </TableHeaderColumn>
            </BootstrapTable>
            
        </div>
  
       
    );
  }
};


