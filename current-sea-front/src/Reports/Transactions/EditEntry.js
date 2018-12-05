import React from 'react';
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
        }
        this.addinfo = this.addinfo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.remove = this.remove.bind(this);
    }

    addinfo = () => {
        var internalEntries = this.state.data.slice(0);

        let newRow = {
            dt_accountID : ' ',
            dt_debit : 0,
            dt_credit : 0,
            dt_eventID : '',
        };

        internalEntries.push(newRow);
    
        this.state.data = internalEntries;
        this.forceUpdate();
    }

    handleChange(row, entry, event) {
        if (entry == "account") {
            row[entry] = event.value.substr(0, event.value.indexOf(' '));
        } else {
            row[entry] = event.target.type === 'number' ? parseFloat(event.target.value) : event.target.value;
        }
    }

    save(){
        var sum = 0;
        for(let i = 0; i < this.state.data.length; i++){
            
            sum += this.state.data[i].dt_debit;
        }
        console.log(sum);
        $.ajax({
            url: "http://localhost:4000/transactions/edit_transactions",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType:"json",
            xhrFields: { withCredentials:true },
            data: JSON.stringify({ 'tt_transaction_id' : this.state.action_id, 'data': this.state.data, 
                'balance': sum}),
            success: () => {
                 this.props.closeAction(this.state.action_id, sum);
            },
            error: () => {
                 console.log("Error: Could not submit");
                 this.props.closeAction(this.state.action_id, 0);
            }
        })
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
            },
            error: () => {
                 console.log("Error: Could not submit");
                 this.props.deleteAction(this.state.action_id);
            }
        })
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
                this.setState({
                    data: receivedData
                })
                if(receivedData){
                    this.setState({
                        data: receivedData
                    });
                }
                if(this.props.id){
                    this.setState({
                        action_id: this.props.id,
                    })
                } 
            },
            error: () => {
                console.log("Error: Could not submit");
            }
        })
    }

    render(){
        return(
            <div width='400'>
                <table id='editTable' width='400'>
                    <thead id='headEntry'>
                        <tr>
                            <th>Account</th>
                            <th>Debit</th>
                            <th>Credit</th>
                            <th>Event</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr></tr>   
                        {this.state.data.map( (row, index) => {
                            return (
                                <tr key={`row-${index}`}>
                                    <td><Select options={this.state.accounts} onChange={(e) => this.handleChange(row, 'account', e)}/></td>
                                    <td><input type="number"  defaultValue={row.dt_debit} onChange={(e) => this.handleChange(row, 'dt_debit', e)}/></td>
                                    <td><input type="number" defaultValue={row.dt_credit} onChange={(e) => this.handleChange(row, 'dt_credit', e)}/></td>
                                    <td><input type="text"  defaultValue={row.dt_eventID} onChange={(e) => this.handleChange(row, 'dt_eventID', e)}/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <button onClick={this.addinfo}>Add +</button>
                <button onClick={this.save}>Save</button>
                <button id='entryButton' onClick={this.remove}>Delete</button>
            </div>
            
        );
    }
}