import React from 'react';
import './Accounts.css';
import CurrencyMenu from '../Currencies/CurrencyMenu';
import AddAccount from './AddAccount';
import $ from 'jquery'
import moment from "moment"   
import Header from '../Header'
import Events from './Events';
import update from 'react-addons-update';

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
        this.get = this.get.bind(this);
        this.addRow = this.addRow.bind(this);
        this.editRow = this.editRow.bind(this);
        this.closeRow = this.closeRow.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.deleteEdit = this.deleteEdit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
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
        /*var newArray = this.state.currentData.slice();
           newArray.unshift(data);
        this.setState({
            currentData: newArray

        });*/
       /* $.ajax({
            url: "http://localhost:4000/accounts/add_account",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType:"json",
            xhrFields: { withCredentials:true },
            data: JSON.stringify(data),
            success: () => {
                this.action(false);
                 this.setState({
                     update:true
                 });
               

            },
            error: () => {
                 console.log("Error: Could not submit");
                 this.action(false);
            }
        })
        this.forceUpdate();*/
        this.setState({
            update:true
        })

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


    componentDidMount(){
       $.ajax({
            url: "http://localhost:4000/accounts/get_accounts",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType:"json",
            xhrFields: {withCredentials:true},
            success: (data) => {
                
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
            <div class="bigContainer"> 
            <Header/> 
            <h1>Accounts</h1>
            <h6> Here you can set up, edit and delete your accounts</h6>
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
                                    <tr key={`row-${row.accountID}`}>
                                        <td colSpan='6'>
                                            <table>
                                                <tbody>
                                                    <tr id='nested'>
                                                        <td><button onClick={(e) =>{this.editRow(e, row.at_account_id)}}>{row.at_account_id}</button></td>
                                                        <td><button onClick={(e) =>{this.editRow(e, row.at_account_id)}}>{row.at_account_name}</button></td>
                                                        <td><button onClick={(e) =>{this.editRow(e, row.at_account_id)}}>{row.account_type}</button></td>
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
