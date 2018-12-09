import React from 'react';
import './Accounts.css';
import CurrencyMenu from '../Currencies/CurrencyMenu';
import AddAccount from './AddAccount';
import $ from 'jquery'
import moment from "moment"
import Header from '../Header'
import Events from './Events';
import update from 'react-addons-update';
import EditAccount from './EditAccount';
import {confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

export default class Accounts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {


            showAddEntry: false,
            update: false,
            editableData: {},
            editUpdate: false,

            currentData: [{
                at_account_id: '',

                at_account_name: '',
                at_user_id: '',
                account_type: '',

            },]

        }
        this.get = this.get.bind(this);
        this.addRow = this.addRow.bind(this);
        this.editRow = this.editRow.bind(this);
        this.closeRow = this.closeRow.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.deleteEdit = this.deleteEdit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.addToTable = this.addToTable.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
    }


    addRow = () => {
        if (this.state.showAddEntry === false) {
            this.setState({
                showAddEntry: true
            });
        } else {
            this.setState({
                showAddEntry: false

            });
        }
    }

    addToTable(data) {

        this.setState({
            update: true
        })

    }

    closeRow(id) {
        this.state.showAddEntry = id;
        this.state.update = true;
        this.forceUpdate();
    }

    closeEdit(accountId) {
        let index = this.state.currentData.findIndex(x => x.accountId == accountId);
        let editData = this.state.currentData;
        editData[index].edit = false;
        this.setState({
            currentData: editData,
            update: true,
        });
        {/*Line 80 (was: editUpdate: true, which does nothing) is probably singlehandedly responsible for the problems we had today. Pitfall?*/
        }
    }

    deleteRow(e, at_account_id) {
        let index = this.state.currentData.findIndex(x => x.at_account_id == at_account_id);
        let rowData = this.state.currentData[index];
        let rowDataVar = {accountId: rowData.at_account_id};
        confirmAlert({
            title: 'Deleting account',
            message: 'Are you sure you would like to proceed?',
            buttons: [
                {
                    label: 'Ok',
                    onClick: () => $.ajax({
                        url: "http://34.220.102.40:4000/accounts/delete_account",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        crossDomain: true,
                        dataType: "json",
                        xhrFields: {withCredentials: true},
                        data: JSON.stringify(rowDataVar),
                        success: (data) => {
                            console.log("success inside");
                            this.setState({
                                update: true
                            });


                        },
                        error: () => {
                            console.log("Error: Could not submit");
                        }
                    })

                },
                {
                    label: 'Cancel',
                    onClick: () => this.forceUpdate()
                }
            ]
        })


    }

    deleteEdit(e, accountId) {
        let index = this.state.currentData.findIndex(x => x.accountId == accountId);
        let editData = this.state.currentData;
        var editIndex = editData.indexOf(index);
        editData.splice(editIndex, 1);
        this.setState({
            currentData: editData,
            update: true,
        });
        this.forceUpdate();
    }

    editRow = (e, at_account_id) => {
        let index = this.state.currentData.findIndex(x => x.at_account_id == at_account_id);
        let editData = this.state.currentData;
        if (editData[index].edit === false) {
            editData[index].edit = true;
            this.setState({
                currentData: editData,
                editUpdate: true
            });
        } else {
            editData[index].edit = false;
            this.setState({
                currentData: editData,
                editUpdate: true
            });
        }
    }

    get(event) {
        {/*
            We'll need to figure out how to use the API before we can convert
            things. We will use the currency chosen in CurrencyMenu for this.
        */
        }
        this.setState({
            original: event.target.value,
            conversion: event.target.value
        })
    }


    componentDidMount() {
        $.ajax({
            url: "http://34.220.102.40:4000/accounts/get_accounts",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            xhrFields: {withCredentials: true},
            success: (data) => {
                console.log(data.results)
                this.setState({

                    currentData: data.results

                });


            },
            error: () => {
                console.log("Error: Could not update.");
            }
        });
    }


    render() {
        if (this.state.update === true) {
            $.ajax({
                url: "http://34.220.102.40:4000/accounts/get_accounts",
                type: "GET",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                dataType: "json",
                xhrFields: {withCredentials: true},
                success: (data) => {
                    this.setState({
                        currentData: data.results,
                        update: false
                    });

                },
                error: () => {
                    console.log("Error: Could not update.");
                    this.setState({
                        update: false
                    })
                }
            });
        }
        return (
            <div>
                <table className="accountsTable">

                    <col width={100}/>
                    <col width={200}/>
                    <col width={100}/>
                    <col width={100}/>

                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Description</th>
                            <th>Type</th>
                            <th></th>

                        </tr>
                    </thead>

                    <tr>
                        <th colSpan='4'>
                            <button id='addAccountButton' onClick={e => this.addRow()}>+</button>
                            {this.state.showAddEntry ?
                                <div><AddAccount addEntry={this.state.showAddEntry} add={this.addToTable}
                                                 action={this.closeRow}/></div> : <span></span>}
                        </th>
                    </tr>

                    <tbody>

                    {this.state.currentData.map(row => {
                        return (
                            <tr  key={`row-${row.at_account_id}`} >
                                <td scope="row">{row.at_account_id}</td>
                                <td>{row.at_account_name}</td>
                                <td>{row.account_type}</td>
                                <td> <button className="accountDeleteButton"
                                             onClick={e => this.deleteRow(e, row.at_account_id)}> x
                                </button></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}
