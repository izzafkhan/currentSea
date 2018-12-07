import React from 'react';
import DatePicker from 'react-datepicker'
import moment from "moment"
import "react-datepicker/dist/react-datepicker.css";
import './AddAccount.css'
import $ from 'jquery'
import Select from 'react-select';

const options = [
    { value: "Balance", label: "Balance Sheet"},
    { value: "Income", label:"Income Statement"}
]
export default class AddAccount extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            newData : {
                accountId: 'Account Number',
                accountName: 'Description',
                
                
                accountType : 'Balancetest',
                internalEntries : [],
            },
            enteringData : false,

        }
        this.addinfo = this.addinfo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.submitData = this.submitData.bind(this);
        this.handleAcctID = this.handleAcctID.bind(this);
        this.handleType = this.handleType.bind(this);
    }

    


    addinfo = () => {
        
        this.forceUpdate();
    }

    handleDescription(e){
        let newData = Object.assign({}, this.state.newData);
        newData.accountName = e.target.value;
        this.setState({newData});
    }
    handleType(e){
        let newData = Object.assign({}, this.state.newData);
       // console.log(accountType.value);
        newData.accountType = e.value;
        this.setState({newData});
    }

    handleAcctID(e){
        let newData = Object.assign({}, this.state.newData);
        newData.accountId = e.target.value;
        this.setState({newData});
    }

    handleChange(row, entry, event) {
       
        row[entry] = event.target.type === 'number' ? parseFloat(event.target.value) : event.target.value;
        
    }

   
    submitData(){
        let newData = Object.assign({}, this.state.newData);
        this.setState({newData});
        this.props.action(false);
        
        
        /*
            Ajax magic 
            
        */
       $.ajax({
           url: "http://localhost:4000/accounts/add_account",
           type: "POST",
           contentType: "application/json; charset=utf-8",
           crossDomain: true,
           dataType:"json",
           xhrFields: { withCredentials:true },
           data: JSON.stringify(this.state.newData),
           success: () => {
                this.props.action(false);
           },
           error: (data) => {
                alert(data.responseJSON.message);
                this.props.action(false);
           }
       })

       
    
    }
    

    render(){
        return(
            <div>
                {this.props.addEntry ? 
                <div>
                    <table width='600' id='addTableA'>
                        <thead>
                            <tr>
                                
                                <th><input type="number" placeholder="Account Number" onChange={this.handleAcctID }/></th>
                                <th><input type="text" placeholder="Description" onChange={this.handleDescription} /></th>
                                {/*<th><input type="text" placeholder="Balance or Income" onChange={this.handleType} /></th>*/}
                                <th><Select options={options} onChange={this.handleType}/></th>
                               
                            </tr>
                           
                        </thead>
                    
                        <tbody>
                           
                        </tbody>     
                    </table>
                    <button onClick={()=>{
                            this.props.add(this.state.newData);
                             this.submitData();}}>Done</button>
                </div>
                : (null) }
            </div>
        );
    }
}