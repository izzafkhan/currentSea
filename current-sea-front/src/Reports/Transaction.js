import React from 'react';
import './Transaction.css';
import CurrencyMenu from '../Currencies/CurrencyMenu';
import AddEntry from './Transactions/AddEntry';
import EditEntry from './Transactions/EditEntry';
import $ from 'jquery'
import moment from "moment"   

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

            currentData: [{
                tt_transaction_id : 0,
                tt_date : '2018 January 1',
                tt_description: 'New Entries Go Here',
                tt_balance: 0,
                tt_currency: 'USD',
                tt_user_id : 'This will later become categories',

            }]

        }
        this.get = this.get.bind(this);
        this.income = this.income.bind(this);
        this.expenses = this.expenses.bind(this);
        this.addRow = this.addRow.bind(this);
        this.editRow = this.editRow.bind(this);
        this.closeRow = this.closeRow.bind(this);
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

    closeRow(id){
        this.state.showAddEntry = id;
        this.forceUpdate();
    } 

    editRow = (tt_transaction_id) => {
        const { data } = this.state.currentData;
        if (data[tt_transaction_id].edit === false) {
            data[tt_transaction_id].edit = true;
            this.setState({data});
        } else {
            data[tt_transaction_id].edit = false;
            this.setState({data});
        }
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

        $.ajax({
            url: "http://localhost:4000/transactions/get_transactions",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType:"json",
            xhrFields: {withCredentials:true},
            success: (data) => {
                this.setState({
                    currentData : data
                });
            },
            error: () => {
                 console.log("Error: Could not update.");
            }
        });

        return (
            <div class="myContainer">
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
                                    {this.state.showAddEntry ? <div><AddEntry addEntry={this.state.showAddEntry} action={this.closeRow}/></div> : <span></span>}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.currentData.map(row => {
                                return (
                                    <tr key={`row-${row.tt_transaction_id}`}>
                                        <td colSpan='6'>
                                            <table>
                                                <tbody>
                                                    <tr id='nested'>
                                                        <td><button onClick={e => this.editRow(row.tt_transaction_id)}>{row.tt_transaction_id}</button></td>
                                                        <td><button onClick={e => this.editRow(row.tt_transaction_id)}>{(moment(row.tt_date)).format('YYYY-MM-DD')}</button></td>
                                                        <td><button onClick={e => this.editRow(row.tt_transaction_id)}>{row.tt_description}</button></td>
                                                        <td><button onClick={e => this.editRow(row.tt_transaction_id)}>{row.tt_balance}</button></td>
                                                        <td><button onClick={e => this.editRow(row.tt_transaction_id)}>{row.tt_currency}</button></td>
                                                        <td><button onClick={e => this.editRow(row.tt_transaction_id)}>{row.tt_user_id}</button></td>
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