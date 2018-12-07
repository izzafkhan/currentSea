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
import Select from 'react-select';

export default class IncomeStatement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            startDate: '',
            endDate: '',
            reportDropdownOpen: false,
            currencyDropdownOpen: false,
            exchangeRate: 1,
            currencyCode: 'USD'
        };

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
        let currencyCode = event.value;

        $.ajax({
                url: "http://localhost:4000/currencies/getrate",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                dataType: 'json',
                xhrFields: {withCredentials: true},
                data: JSON.stringify({from: this.state.currencyCode, to: currencyCode}),
                success: (receivedData) => {
                    this.setState({exchangeRate: receivedData.rate, currencyCode: currencyCode});
                    let data = this.state.data;
                    for (let i = 0; i < data.length; i++){
                        let {start, change, end} = data[i];
                        start = start * this.state.exchangeRate;
                        change = change * this.state.exchangeRate;
                        end = end * this.state.exchangeRate;
                        data[i].start = start;
                        data[i].change = change;
                        data[i].end = end;
                    }
                    this.setState({data: data});
                },
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
    componentDidMount = () => {
        $.ajax({
            url: "http://localhost:4000/statement/statement",
                type: "GET",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                dataType: 'json',
                xhrFields: {withCredentials: true},
                success: (data) => {
                    this.setState({data: data});
                },
                error: (data) => {
                    console.log(data);
                }
        })
    }

    render() {


        var data = [{
            number: '6000', account: 'Food', change: (55.63 * this.state.demoExchangeRate).toFixed(2)
        }];
        var columns = [
            {
                Header: 'No.',
                accessor: 'number',

            },
            {
                Header: 'Account',
                accessor: 'account', width: 300
            },
            {
                Header: 'End',
                accessor: 'change'
            }];        

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

                <Select options={this.props.currencies} onChange={(e) => this.currencyChanged(e)} placeholder={this.state.currencyCode}
                className='dropdownContainer'/>
                    


                </div>

                <div className="isgBottom">
                    <ReactTable
                        className="isDataTable"
                        data={this.state.data}
                        noDataText="Your income and expenses will appear here"
                        columns={columns}
                    />

                </div>


            </div>

        );
    }

}

