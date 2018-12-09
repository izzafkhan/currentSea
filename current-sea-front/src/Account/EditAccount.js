import React from 'react';
import Select from 'react-select'; 
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
//import './EditEntry.css';
import $ from 'jquery'

export default class EditAccount extends React.Component{
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
        this.remove = this.remove.bind(this);
        this.submitDelete = this.submitDelete.bind(this);
    }

    submitDelete = () => {
        confirmAlert({
            title: 'Confirm Deletion',
            message: 'Deleting Entry Permanently',
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
        
    }

    handleChange(row, entry, event) {
     
            row[entry] = event.target.type === 'number' ? parseFloat(event.target.value) : event.target.value;
        
    }

    

    remove(){
        $.ajax({
            url: "http://34.220.102.40:4000/accounts/delete_event",
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


    render(){
        return( 
            <div width='400'>
                <table id='editTable' width='400'>
                    <thead id='headEntry'>
                       
                    </thead>
                    <tbody>
                        <tr></tr>   
                        {this.state.data.map( (row, index) => {

                            return (
                               <div></div>
                            )
                        })}
                    </tbody>
                </table>

                <button onClick={this.save}>Save</button>
                <button id='entryButton' onClick={this.submitDelete}>Delete</button>
            </div>
            
        );
    }
}