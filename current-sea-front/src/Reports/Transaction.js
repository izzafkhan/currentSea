import React from 'react';
import './Transaction.css';
import CurrencyMenu from '../Currencies/CurrencyMenu';

class Transaction extends React.Component{
    constructor(){
        super();
        this.state = {
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

    render(){
        return(
            <div class="container">
                <div class="transaction-table">
                    <table className="Transaction-table">
                        <thead>
                            <tr>
                                <th id="header-number">
                                    <div className="Transaction-number"> Number </div>
                                </th>
                                <th id="header-date">    
                                    <div className="Transaction-date"> Date </div>
                                </th>
                                <th id="header-description">
                                    <div className="Transaction-description"> Description </div>
                                </th>
                                <th id="header-balance">
                                    <div className="Transaction-balance"> Balance </div>
                                </th>
                                <th id="header-df">
                                    <div className="Transaction-df"> DF </div>
                                </th>
                                <th id="header-category">
                                    <div className="Transaction-category"> Category </div>
                                </th>
                                <th id="header-add">
                                    <div className="Transaction-add"> <button id="addButton"></button> </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="Transaction-body">
                        {/*
                        
                                Below is a demo of what entries will look like
                                when they are added to the table. Remove the 
                                comments to preview.
                        -----------------------------------------------------------
                            <tr>
                                <td className="Transaction-entryLeft">Books</td>
                                <td className="Transaction-entryRight">$400</td>
                            </tr>
                            <tr>
                                <td className="Transaction-entryLeft">Books</td>
                                <td className="Transaction-entryRight">$400</td>
                            </tr>
                        */}
                        </tbody>
                    </table>
                </div>
                <div class="quick">
                    <div class="summary">
                        <h2>Summary</h2>
                        <button>Income</button>
                        <button>Expenses</button>
                        <div>
                            <span class="dot"></span>
                            <p>{this.state.income1}</p>
                            <p>{this.state.expense1}</p>
                        </div>
                        <div>
                            <span class="dot"></span>
                            <p>{this.state.income2}</p>
                            <p>{this.state.expense2}</p>
                        </div>
                        <div>
                            <span class="dot"></span>
                            <p>{this.state.income3}</p>
                            <p>{this.state.expense3}</p>
                        </div>
                        <div>
                            <span class="dot"></span>
                            <p>{this.state.other}</p>
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