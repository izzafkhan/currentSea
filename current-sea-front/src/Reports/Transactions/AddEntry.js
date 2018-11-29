import React from 'react';
import DebitMenu from '../../Account/DebitMenu'
import CreditMenu from '../../Account/CreditMenu'
import DatePicker from 'react-datepicker'
import moment from "moment"
import "react-datepicker/dist/react-datepicker.css";
import './AddEntry.css'
import $ from 'jquery'

export default class AddEntry extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            newData : {
                startDate : moment().format('YYYY-MM-DD'),
                currencyId: '',
                description: 'Description',
                balance : 0.00,
                internalEntries : [],
            },
            enteringData : false,
            dateSetter : moment(),
        }
        this.setDate = this.setDate.bind(this);
        this.addinfo = this.addinfo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCurrency = this.handleCurrency.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleCurrency = this.handleCurrency.bind(this);
        this.submitData = this.submitData.bind(this);
    }

    setDate(date){
        let newData = Object.assign({}, this.state.newData);
        this.setState({
            dateSetter : date
        });
        newData.startDate = moment(this.state.dateSetter).format('YYYY-MM-DD');
        this.setState({newData});
    }

    addinfo = () => {
        var internalEntries = this.state.newData.internalEntries.slice(0);

        let newRow = {
            account : '9000 Bank',
            debit : 0,
            credit : 0,
            event : 'Party',

            id : this.state.newData.internalEntries.length,
        };

        internalEntries.push(newRow);
        
        this.state.newData.internalEntries = internalEntries;
        this.state.enteringData = true;
        this.forceUpdate();
    }

    handleDescription(e){
        let newData = Object.assign({}, this.state.newData);
        newData.description = e.target.value;
        this.setState({newData});
    }

    handleCurrency(e){
        let newData = Object.assign({}, this.state.newData);
<<<<<<< HEAD
        newData['currencyId'] = e.target.value;
=======
        newData.currencyId = e.target.value;
>>>>>>> base/master
        this.setState({newData})
    }

    handleChange(row, entry, event) {
        row[entry] = event.target.type === 'number' ? parseFloat(event.target.value) : event.target.value;
    }

    submitData(){
        var sum = 0;
        let newData = Object.assign({}, this.state.newData);
        for(let i = 0; i < this.state.newData.internalEntries.length; i++){
            sum += this.state.newData.internalEntries[i].debit;
        }
        newData.balance = sum;     
        this.setState({
            newData : newData,
        });

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
                this.setState({enteringData : false});
           },
           error: () => {
                console.log("Error");
           }
       })
    
    }

    render(){
        return(
            <div>
                <table width='600' id='addTable'>
                    <thead>
                        <tr>
<<<<<<< HEAD
=======
                            <th><DatePicker selected={this.state.dateSetter} onChange={this.setDate} popperPlacement='left-start'/></th>
>>>>>>> base/master
                            <th><input type="text" placeholder="Description" onChange={this.handleDescription} /></th>
                            <th><input type="text" placeholder="Currency"  onChange={this.handleCurrency} /></th>
                        </tr>
                        <tr>
                            <th>Account</th>
                            <th>Debit</th>
                            <th>Credit</th>
                            <th>Event</th>
                        </tr>
                    </thead>
                    {this.state.enteringData ? 
                    <tbody>
                        {this.state.newData.internalEntries.map(row => {
                            return (
                                <tr key={`row-${row.id}`}>
                                    <td><input type="text" onChange={(e) => this.handleChange(row, 'account', e)}/></td>
                                    <td><input type="number"  onChange={(e) => this.handleChange(row, 'debit', e)}/></td>
                                    <td><input type="number" onChange={(e) => this.handleChange(row, 'credit', e)}/></td>
                                    <td><input type="text"  onChange={(e) => this.handleChange(row, 'event', e)}/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                    : (null) }
                </table>
                <button onClick={this.addinfo}>Add +</button>
                <button onClick={this.submitData}>Done</button>
            </div>
        );
    }
}

{/*
            <div>
                <input type="text" value="Description">Description</input>
                <input type="number" value="Debit">Debit</input>
                <input type="number" value="Credit">Credit</input>
                <input type="submit" value="Done">Done</input>
            </div>*/}

{/*


    {<DebitMenu /> option???}
    <input type="text" placeholder="Credit" defaultValue={this.state.newData.creditAmt} onChange={this.handleChange.bind(this, 'creditAmt')}/>
    {<CreditMenu /> option???}
    <input type="text" placeholder="Category" defaultValue={this.state.newData.eventId} onChange={this.handleChange.bind(this, 'eventId')}/>
    <input type="text" placeholder="Currency" defaultValue={this.state.newData.currencyId} onChange={this.handleChange.bind(this, 'currencyId')} />


*/}