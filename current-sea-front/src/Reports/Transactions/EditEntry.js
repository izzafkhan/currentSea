import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import './EditEntry.css';

export default class EditEntry extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [{
                'id' : '1000',
                'account' : 'Test Bank Account',
                'debit' : '100.00',
                'credit' : ' ',
                'category' : ' ',
                'currency' : ' '
    
            }, {
                'id' : '1100',
                'account' : 'Test Expense Account',
                'debit' : ' ',
                'credit' : '100.00',
                'category' : 'Test Expense',
                'currency' : ' '
            }]
        }
    }
    render(){
        return(
            <div>
                <table>
                    <thead id='headEntry'>
                        <tr>
                            <th>No.</th>
                            <th>Account</th>
                            <th>Debit</th>
                            <th>Balance</th>
                            <th>Credit</th>
                            <th>Category</th>
                            <th>Currency</th>
                        </tr>
                    </thead>
                    <tbody id='bodyEntry'>
                        {this.state.data.map(row => {
                            return(
                                <tr key={`row-${row.id}`}>
                                    <td>
                                        <div>{row.id}</div>
                                    </td>
                                    <td>{row.account}</td>
                                    <td>{row.debit}</td>
                                    <td>{row.balance}</td>
                                    <td>{row.credit}</td>
                                    <td>{row.category}</td>
                                    <td>{row.currency}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <button id='entryButton'>Delete</button>
            </div>
            
        );
    }
}

{/*
            <BootstrapTable
                keyField='id'
                data= {data}
                columns = {columns}
            />*/}

{/*
const columns = [{
            dataField:'id',
            text: '#'
        }, {
            dataField:'account',
            text: 'Account'
        }, {
            dataField:'debit',
            text: 'Debit'
        }, {
            dataField:'credit',
            text: 'Credit'
        }, {
            dataField:'category',
            text: 'Category'
        }, {
            dataField:'currency',
            text: 'Currency'
        }];
*/}