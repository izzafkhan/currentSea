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
        

            showAddEntry: false,
            update: false,
            editableData : {},
            editUpdate : false,

            currentData: [{
                accountId : '',
                accountName : '',
                accountType: '',
                edit : false,

            }, {
                accountId : '',
                accountName : '',
                accountType: '',
                edit : false,
            }]

        }
        this.get = this.get.bind(this);
        this.addRow = this.addRow.bind(this);
        this.editRow = this.editRow.bind(this);
        this.closeRow = this.closeRow.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.deleteEdit = this.deleteEdit.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.addToTable =this.addToTable.bind(this);
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
        var newArray = this.state.currentData.slice();
           newArray.unshift(data);
        this.setState({
            currentData: newArray

        });
        this.forceUpdate();

    }

    closeRow(id){
        this.state.showAddEntry = id;
        this.state.update = true;
        this.forceUpdate();
    } 

    closeEdit(accountId){
        let index = this.state.currentData.findIndex(x=>x.accountId==accountId);
        let editData = this.state.currentData;
        editData[index].edit = false;
        this.setState({
            currentData : editData,
            update: true,  
        });
        {/*Line 80 (was: editUpdate: true, which does nothing) is probably singlehandedly responsible for the problems we had today. Pitfall?*/}
    }

    
    deleteEdit(accountId){
        let index = this.state.currentData.findIndex(x=>x.accountId==accountId);
        let editData = this.state.currentData;
        var editIndex = editData.indexOf(index);
        editData.splice(editIndex, 1);
        this.setState({
            currentData : editData,
            update: true,
        });
        this.forceUpdate();
    }

    editRow = (e, accountId) => {
        let index = this.state.currentData.findIndex(x=>x.accountId==accountId);
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


    componentWillMount(){
   /*     $.ajax({
            url: "http://localhost:4000/accounts/get_accounts",
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
                url: "http://localhost:4000/accounts/get_accounts",
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
            <h1 align="center" background="#051642"><br /> Accounts </h1>
            <h6 align="center"> Here you can set up, edit and delete your accounts<br /><br />. </h6>
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
                            {this.state.currentData.map(row => {
                                return (
                                    <tr key={`row-${row.accountID}`}>
                                        <td colSpan='6'>
                                            <table>
                                                <tbody>
                                                    <tr id='nested'>
                                                        <td><button onClick={(e) =>{this.editRow(e, row.accountId)}}>{row.accountId}</button></td>
                                                        <td><button onClick={(e) =>{this.editRow(e, row.accountId)}}>{row.accountName}</button></td>
                                                        <td><button onClick={(e) =>{this.editRow(e, row.accountId)}}>{row.accountType}</button></td>
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
