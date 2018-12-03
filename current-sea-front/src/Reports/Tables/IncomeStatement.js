import React, {Component} from 'react';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import ReactTable from 'react-table';
import DatePicker from "react-datepicker";
import {Redirect} from "react-router-dom";
import moment from "moment"
import $ from 'jquery';
import 'react-table/react-table.css'
import "react-datepicker/dist/react-datepicker.css";
import './IncomeStatement.css';
import {Link} from "react-router-dom";

export default class IncomeStatement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            startDate: '',
            endDate: '',
            reportDropdownOpen: false,
            currencyDropdownOpen: false,
            demoExchangeRate: '1',
            demoDefaultCurrencyCode: 'USD'

        };

    }

    fetchData(state, instance) {
        $.ajax({
                url: "http://localhost:4000/statement/statement",
                type: "GET",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                dataType: 'json',
                xhrFields: {withCredentials: true},
                success: function (receivedData) {
                    this.setState({data: receivedData});
                }.bind(this),
                error: (receivedData) => {
                    alert('error occurred')

                }
            }
        );
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

    currencyChanged = event => {
        let currencyCode = event.target.value

        $.ajax({
                url: "http://localhost:4000/currencies/getrate",
                type: "Get",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                dataType: 'json',
                xhrFields: {withCredentials: true},
                data: {currencyFrom: 'USD', currencyTo: 'USD'},
                success: function (receivedData) {
                    console.log("Successful Get")
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


    render() {


        var data = [{
            number: '1000', account: 'Profit/ Loss from Previous Year', change: 55.63 * this.state.demoExchangeRate
        }, {
            number: '1900', account: 'Union Bank of Switzerland', change: 55.63 * this.state.demoExchangeRate
        }, {
            number: '1950', account: 'Bank of Finland', change: 0 * this.state.demoExchangeRate
        },{
            number: '6000', account: 'Food', change: 10.50 * this.state.demoExchangeRate
        }];
        var columns = [
            {
                Header: '#',
                accessor: 'number',

            },
            {
                Header: 'Account',
                accessor: 'account', width: 300
            },
            {
                Header: 'Change',
                accessor: 'change'
            }]

        return (


            <div className="gridContainer">

                <div className="isgTop">

                    <Dropdown className="isDropDownReports" isOpen={this.state.reportDropdownOpen}
                              toggle={this.toggleReport}>
                        <DropdownToggle caret>
                            Income Statement
                        </DropdownToggle>
                        <DropdownMenu className="isDropDownReportsMenu">
                            <DropdownItem onClick={this.props.action}>Balance Sheet</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>



                    <DatePicker className="isStartDatePicker"
                                selected={this.state.startDate}
                                onChange={this.handleChangeStart}
                                placeholderText="Start Date"
                    />

                    <DatePicker className="isEndDatePicker"
                                selected={this.state.endDate}
                                onChange={this.handleChangeEnd}
                                minDate={this.state.startDate}
                                placeholderText="End Date"
                    />


                    <Dropdown className="isDropDownCurrency" isOpen={this.state.currencyDropdownOpen}
                              toggle={this.toggleCurrency}>
                        <DropdownToggle caret>
                            {this.state.demoDefaultCurrencyCode}
                        </DropdownToggle>

                        <DropdownMenu className="isDropDownCurrencyMenu">
                            <DropdownItem>
                                <option onClick={this.currencyChangedDemo}>USD</option>
                            </DropdownItem>
                            <DropdownItem>
                                <option onClick={this.currencyChangedDemo}>GBP</option>
                            </DropdownItem>
                            <DropdownItem>
                                <option onClick={this.currencyChangedDemo}>EUR</option>
                            </DropdownItem>
                        </DropdownMenu>

                    </Dropdown>


                </div>

                <div className="isgBottom">
                    <ReactTable
                        className="isDataTable"
                        data={data}
                        noDataText="Your income and expenses will appear here"
                        columns={columns}
                    />

                </div>


            </div>

        );
    }
}
