import React from 'react';
import './Accounts.css';
import CurrencyMenu from '../Currencies/CurrencyMenu';
import AddAccount from './AddAccount';
import $ from 'jquery'
import moment from "moment"   
import Header from '../Header'
import Events from './Events';
import update from 'react-addons-update';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

export default class Accounts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        

            showAddEntry: false,
            update: false,
            editableData : {},
            editUpdate : false,

            currentData: [{
                at_account_id: '',
              
                at_account_name : '',
                at_user_id: '',
                account_type: '',

            },]

        }
        this.addRow = this.addRow.bind(this);
        this.closeRow = this.closeRow.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.addToTable =this.addToTable.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
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

    addToTable(data){
       
        this.setState({
            update:true
        })

    }

    
    closeRow(id){
        this.state.showAddEntry = id;
        this.state.update = true;
        this.forceUpdate();
    } 

    
    deleteRow(e,at_account_id){
        let index = this.state.currentData.findIndex(x=>x.at_account_id ==at_account_id);
        let rowData = this.state.currentData[index];
        let rowDataVar = {accountId:rowData.at_account_id};

        confirmAlert({
            title: 'Confirm Deletion',
            message: 'Are you sure you want to delete this account permanently?',
            buttons: [
                {
                    label: 'Ok',
                    onClick: () => $.ajax({
                        url: "http://localhost:4000/accounts/delete_account",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        crossDomain: true,
                        dataType:"json",
                        xhrFields: { withCredentials:true },
                        data: JSON.stringify(rowDataVar),
                        success: (data) => {
                             this.setState({
                                 update:true
                             });
                           
            
                        },
                        error: (data) => {
                             console.log("Error: Could not submit");
                             alert(data.responseJSON.message);
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

    
    componentDidMount(){
       $.ajax({
            url: "http://localhost:4000/accounts/get_accounts",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType:"json",
            xhrFields: {withCredentials:true},
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
        if(this.state.update === true){
          $.ajax({
                url: "http://localhost:4000/accounts/get_accounts",
                type: "GET",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                dataType:"json",
                xhrFields: {withCredentials:true},
                success: (data) => {
                    this.setState({
                        currentData : data.results,
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
            <div> 
            
            <h1 align="center" background="#051642"><br /> Account Settings </h1>
            <h6 align="center"> Here you can set up, edit and delete your accounts and events<br /><br /> </h6>

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
                                    <button id='addAccountButton' onClick={ e => this.addRow()}>+</button>
                                    {this.state.showAddEntry ? <div><AddAccount addEntry={this.state.showAddEntry} add={this.addToTable} action={this.closeRow}/></div> : <span></span>}                                </th>
                                 
                            </tr>
                        </thead>
                        <tbody>
                           { this.state.currentData.map(row => {
                                return (
                                    <tr key={`row-${row.at_account_id}`}>
                                        <td colSpan='6'>
                                            <table>
                                                <tbody>
                                                    <tr id='nested'>
                                                        <td><button>{row.at_account_id}</button></td>
                                                        <td><button>{row.at_account_name}</button></td>
                                                        <td><button>{row.account_type}</button></td>
                                                        <button id='deleteButton' onClick={e => this.deleteRow(e,row.at_account_id)}> x </button>
                                                    </tr>
                                                   
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
