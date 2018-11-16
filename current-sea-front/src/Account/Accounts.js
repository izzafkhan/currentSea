import React, { Component } from 'react';
import Header from '../Header';
import ReactTable from "react-table";
import "react-table/react-table.css";


export default class Accounts extends Component{
    constructor(props){
        super(props);
        this.state = {
            account: [{ accountNumber:"32432",accountName:"food"}],
        };
    }
   
   
    render(){
        const {account} = this.state;
        return(
            <div>
                <Header/>
                <h1 align="center" >Accounts</h1>
                <ReactTable
                    
                    data = {account}
                    //resolveData = {data => data.map(row=>row)}
                    columns = {[
                        {
                            columns: [
                            {   
                                Header: "Account Number",
                                accessor: "accountNumber" 
                            },
                            {
                                Header: "Account Name",
                                id: "accountName",
                                accessor: acct => acct.accountName
                            }
                        ]
                        }
                    ]}
                    />
                
           


            </div>
        );
    }
}