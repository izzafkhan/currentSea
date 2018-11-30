import React from 'react';
import Header from '../Header';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-table/react-table.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';


var data = [
    {
         symbol: '$',currency: 'USD', conversion : '0.342', change: '0.23%'
    }
    ,{symbol: 'Kr', currency: 'SEK', conversion : '1.00',change:'0.01%'}
];
function onInsert(row){
    let newRow = '';
    
}
export default class Currencies extends React.Component{
    render(){
        const cellEditP = {
            mode: 'click',
        }
        return(
            <div>
                <Header />
                <h1 align="center"> My Currencies </h1>
                <div class = "col-sm">
                <BootstrapTable data = {data}
                            insertRow = {true}
                            pagination = {true}
                            cellEdit = {cellEditP}
                            containerStyle = {
                                {
                                    width: "40%"
                                }
                            }

            >
                <TableHeaderColumn  dataField= 'symbol'
                                    headerAlign="center"
                                    width= "20%"

                                    dataAlign = "center"
                                     >
                    Symbol
                                   
                
                </TableHeaderColumn>
                <TableHeaderColumn isKey dataField = 'currency'
                                    headerAlign="center"
                                    width = "40%"
                                    dataAlign = "right">
                                    
                    Currency
                </TableHeaderColumn>
                <TableHeaderColumn dataField = 'conversion'
                                    dataAlign = "right">
                    1 "currency here"
                </TableHeaderColumn>

                <TableHeaderColumn dataField = 'change'
                                    dataAlign = "right">
                    Change(day)
                </TableHeaderColumn>
            </BootstrapTable>

            </div>
       
  
                
            </div>
        );
    }
}