import React from 'react';
import Select from 'react-select'; 
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import './EditEntry.css';
import $ from 'jquery'

export default class EditEntry extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : [{                
            }],
            action_id : 0,
            update : false,
            accounts : this.props.accounts,
            currencies : this.props.currencies,
            events : this.props.events,
            myAccounts : [],
            myEvents : this.props.myEvents,
            transactionInfo : this.props.transactionInfo,
        }
        this.addinfo = this.addinfo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleCurrency = this.handleCurrency.bind(this);
        this.save = this.save.bind(this);
        this.remove = this.remove.bind(this);
        this.submitDelete = this.submitDelete.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    submitDelete = () => {
        confirmAlert({
            title: 'Confirm Deletion',
            message: 'Do you want to delete this transaction permanently?',
            buttons: [
                {
                    label: 'Ok',
                    onClick: () => this.remove()
                },
                {
                    label: 'Cancel',
                    onClick: () => this.forceUpdate()
                }
            ]
        })
        
    }

    addinfo = () => {
        var internalEntries = this.state.data.slice(0);

        let newRow = {
            dt_transactionID: this.state.action_id,
            dt_userID: this.state.data[0].dt_userID,
            dt_accountID : '',
            dt_debit : 0,
            dt_credit : 0,
            dt_eventID : 0,
        };

        internalEntries.push(newRow);
        this.setState({
            data : internalEntries,
        })
    }

    handleChange(row, entry, event) {
        if (entry == "dt_accountID") {
            row[entry] = event.value;
        } else if( entry == "dt_eventID"){
            row[entry] = event.label;
        } else {
            row[entry] = event.target.type === 'number' ? parseFloat(event.target.value) : event.target.value;
        }
    }

    handleDescription(event){
        this.state.transactionInfo.tt_description = event.target.value;
    }

    handleCurrency(event){
        this.state.transactionInfo.tt_currency = event.label;
    }
    save(){
        var sum = 0;
        var checkCredit = 0;
        var validEntry = true;
        for(let i = 0; i < this.state.data.length; i++){
            
            sum += this.state.data[i].dt_debit;
            checkCredit += this.state.data[i].dt_credit;

            if(this.state.data[i].dt_debit != 0 && this.state.data[i].dt_credit != 0){
                validEntry = false;
            }
        }
        if(checkCredit != 0 && checkCredit == sum){
            if(validEntry){
                $.ajax({
                    url: "http://localhost:4000/transactions/edit_transactions",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    crossDomain: true,
                    dataType:"json",
                    xhrFields: { withCredentials:true },
                    data: JSON.stringify({  'tt_transaction_id' : this.state.action_id,
                                            'data': this.state.data, 
                                            'tt_balance': sum, 
                                            'tt_currency' : this.state.transactionInfo.tt_currency, 
                                            'tt_description' : this.state.transactionInfo.tt_description}),
                    success: () => {
                        this.setState({
                            update: true,
                        })
                        this.props.closeAction(this.state.action_id, sum);
                    },
                    error: () => {
                        console.log("Error: Could not submit");
                        this.props.closeAction(this.state.action_id, 0);
                    }
                })
            } else {
                alert("You cannot have a credit and debit in the same field.")
            }
        } else {
            alert("Debit and Credit fields must remain equal and filled out.")
        }
    }

    remove(){
        $.ajax({
            url: "http://localhost:4000/transactions/delete_transactions",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType:"json",
            xhrFields: { withCredentials:true },
            data: JSON.stringify({'tt_transaction_id': this.state.action_id}),
            success: () => {
                this.props.deleteAction(this.state.action_id);
                this.setState({
                    update: true,
                })
            },
            error: () => {
                 console.log("Error: Could not submit");
                 this.props.deleteAction(this.state.action_id);
            }
        })
    }

    cancel(row){
        let index = this.state.data.indexOf(row);
        this.state.data.splice(index, 1);
        this.forceUpdate();
    }

    componentDidMount(){
        $.ajax({
            url: "http://localhost:4000/transactions/get_details",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType:"json",
            xhrFields: { withCredentials:true },
            data: JSON.stringify({'tt_transaction_id': this.props.id}),
            success: (receivedData) => {
                console.log(receivedData);
                this.setState({
                    data: receivedData
                })
                for(let i = 0; i < receivedData.length; i++){
                    this.state.myAccounts.push(receivedData[i].dt_accountID);
                }
                if(this.props.id){
                    this.setState({
                        action_id: this.props.id,
                    })
                } 
                this.forceUpdate();
            },
            error: () => {
                console.log("Error: Could not submit");
            }
        })
    }

    render(){
        if(this.state.update === true){
            $.ajax({
                url: "http://localhost:4000/transactions/get_details",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                dataType:"json",
                xhrFields: { withCredentials:true },
                data: JSON.stringify({'tt_transaction_id': this.props.id}),
                success: (receivedData) => {
                    this.setState({
                        data: receivedData,
                        update: false,
                    })
                    for(let i = 0; i < receivedData.length; i++){
                        this.state.myAccounts.push(receivedData[i].dt_accountID);
                    }
                    if(this.props.id){
                        this.setState({
                            action_id: this.props.id,
                        })
                    } 
                    this.forceUpdate();
                },
                error: () => {
                    console.log("Error: Could not submit");
                }
            })
        }


        return(
            <div width='400'>
                <table id='editTable' width='400'>
                    <thead id='headEntry'>
                        <tr>
                            <th>Account</th>
                            <th>Debit</th>
                            <th>Credit</th>
                            <th>Event</th>
                            <th><input type="text" defaultValue={this.state.transactionInfo.tt_description} onChange={(e) => this.handleDescription(e)}></input></th>
                            <th><Select options={this.state.currencies} placeholder={this.state.transactionInfo.tt_currency} onChange={(e) => this.handleCurrency(e)} /></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr></tr>   
                        {this.state.data.map( (row, index) => {
                            //var eventIndex = this.state.myEvents.events.findIndex(ev => ev.dt_transactionID==row.dt_transactionID);
                            console.log(this.state.myEvents[224].et_event_abv);
                            console.log(row);
                            return (
                                <tr key={`row-${index}`}>
                                    <td><Select options={this.state.accounts} placeholder={row.dt_accountID} onChange={(e) => this.handleChange(row, 'dt_accountID', e)}/></td>
                                    <td><input type="number"  defaultValue={row.dt_debit} onChange={(e) => this.handleChange(row, 'dt_debit', e)}/></td>
                                    <td><input type="number" defaultValue={row.dt_credit} onChange={(e) => this.handleChange(row, 'dt_credit', e)}/></td>
                                    <td><Select options={this.state.events} placeholder={row.dt_eventID} onChange={(e) => this.handleChange(row, 'dt_eventID', e)}/></td>
                                    <td><button onClick={() => this.cancel(row)}>X</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <button onClick={this.addinfo}>Add +</button>
                <button onClick={this.save}>Save</button>
                <button id='entryButton' onClick={this.submitDelete}>Delete</button>
            </div>
            
        );
    }
}