import React from 'react';
import './Transaction.css';
import CurrencyMenu from '../Currencies/CurrencyMenu';
import AddEntry from './Transactions/AddEntry';
import EditEntry from './Transactions/EditEntry';   

export default class Transaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showIncome: true,
            income1: "Income 1",
            income2: "Income 2",
            income3: "Income 3",

            expense1: "Expense 1",
            expense2: "Expense 2",
            expense3: "Expense 3",

            other: "Other",

            original: "0.00",
            conversion: "0.00",

            showAddEntry: false,

            data: [{
                'transactionId': '0',
                'edit': false
            },
            {
                'accountId' : 'Wells Fargo Bank Account',
                'userID' : 'user',
                'transactionId': '1',
                'date': '2018/11/21',
                'eventId': 'Side Expense',
                'description': 'Test Entry',
                'debitAmt' : '100.00',
                'creditAmt': '100.00',
                'balance': '100.00',
                'currencyId': 'USD',
                'edit': false
            }]

        }
        this.get = this.get.bind(this);
        this.income = this.income.bind(this);
        this.expenses = this.expenses.bind(this);
        this.addRow = this.addRow.bind(this);
        this.editRow = this.editRow.bind(this);
        this.addData = this.addData.bind(this);
    }

    addRow = () => {
        if (this.state.showAddEntry === false){
            this.setState({
                showAddEntry: true
            });
        } else {
            this.setState({
                showAddEntry: false
            });
        }
    }

    editRow = (transactionId) => {
        const { data } = this.state
        if (data[transactionId].edit === false) {
            data[transactionId].edit = true;
            this.setState({data});
        } else {
            data[transactionId].edit = false;
            this.setState({data});
        }
    }

    addData = (newData) => {
        var data = this.state.data;
        var indexedData = newData;
        indexedData.transactionID = '0';
        indexedData.edit = false;
        indexedData.balance = newData.debitAmt;
        this.setState({
            showAddEntry: false
            
        })
        var joined = indexedData + data;     
        this.setState({
            data: joined
        })
    }

    get(event) {
        {/*
            We'll need to figure out how to use the API before we can convert
            things. We will use the currency chosen in CurrencyMenu for this.
        */}
        this.setState({
            original: event.target.value,
            conversion: event.target.value
        })
    }

    income() {
        this.setState({
            showIncome: true
        })
    }

    expenses() {
        this.setState({
            showIncome: false
        })
    }

    render() {

        return (
            <div class="container">
                <div className="transaction-table">
                    <table id='dataTable' width="600">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Balance</th>
                                <th>DF</th>
                                <th>Category</th>
                            </tr>
                            <tr>
                                <th colSpan='6'>
                                    <button id='addEntryButton' onClick={ e => this.addRow()}>+</button>
                                    {this.state.showAddEntry ? <div><AddEntry onAddData={this.addData}/></div> : <span></span>}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map(row => {
                                return (
                                    <tr key={`row-${row.transactionId}`}>
                                        <td colSpan='6'>
                                            <table>
                                                <tbody>
                                                    <tr id='nested'>
                                                        <td><button onClick={e => this.editRow(row.transactionId)}>{row.transactionId}</button></td>
                                                        <td><button onClick={e => this.editRow(row.transactionId)}>{row.date}</button></td>
                                                        <td><button onClick={e => this.editRow(row.transactionId)}>{row.description}</button></td>
                                                        <td><button onClick={e => this.editRow(row.transactionId)}>{row.balance}</button></td>
                                                        <td><button onClick={e => this.editRow(row.transactionId)}>{row.currencyId}</button></td>
                                                        <td><button onClick={e => this.editRow(row.transactionId)}>{row.event}</button></td>
                                                    </tr>
                                                    {row.edit ?
                                                        <tr>
                                                            <td colSpan='6'>
                                                                <EditEntry />
                                                            </td>
                                                        </tr> : <tr></tr>}
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div class="quick">
                    <div class="summary">
                        <h2>Summary</h2>
                        <button onClick={this.income} >Income</button>
                        <button onClick={this.expenses}>Expenses</button>
                        <div class="row1">
                            <div class="summary1">
                                <span class="dot"></span>
                                <span class="text">
                                    {this.state.showIncome ?
                                        <p>{this.state.income1}</p> :
                                        <p>{this.state.expense1}</p>}
                                </span>
                            </div>
                            <div class="summary2">
                                <span class="dot"></span>
                                <span class="text">
                                    {this.state.showIncome ?
                                        <p>{this.state.income2}</p> :
                                        <p>{this.state.expense2}</p>}
                                </span>
                            </div>
                        </div>
                        <div class="row2">
                            <div class="summary3">
                                <span class="dot"></span>
                                <span class="text">
                                    {this.state.showIncome ?
                                        <p>{this.state.income3}</p> :
                                        <p>{this.state.expense3}</p>}
                                </span>
                            </div>
                            <div class="other">
                                <span class="dot"></span>
                                <span class="text"><p>{this.state.other}</p> </span>
                            </div>
                        </div>
                    </div>

                    <div class="conversion">
                        <h2>Currency Conversion</h2>
                        <input type="number" value={this.state.original} onChange={this.get} />
                        <CurrencyMenu />
                        <h3>=</h3>
                        <p>{this.state.conversion}</p>
                        <CurrencyMenu />
                    </div>
                </div>
            </div>
        );
    }
}
{/*
<table class="transaction-table">
    <thead>
        <tr>
            <th>
                <div class="header-name"> Number </div>
            </th>
            <th>    
                <div class="header-name"> Date </div>
            </th>
            <th>
                <div class="header-name"> Description </div>
            </th>
            <th>
                <div class="header-name"> Balance </div>
            </th>
            <th>
                <div class="header-name"> DF </div>
            </th>
            <th>
                <div class="header-name"> Category </div>
            </th>
            <th>
                <div class="header-name"> <button id="addButton">+</button> </div>
            </th>
        </tr>
    </thead>
    <tbody className="Transaction-body">
    </tbody>
</table>*/}


{/*<ReactTable
        data = {data}
        noDataText="Add a new Transaction"
        columns = {columns}
    />*/}

{/*
        var { data = [] } = this.props
        var columns = [{
                Header: 'Number',
                accessor: 'number'
            }, {
                Header: 'Date',
                accessor : 'date'
            }, {
                Header: 'Description',
                accessor: 'description'
            }, {
                Header: 'Balance',
                accessor: 'balance'
            }, {
                Header: 'DF',
                accessor: 'df'
            }, {
                Header: 'Category',
                accessor: 'category'
            }
        ]*/}
{/*
<BootstrapTable 
                        keyField='id'
                        data={data}
                        columns = {columns}
                        expandRow={expandRow}
                    />
*/}
{/*
var data = [{
            'id': '0'
        },
            {
            'id': '1',
            'date': '11/21/2018',
            'description': 'Test Entry',
            'balance' : '100.00',
            'df' : '$',
            'category': 'Side Expense'
        }];
        const columns = [{
            dataField: 'id',
            text: ' '
        }, {
            dataField: 'date',
            text: 'Date'
        }, {
            dataField: 'description',
            text: 'Description'
        }, {
            dataField: 'balance',
            text: 'Balance'
        }, {
            dataField: 'df',
            text: 'DF'
        }, {
            dataField: 'category',
            text: 'Category'
        }];

        const expandRow = {
            renderer: row => (
                <div>
                    <EditEntry></EditEntry>
                </div>
            )
        };
    */}