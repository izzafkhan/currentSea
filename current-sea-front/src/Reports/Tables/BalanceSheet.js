import React, {Component} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import './BalanceSheet.css'
import $ from 'jquery';
import { ActionTabUnselected } from 'material-ui/svg-icons';
import DatePicker from 'react-datepicker'
import moment from "moment"
import "react-datepicker/dist/react-datepicker.css";
import CurrencyMenu from '../../Currencies/CurrencyMenu';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

class BalanceSheet extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loading:true,
            filtered: [],
            startDate: moment(),
            endDate: moment(),
            search: '',
            rate: 1,
            reportDropdownOpen: false,
            currencyDropdownOpen: false,
            gotoHome: false,
            demoExchangeRate: '1',
            demoDefaultCurrencyCode: 'USD',
         
        };
        this.fetchData = this.fetchData.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
    

    }
    handleChangeStart(date){
        this.setState({
            startDate : date
     
        });
    }
    handleChangeEnd(date){
       
        this.setState({
            endDate : date
        });

    }
    
    fetchData(state,instance){
      /* $.ajax({
            url: "http://localhost:4000/balance",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: 'json',
            xhrFields: { withCredentials: true },
            data:   ,
            success: function(receiveddata) {
                this.setState({data:receiveddata});
            }.bind(this),
            error: (data) => {
                //alert('error occurred')
                
            }
        }
      
    ); 
*/
    }
    onFilteredChange(){
      
        
    }

    onCurrencyChange(startCurr, endCurr){

    }

    currencyChangedDemo = event => {
        const currencyCode = event.target.value

        if (currencyCode == "USD") {
            this.setState({demoExchangeRate: "1"})
            this.setState({demoDefaultCurrencyCode: 'USD'})
        }

        if (currencyCode == "GBP") {
            this.setState({demoExchangeRate: ".78"})
            this.setState({demoDefaultCurrencyCode: 'GBP'})
        }

        if (currencyCode == "EURO") {
            this.setState({demoExchangeRate: ".88"})
            this.setState({demoDefaultCurrencyCode: 'EURO'})
        }
    }
    
    currencyChanged = event => {
        let currencyCode = event.target.value

        $.ajax({
                url: "http://localhost:4000/currencies/getrate",
                type: "Get",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                dataType: 'json',
                xhrFields: {withCredentials: true},
                data: {currencyFrom: 'USD', currencyTo: 'USD', date: '2018-06-06'},
                success: function (receivedData) {
                    console.log("Successful Get")
                    console.log(receivedData)
                    this.setState({data: receivedData});
                }.bind(this),
                error: (receivedData) => {
                    alert('error occurred')

                }
            }
        );
    }

    toggleReport = () => {
        this.setState(prevState => ({
            reportDropdownOpen: !prevState.reportDropdownOpen
        }));
    }

    toggleCurrency = () => {
        this.setState(prevState => ({
            currencyDropdownOpen: !prevState.currencyDropdownOpen
        }));
    }

    
    render(){
        
        var  data  = [{
            number:'324', currency:'USD', account:'Food', start:'342',end:'39',change:'-302', date:''
        },{
            number:'331', currency:'USD', account:'Party', start:'34422',end:'32349',change:'-3034'
        }];
        var columns = [{
                Header: 'Number',
                accessor: 'number'
            }, {
                Header: 'Currency',
                accessor: 'currency',
            }, {
                Header: 'Account',
                accessor: 'account',
            }, {
                Header: 'Start',
                accessor: 'start'
            }, {
                Header: 'End',
                accessor: 'end'
            }, {
                Header: 'Change',
                accessor: 'change'
            }
            
        ]
        if (this.state.search) {
            data = data.filter(row => {
                return String(row.number).includes(this.state.search) ||
                 row.currency.includes(this.state.search) || String(row.start).includes(this.state.search)
                  || String(row.end).includes(this.state.search) || String(row.change).includes(this.state.search) ||
                  row.account.includes(this.state.search)
            })
        }
        return(
            <div className="BalanceSheet-table">
           {/* <CurrencyMenu/>
            <label> Start Date: </label>
            <DatePicker
                selected={this.state.startDate}
                selectsStart
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChangeStart}
            />
            <label> End Date: </label>

            <DatePicker
                selected={this.state.endDate}
                selectsEnd
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChangeEnd}
           />*/}
            <Dropdown className="isDropDownReports" isOpen={this.state.reportDropdownOpen}
                              toggle={this.toggleReport}>
                        <DropdownToggle caret>
                            Income Statement
                        </DropdownToggle>
                        <DropdownMenu className="isDropDownReportsMenu" >
                            <DropdownItem>Balance Sheet</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

            <h1> </h1>
            Search: <input value={this.state.search}
							onChange={e => this.setState({search: e.target.value})}
					/>

            
                   
                <ReactTable
                        data = {data}
                        noDataText="Your spending will appear here"
                        columns = {columns}
                        onFetchData= {this.fetchData}
                        defaultFilterMethod={(filter,row) => 
                            String(row[filter.id]) === filter.value ||  String(row[filter.id]).toLowerCase() === filter.value.toLowerCase()
                        }
                        filtered = {this.state.filtered}
                        onFilteredChange = {filtered => this.setState({filtered})}
                        //resolveData={}
                    />
                
            </div>
        );
    }
}

export default BalanceSheet;

{/*<table className="BalanceSheet-table">
                <thead>
                    <tr>
                        <th id="header-number">
                            <div className="BalanceSheet-number"> # </div>
                        </th>
                        <th id="header-currency">    
                            <div className="BalanceSheet-acount">  </div>
                        </th>
                        <th id="header-account">    
                            <div className="BalanceSheet-account"> Account </div>
                        </th>
                        <th id="header-start">    
                            <div className="BalanceSheet-start"> Start </div>
                        </th>
                        <th id="header-change">    
                            <div className="BalanceSheet-change"> Change </div>
                        </th>
                        <th id="header-end">    
                            <div className="BalanceSheet-end"> End </div>
                        </th>
                    </tr>
                </thead>
                <tbody className="BalanceSheet-body">
                </tbody>
        </table> */}