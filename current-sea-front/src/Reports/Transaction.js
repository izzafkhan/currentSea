import React from 'react';
import './Transaction.css';
import CurrencyMenu from '../Currencies/CurrencyMenu';
import Header from '../Header'
import AddEntry from './Transactions/AddEntry';
import EditEntry from './Transactions/EditEntry';
import $ from 'jquery'
import moment from "moment"
import Select from 'react-select';   

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

            showAddEntry: false,
            update: false,
            editableData : {},
            editUpdate : false,

            currentData: [{
                tt_transaction_id : 0,
                tt_date : '2018 January 1',
                tt_description: 'New Entries Go Here',
                tt_balance: 0,
                tt_currency: 'USD',
                tt_user_id : 'This will later become categories',
                edit : false,

            }],
            convertCurrencies: [],
            startCurrency: {label: '', value: ''},
            endCurrency: {label: '', value: ''},
            original: 0,
            rate : 1,
            conversion: 0,

        }
        this.convert = this.convert.bind(this);
        this.income = this.income.bind(this);
        this.expenses = this.expenses.bind(this);
        this.addRow = this.addRow.bind(this);
        this.editRow = this.editRow.bind(this);
        this.closeRow = this.closeRow.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.deleteEdit = this.deleteEdit.bind(this);
        this.handleStartCurrency = this.handleStartCurrency.bind(this);
        this.handleEndCurrency = this.handleEndCurrency.bind(this);
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
        this.state.update = true;
        this.forceUpdate();
    } 

    closeEdit(tt_transaction_id, sum){
        let index = this.state.currentData.findIndex(x=>x.tt_transaction_id==tt_transaction_id);
        let editData = this.state.currentData;
        editData[index].edit = false;
        editData[index].tt_balance = sum;
        this.setState({
            currentData : editData,
            update: true,  
        });
        {/*Line 80 (was: editUpdate: true, which does nothing) is probably singlehandedly responsible for the problems we had today. Pitfall?*/}
    }

    deleteEdit(tt_transaction_id){
        let index = this.state.currentData.findIndex(x=>x.tt_transaction_id==tt_transaction_id);
        let editData = this.state.currentData;
        var editIndex = editData.indexOf(index);
        editData.splice(editIndex, 1);
        this.setState({
            currentData : editData,
            update: true,
        });
        this.forceUpdate();
    }

    editRow = (e, tt_transaction_id) => {
        let index = this.state.currentData.findIndex(x=>x.tt_transaction_id==tt_transaction_id);
        let editData = this.state.currentData;
        if (editData[index].edit === false) {
            editData[index].edit = true;
            this.setState({
                currentData : editData,
                editUpdate : true
            });
        } else {
            editData[index].edit = false;
            this.setState({
                currentData : editData,
                editUpdate : true
            });
        }
    }

    handleStartCurrency(event){
        this.setState({
            startCurrency : event
        })
    }

    handleEndCurrency(event){
        this.setState({
            endCurrency : event
        })
    }

    convert(event) {
        var from = this.state.startCurrency.value;
        var to = this.state.endCurrency.value;
        $.ajax({
            url: "http://localhost:4000/currencies/getrate",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType:"json",
            xhrFields: {withCredentials:true},
            data : JSON.stringify({from, to}),
            success: (data) => {
                console.log(data);
                this.setState({
                    rate : parseFloat(data.rate) 
                })
            },
            error: () => {
                 console.log("Error: Could not update.");
            }
        });
        this.state.original = parseFloat(event.target.value);
        this.setState({
            conversion : (typeof (this.state.rate * this.state.original) == 'number') ? (this.state.rate * this.state.original) : 0
        })
        var test = event.target.value;
        console.log(test);
        console.log(parseFloat(test));
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

    componentDidMount(){
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

        $.ajax({
            url: "http://localhost:4000/currencies/currencies",
           type: "GET",
           contentType: "application/json; charset=utf-8",
           crossDomain: true,
           dataType:"json",
           xhrFields: { withCredentials:true },
           success: (data) => {
               let currencies = []
                for (let i = 0; i < data.currencies.length; i++) {
                    const newRow = {value: '', label: ''};
                    newRow.value = data.currencies[i];
                    newRow.label = data.currencies[i];
                    currencies[i] = newRow;
                }
                this.setState({convertCurrencies: currencies,
                    startCurrency : currencies[31],
                    endCurrency: currencies[8]    
                })
           },
           error: () => {
                console.log("Error: Could not fetch data");
           }
        });
    }


    render() {
        if(this.state.update === true){
            $.ajax({
                url: "http://localhost:4000/transactions/get_transactions",
                type: "GET",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                dataType:"json",
                xhrFields: {withCredentials:true},
                success: (data) => {
                    this.setState({
                        currentData : data,
                        update: false
                    });
                },
                error: () => {
                     console.log("Error: Could not update.");
                     this.setState({
                         update : false
                     })
                }
            });
        }
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
                                                        <td><button onClick={(e) =>{this.editRow(e, row.tt_transaction_id)}}>{row.tt_transaction_id}</button></td>
                                                        <td><button onClick={(e) =>{this.editRow(e, row.tt_transaction_id)}}>{(moment(row.tt_date)).format('YYYY-MM-DD')}</button></td>
                                                        <td><button onClick={(e) =>{this.editRow(e, row.tt_transaction_id)}}>{row.tt_description}</button></td>
                                                        <td><button onClick={(e) =>{this.editRow(e, row.tt_transaction_id)}}>{row.tt_balance}</button></td>
                                                        <td><button onClick={(e) =>{this.editRow(e, row.tt_transaction_id)}}>{row.tt_currency}</button></td>
                                                        <td><button onClick={(e) =>{this.editRow(e, row.tt_transaction_id)}}>{row.tt_user_id}</button></td>
                                                    </tr>
                                                    {row.edit ?
                                                        <tr>
                                                            <td colSpan='6'>
                                                                <EditEntry editData={this.state.editableData} id={row.tt_transaction_id} makeEdit={row.edit} deleteAction={this.deleteEdit} closeAction={this.closeEdit}/>
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
                        <input type="number" defaultValue={this.state.original} onInput={this.convert} />
                        <Select id='start-currency' options={this.state.convertCurrencies} defaultValue={this.state.startCurrency} onChange={this.handleStartCurrency}/>
                        <h3>=</h3>
                        <p>{this.state.conversion}</p>
                        <Select id='end-currency' options={this.state.convertCurrencies} defaultValue={this.state.endCurrency} onChange={this.handleEndCurrency}/>
                    </div>
                </div>
            </div>
        );
    }
}