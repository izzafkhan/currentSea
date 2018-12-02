import React from 'react';
import './Accounts.css';
import CurrencyMenu from '../Currencies/CurrencyMenu';
import AddAccount from './AddAccount';
import $ from 'jquery'
import moment from "moment"   
import Header from '../Header'

export default class Accounts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          
            conversion: "0.00",

            showAddEntry: false,
            update: false,
            editableData : {},
            editUpdate : false,

            currentData: [{
                accountID : '1900',
                accountName : 'Food',
                accountType: 'Balance',
                edit : false,

            }, {
                accountID : '1300',
                accountName : 'Rent',
                accountType: 'Balance',
                edit : false,
            }]

        }
        this.get = this.get.bind(this);
        this.income = this.income.bind(this);
        this.expenses = this.expenses.bind(this);
        this.addRow = this.addRow.bind(this);
        this.editRow = this.editRow.bind(this);
        this.closeRow = this.closeRow.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.deleteEdit = this.deleteEdit.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
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

    closeEdit(accountID, sum){
        let index = this.state.currentData.findIndex(x=>x.accountID==accountID);
        let editData = this.state.currentData;
        editData[index].edit = false;
        editData[index].tt_balance = sum;
        this.setState({
            currentData : editData,
            update: true,  
        });
        {/*Line 80 (was: editUpdate: true, which does nothing) is probably singlehandedly responsible for the problems we had today. Pitfall?*/}
    }

    deleteEdit(accountID){
        let index = this.state.currentData.findIndex(x=>x.accountID==accountID);
        let editData = this.state.currentData;
        var editIndex = editData.indexOf(index);
        editData.splice(editIndex, 1);
        this.setState({
            currentData : editData,
            update: true,
        });
        this.forceUpdate();
    }

    editRow = (e, accountID) => {
        let index = this.state.currentData.findIndex(x=>x.accountID==accountID);
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

    componentWillMount(){
       /* $.ajax({
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
        });*/
    }


    render() {
        if(this.state.update === true){
           /* $.ajax({
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
            });*/
        }
        return (
            <div> <Header/> 
            <h1 align="center"> Accounts </h1>
            <div class="tableContainer">
                <div className="account-table">
                    <table id='dataTableA'>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Description</th>
                                <th>Type</th>
                            </tr>
                            <tr>
                                <th colSpan='6'>
                                    <button id='addEntryButton' onClick={ e => this.addRow()}>+</button>
                                    {this.state.showAddEntry ? <div><h1>hi</h1></div>: <span></span>}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.currentData.map(row => {
                                return (
                                    <tr key={`row-${row.accountID}`}>
                                        <td colSpan='6'>
                                            <table>
                                                <tbody>
                                                    <tr id='nested'>
                                                        <td><button onClick={(e) =>{this.editRow(e, row.accountID)}}>{row.accountID}</button></td>
                                                        <td><button onClick={(e) =>{this.editRow(e, row.accountID)}}>{row.accountName}</button></td>
                                                        <td><button onClick={(e) =>{this.editRow(e, row.accountID)}}>{row.accountType}</button></td>
                                                    </tr>
                                                    {row.edit ?
                                                        <tr>
                                                            <td colSpan='6'>
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
            </div>
            </div>
        );
    }
}