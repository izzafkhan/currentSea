import React from 'react';
import ReactDOM from 'react-dom';
import './Transaction.css';
import BootstrapTable from 'react-bootstrap-table-next';
import CurrencyMenu from '../Currencies/CurrencyMenu';
import AddEntry from './Transactions/AddEntry';
import EditEntry from './Transactions/EditEntry';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { EditorFormatStrikethrough } from 'material-ui/svg-icons';

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
                'id': '0',
                'edit': false
            },
            {
                'id': '1',
                'date': '11/21/2018',
                'description': 'Test Entry',
                'balance': '100.00',
                'df': '$',
                'category': 'Side Expense',
                'edit': false
            }]

        }
        this.get = this.get.bind(this);
        this.income = this.income.bind(this);
        this.expenses = this.expenses.bind(this);
        this.addRow = this.addRow.bind(this);
        this.editRow = this.editRow.bind(this);
        this.renderTable = this.renderTable.bind(this);
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

    editRow = (id) => {
        const { data } = this.state
        if (data[id].edit === false) {
            data[id].edit = true;
            this.setState({data});
        } else {
            data[id].edit = false;
            this.setState({data});
        }
    }

    finishRow() {
        this.setState({
            showAddEntry: false
        })
    }

    renderTable() {
        return (
            <tr>
                <td>Hello</td>
            </tr>
        );
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
                                    <button onClick={ e => this.addRow()}>+</button>
                                    {this.state.showAddEntry ? <div><AddEntry /></div> : <span></span>}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map(row => {
                                return (
                                    <tr key={`row-${row.id}`}>
                                        <td colSpan='6'>
                                            <table id='nested'>
                                                <tbody>
                                                    <tr>
                                                        <td>{row.id}</td>
                                                        <td>{row.date}</td>
                                                        <td><button onClick={e => this.editRow(row.id)}>{row.description}</button></td>
                                                        <td>{row.balance}</td>
                                                        <td>{row.df}</td>
                                                        <td>{row.category}</td>
                                                    </tr>
                                                    {row.edit ?
                                                        <tr>
                                                            <td colSpan='6'>
                                                                <EditEntry />
                                                            </td>
                                                        </tr> : <span></span>}
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