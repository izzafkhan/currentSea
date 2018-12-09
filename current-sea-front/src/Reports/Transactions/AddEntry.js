import React from 'react';
import DatePicker from 'react-datepicker'
import moment from "moment"
import './AddEntry.css'
import $ from 'jquery'
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';

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
                startBalance: false,
                event : (null), 
            },
            enteringData : false,
            dateSetter : moment(),
            accounts: this.props.accounts,
            currencies: this.props.currencies,
            events: this.props.events,
        }
        this.setDate = this.setDate.bind(this);
        this.addinfo = this.addinfo.bind(this);
        this.cancel = this.cancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCurrency = this.handleCurrency.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleCurrency = this.handleCurrency.bind(this);
        this.submitData = this.submitData.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    setDate(date){
        let newData = Object.assign({}, this.state.newData);
        this.setState({
            dateSetter : date
        });
        newData.startDate = moment(this.state.dateSetter).format('YYYY-MM-DD');
        this.setState({newData});
    }

    cancel(row){
        let index = this.state.newData.internalEntries.indexOf(row);
        this.state.newData.internalEntries.splice(index, 1);
        this.forceUpdate();
    }

    addinfo = () => {
        var internalEntries = this.state.newData.internalEntries.slice(0);

        let newRow = {
            account : '9000 Bank',
            debit : 0,
            credit : 0,
            event : 42,

            id : this.state.newData.internalEntries.length,
        };

        internalEntries.push(newRow);
    
        this.state.newData.internalEntries = internalEntries;
        this.forceUpdate();
    }

    handleDescription(e){
        let newData = Object.assign({}, this.state.newData);
        newData.description = e.target.value;
        this.setState({newData});
    }

    handleCurrency(e){
        let newData = Object.assign({}, this.state.newData);
        newData.currencyId = e.value;
        this.setState({newData})
    }

    handleChange(row, entry, event) {
        if (entry == "account") {
            row[entry] = event.value;
        } else if( entry == "event"){
            row[entry] = event.value;
            this.state.newData.event = row[entry];
            this.forceUpdate();
        } else {
            let value = event.target.value;
            console.log(value);
            if( !isNaN(parseFloat(value)) ) {
                row[entry] = parseFloat(value);
            } else {
                row[entry] = 0;
            }
            console.log(row[entry]);
        }
    }

    submitData(){
        var sum = 0;
        var balanceCheck = 0;
        var validEntry = true;
        var accountsValid = true;
        let newData = Object.assign({}, this.state.newData);
        for(let i = 0; i < newData.internalEntries.length; i++){
            
            sum += newData.internalEntries[i].debit;
            balanceCheck += newData.internalEntries[i].credit;
            if(newData.internalEntries[i].debit != 0 && newData.internalEntries[i].credit != 0){
                validEntry = false;
            }
        }
        //console.log(sum);
        if(balanceCheck == sum && (balanceCheck != 0)){
            if(balanceCheck >= 0 && sum >= 0){
                if(validEntry){
                    if(this.state.newData.description != "" || this.state.newData.description.length > 25){
                        if(this.state.newData.currencyId != ""){
                            this.state.newData.balance = sum;     
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
                        } else {
                            alert("A currency must be selected.")
                        }
                    } else {
                        alert("Description cannot be blank or more than 25 characters.")
                    }
                } else {
                    alert("You cannot have a credit and debit in the same field.")
                }
            } else {
                alert("Use the other column instead of negative values");
            }
        } else {
            alert("Make sure your credit and debit are equal and filled out.")
        }
    
    }
    componentDidMount = () => {
    } 

    render(){
        return(
            <div>
                {this.props.addEntry ? 
                <div>
                    <table width='600' id='addTable'>
                        <thead>
                            <tr>
                                <th>{this.props.nextEntry}</th>
                                <th><DatePicker id='date' selected={this.state.dateSetter} onChange={this.setDate} popperPlacement='right-start'/></th>
                                <th><input type="text" placeholder="Description" onChange={this.handleDescription} /></th>
                                <th></th>
                                <th><Select options={this.state.currencies} onChange={this.handleCurrency}/></th>
                            </tr>
                        </thead>
                    
                        <tbody>
                            {this.state.newData.internalEntries.map(row => {
                                return (
                                    <tr key={`row-${row.id}`}>
                                        <td><Select options={this.state.accounts} onChange={(e) => this.handleChange(row, 'account', e)}/></td>
                                        <td><input type="number"  placeholder="Debit" onChange={(e) => this.handleChange(row, 'debit', e)}/></td>
                                        <td><input type="number" placeholder="Credit" onChange={(e) => this.handleChange(row, 'credit', e)}/></td>
                                        <td><Select options={this.state.events} onChange={(e) => this.handleChange(row, 'event', e)}/></td>
                                        <td><button onClick={() => this.cancel(row)}>X</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>     
                    </table>
                    <button onClick={this.addinfo}>Add +</button>
                    <button onClick={this.submitData}>Done</button>
                </div>
                : (null) }
            </div>
        );
    }
}