import React from 'react';
import './Events.css';
import CurrencyMenu from '../Currencies/CurrencyMenu';
import AddEvent from './AddEvent';
import $ from 'jquery'
import moment from "moment"
import Header from '../Header'
import ChromePicker from 'react-color'
import update from 'react-addons-update';
import {confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'
import AddAccount from "./AddAccount"; // Import css

export default class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {


            showAddEntry: false,
            update: false,
            editableData: {},
            editUpdate: false,

            currentData: [{
                et_event_abv: '',
                et_event_name: '',
                et_event_id: '',
                et_event_color: '',

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
        this.deleteRowE = this.deleteRowE.bind(this);
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

    deleteRowE(e, et_event_id) {
        let index = this.state.currentData.findIndex(x => x.et_event_id == et_event_id);
        let rowDataVar = {eventId: et_event_id}
        confirmAlert({
            title: 'Confirm Deletion',
            message: 'Deleting Event Permanently',
            buttons: [
                {
                    label: 'Ok',
                    onClick: () => $.ajax({
                        url: "http://localhost:4000/event/delete_event",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        crossDomain: true,
                        dataType: "json",
                        xhrFields: {withCredentials: true},
                        data: JSON.stringify(rowDataVar),
                        success: (data) => {
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

    deleteEdit(accountId) {
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

    editRow = (e, accountId) => {
        let index = this.state.currentData.findIndex(x => x.accountId == accountId);
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
            url: "http://localhost:4000/event/get_all_events/",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            xhrFields: {withCredentials: true},
            success: (data) => {
                console.log(data);
                this.setState({

                    currentData: data

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
                url: "http://localhost:4000/event/get_all_events/",
                type: "GET",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                dataType: "json",
                xhrFields: {withCredentials: true},
                success: (data) => {
                    this.setState({
                        currentData: data,
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
                        <th>Abbr.</th>
                        <th>Name</th>
                        <th>Color</th>
                        <th></th>

                    </tr>
                    </thead>

                    <tr>
                        <th colSpan='4'>
                            <button id='addAccountButton' onClick={e => this.addRow()}>+</button>
                            {this.state.showAddEntry ?
                                <div><AddEvent addEntry={this.state.showAddEntry} add={this.addToTable}
                                               action={this.closeRow}/></div> : <span></span>}
                        </th>
                    </tr>

                    <tbody>

                    {this.state.currentData.map(row => {
                        return (
                            <tr key={`row-${row.at_account_id}`}>
                                <td scope="row">{row.et_event_abv}</td>
                                <td>{row.et_event_name}</td>
                                <td>{<svg height="25" width="25">
                                    <circle cx="12.5" cy="12.5" r="10" stroke={row.et_event_color} stroke-width="3" fill= {row.et_event_color} />
                                </svg>}</td>
                                <td>
                                    <button className="accountDeleteButton"
                                            onClick={e => this.deleteRowE(e, row.et_event_id)}> x
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>

            </div>

        );
    }
}
