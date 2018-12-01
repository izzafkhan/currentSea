import React from 'react';
import DatePicker from 'react-datepicker'
import moment from "moment"
import "react-datepicker/dist/react-datepicker.css";
import './AddAccount.css'
import $ from 'jquery'

export default class AddAccount extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            newData : {
                currencyId: '',
                description: 'Description',
                balance : 0.00,
            },
            enteringData : false,
        }
        this.addinfo = this.addinfo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleNumber = this.handleNumber.bind(this);
        this.handleType= this.handleType.bind(this);
        this.submitData = this.submitData.bind(this);
    }

   
    addinfo = () => {

        let newRow = {
            number : '9000',
            description : 'Description',
            type : 'Balance',
         

            id : this.number
        };

    
        this.forceUpdate();
    }

    handleDescription(e){
        let newData = Object.assign({}, this.state.newData);
        newData.description = e.target.value;
        this.setState({newData});
    }

    handleNumber(e){
        let newData = Object.assign({}, this.state.newData);
        newData.number = e.target.value;
        this.setState({newData})
    }

    handleType(e){
        let newData = Object.assign({}, this.state.newData);
        newData.type = e.target.value;
        this.setState({newData})
    }
    handleChange( entry, event) {
       entry = event.target.type === 'number' ? parseFloat(event.target.value) : event.target.value;
    }

    submitData(){
       
        let newData = Object.assign({}, this.state.newData);
       
        this.setState({newData});

        /*
            Ajax magic 
            Maybe we should send the internal entries back home instead of newData? We need to avoid losing information one way or another.
        
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
    */
    }

    render(){
        return(
            <div>
                {this.props.addAccount ? 
                <div>
                    <table width='600' id='addTableAcct'>
                        <thead>
                       
                            <tr>
                            
                                <th><input type="text" placeholder="Number"  onChange={this.handleNumber} /></th>
                                <th><input type="text" placeholder="Description" onChange={this.handleDescription} /></th>
                                <th><input type="text" placeholder="Type"  onChange={this.handleType} /></th>
                            </tr>
                          
                        </thead>
                    
                         
                    </table>
                    <button onClick={this.submitData}>Done</button>
                </div>
                : (null) }
            </div>
        );
    }
}