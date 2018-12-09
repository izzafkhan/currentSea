import React, {Component} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import './BalanceSheet.css'
import $ from 'jquery';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import moment from "moment"
import DatePicker from "react-datepicker/es";
import Select from 'react-select';

class BalanceSheet extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loading:true,
            filtered: [],
          
            startDate: '',
            endDate: '',
            reportDropdownOpen: false,
            currencyDropdownOpen: false,
            defaultCurrencyCode: 'USD',
            search: '',
            exchangeRate:1
         
        };
        this.currencyChanged = this.currencyChanged.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    handleChangeStart = (date) => {
        this.setState({
            startDate: date
        });
    }


    handleChangeEnd = (date) => {
      this.setState({
            endDate: date
        });

    }

    currencyChanged = event => {
        let currencyCode = this.state.defaultCurrencyCode;
        currencyCode = event.value;
        console.log(currencyCode);

        $.ajax({
                url: "http://localhost:4000/currencies/getrate",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                dataType: 'json',
                xhrFields: {withCredentials: true},
                data: JSON.stringify({from: this.state.defaultCurrencyCode, to: currencyCode}),
                success:  (receivedData) => {
                    console.log(receivedData);
                    this.setState({exchangeRate: receivedData.rate, defaultCurrencyCode: currencyCode});
                    let data = this.state.data;
                    for (let i = 0; i < data.length; i++){
                        let {start, change, end} = data[i];
                        start = (start * this.state.exchangeRate).toFixed(4);
                        change = (change * this.state.exchangeRate).toFixed(4);
                        end = (end * this.state.exchangeRate).toFixed(4);
                        data[i].start = start;
                        data[i].change = change;
                        data[i].end = end;
                    };
                    this.setState({data: data});
                },
                error: (receivedData) => {
                    alert('error occurred')

                }
            }
        );
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

        if (currencyCode == "EUR") {
            this.setState({demoExchangeRate: ".88"})
            this.setState({demoDefaultCurrencyCode: 'EURO'})
        }
    }

    onFilteredChange(){
      
        
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
    componentDidMount = () => {
        $.ajax({
            url: "http://localhost:4000/statement/balance",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: 'json',
            xhrFields: { withCredentials: true },
            success: (receivedData) => {
                this.setState({data:receivedData});
            },
            error: (data) => {
                //alert('error occurred')
                
            }
        }
    ); 
    }
    render(){
        
        var  data  = [{
            number:'1000', account:'Profit/Loss from previous year', start:(8250.55 * this.state.demoExchangeRate).toFixed(2),end:(8306.18 * this.state.demoExchangeRate).toFixed(2),change:(55.63 * this.state.demoExchangeRate).toFixed(2), date:''
        },{
            number:'1900', account:'Union Bank of Switzerland ', start:(7607.15* this.state.demoExchangeRate).toFixed(2),end:(7662.78 * this.state.demoExchangeRate).toFixed(2),change:(55.63 * this.state.demoExchangeRate).toFixed(2), date: ''
        },{
            number:'1950', account:'Bank of Finland', start:(643.40 * this.state.demoExchangeRate).toFixed(2),end:(643.40 * this.state.demoExchangeRate).toFixed(2),change:'0.00', date:''
        }];
        var columns = [{
                Header: 'No.',
                accessor: 'number'
            }, {
                Header: 'Account',
                accessor: 'account',
                width: 250
            }, {
                Header: 'Start',
                accessor: 'start'
            }, {
                Header: 'Change',
                accessor: 'change',
                Cell: row => (
                    <span
                        style={{
                            color: row.value >= 0 ? 'green'
                                : 'red'
                        }}>{row.value}</span>)
            },  {
                Header: 'End',
                accessor: 'end',
                Cell: row => (
                    <span
                        style={{
                            color: row.value >= 0 ? 'green'
                                : 'red'
                        }}>{row.value}</span>)
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
            <div className="gridContainer" style={{paddingTop: "28px"}}>

                <div className="isgTop">

                    <Dropdown className="incomeStatementsDropDownReports" isOpen={this.state.reportDropdownOpen}
                              toggle={this.toggleReport}>
                        <DropdownToggle caret>
                            Balance Sheet
                        </DropdownToggle>
                        <DropdownMenu className="isDropDownReportsMenu">
                            <DropdownItem onClick={this.props.action}>Income Statement</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    {/*<DatePicker className="isStartDatePicker"
                                selected={this.state.startDate}
                                onChange={this.handleChangeStart}
                                placeholderText="Start Date"
                    />*/}

                    {/*<DatePicker className="isEndDatePicker"
                                selected={this.state.endDate}
                                onChange={this.handleChangeEnd}
                                minDate={this.state.startDate}
                                placeholderText="End Date"
                    />*/}

                    <Select options={this.props.currencies} onChange={(e) => this.currencyChanged(e)} placeholder={this.state.defaultCurrencyCode}
                    className="dropdownContainer" />




                </div>

                <div className="isgBottom">
                    <ReactTable
                        className="balanceDataTable"
                        data={this.state.data}
                        noDataText="Your balances will appear here"
                        columns={columns}
                        defaultPageSize={25}
                        showPageSizeOptions= {false}
                  

                    />
                </div>

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
