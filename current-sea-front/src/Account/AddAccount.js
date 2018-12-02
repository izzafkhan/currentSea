import React from 'react';
import DatePicker from 'react-datepicker'
import moment from "moment"
import "react-datepicker/dist/react-datepicker.css";
import './AddAccount.css'
import $ from 'jquery'
import CurrencyMenu from '../Currencies/CurrencyMenu';

export default class AddAccount extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            newData : {
 
                currencyId: '',
                description: 'Description',
                balance : 0.00,
                internalEntries : [],
            },
            enteringData : false,
     
        }
      
        this.handleChange = this.handleChange.bind(this);
        this.submitData = this.submitData.bind(this);
    }

 


    handleChange(row, entry, event) {
        row[entry] = event.target.type === 'number' ? parseFloat(event.target.value) : event.target.value;
    }

    submitData(){
        let newData = Object.assign({}, this.state.newData);   
        this.setState({newData});

        /*
            Ajax magic 
            Maybe we should send the internal entries back home instead of newData? We need to avoid losing information one way or another.
        */
       $.ajax({
           url: "http://localhost:4000/transactions/add_transactions",
           type: "POST",
           contentType: "application/json; charset=utf-8",
           crossDomain: true,
           dataType:"json",
           xhrFields: { withCredentials:true },
           data: JSON.stringify(this.state.newData),
           success: () => {
                this.props.action(false);
           },
           error: () => {
                console.log("Error: Could not submit");
                this.props.action(false);
           }
       })
    
    }

    render(){
        return(
            <div>
                {this.props.AddAccount ? 
                <div>
                    <table width='600' id='addTable'>
                        <thead>
                            <tr>
                                <th><input type="text" placeholder="Description" onChange={this.handleDescription} /></th>
                                {/*<th><input type="text" placeholder="Currency"  onChange={this.handleCurrency} /></th> */}
                                <th><CurrencyMenu onSelectCurrency={this.handleCurrency}/></th>
                            </tr>
                            <tr>
                                <th>Account</th>
                                <th>Debit</th>
                                <th>Credit</th>
                                <th>Event</th>
                            </tr>
                        </thead>
                    
                        <tbody>
                            
                        </tbody>     
                    </table>
                    <button onClick={this.submitData}>Done</button>
                </div>
                : (null) }
            </div>
        );
    }
}