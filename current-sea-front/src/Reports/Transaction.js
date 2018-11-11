import React from 'react';
import './Transaction.css';
import ReactTable from 'react-table';
import CurrencyMenu from '../Currencies/CurrencyMenu';

class Transaction extends React.Component{
    constructor(){
        super();
        this.state = {
            showIncome : true,
            income1 : "Income 1",
            income2 : "Income 2",
            income3 : "Income 3",

            expense1 : "Expense 1",
            expense2 : "Expense 2",
            expense3 : "Expense 3",

            other : "Other",

            original: "0.00",
            conversion: "0.00"
        }
        this.get = this.get.bind(this);
        this.income = this.income.bind(this);
        this.expenses = this.expenses.bind(this);
    }

    get(event){
        {/*
            We'll need to figure out how to use the API before we can convert
            things. We will use the currency chosen in CurrencyMenu for this.
        */}
        this.setState({
            original : event.target.value,
            conversion : event.target.value
        })
    }

    income(event){
        this.setState({
            showIncome: true
        })
    }

    expenses(event){
        this.setState({
            showIncome : false
        })
    }

    render(){
        var columns = [{
                Header: 'Number',
                Accessor: 'number',
                Cell: props => <span className='number'>{props.value}</span>
            }, {
                Header: 'Date',
                Accessor : 'date',
                Cell: props => <span className='date'>{props.value}</span>
            }
        ]
        return(
            <div class="container">
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
                </table>
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
                                    <p>{this.state.expense1}</p> }
                                </span>
                            </div>
                            <div class="summary2">
                                <span class="dot"></span>
                                <span class="text">
                                    {this.state.showIncome ?
                                    <p>{this.state.income2}</p> :
                                    <p>{this.state.expense2}</p> }
                                </span>
                            </div>
                        </div>
                        <div class="row2">
                            <div class="summary3">
                                <span class="dot"></span>
                                <span class="text">
                                    {this.state.showIncome ?
                                    <p>{this.state.income3}</p> :
                                    <p>{this.state.expense3}</p> }
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
                        <input type="number" value={this.state.original} onChange={this.get}/>
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

export default Transaction;