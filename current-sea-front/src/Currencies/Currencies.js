import React from 'react';
import Header from '../Header';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
//import SplitPane from 'react-split-pane'
import Linechart from 'react-linechart';
import $ from 'jquery'
import { monthlyData } from 'react-linechart/example/constants/points'
import 'react-linechart/dist/styles.css';
import currencyMenu from './CurrencyMenu';
import Select from 'react-select';
import './currencies.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DatePicker from "react-datepicker/es";
import AddAccount from '../Account/AddAccount';
//import {CurrencyMenu} from 'CurrenciesMenu.js'
//import CurrenciesGraph from 'CurrenciesGraph.js'
//import ReactChartkick, { LineChart} from 'react-native-chart-kit';
//var CanvasJSReact = require('./canvasjs.react');
//var CanvasJS = CanvasJSReact.CanvasJS;
//var CanvasJSChart = CanvasJSReact.CanvasJSChart;


// function createGraph() {
//     const options = {
//         animationEnabled: true,
//         exportEnabled: true,
//         theme: "light2", // "light1", "dark1", "dark2"
//         title: {
//             text: "Exchange Rates Change"
//         },
//         axisY: {
//             title: "Percentage",
//             includeZero: true,
//             suffix: "%"
//         },
//         axisX: {
//             title: "Month of Year",
//             prefix: "M",
//             interval: 1
//         },
//         data: [{
//             type: "line",
//             toolTipContent: "Month {x}: {y}%",
//             dataPoints: [
//                 { x: 1, y: 64 },
//                 { x: 2, y: 61 },
//                 { x: 3, y: 64 },
//                 { x: 4, y: 62 },
//                 { x: 5, y: 64 },
//                 { x: 6, y: 60 },
//                 { x: 7, y: 58 },
//                 { x: 8, y: 59 },
//                 { x: 9, y: 53 },
//                 { x: 10, y: 54 },
//                 { x: 11, y: 61 },
//                 { x: 12, y: 60 }
//             ]
//         }]
//     }
//     return options;
// }


function onInsert(row) {
    let newRow = '';

}
export default class Currencies extends React.Component {
    constructor(props) {
        super(props);

        this.onSelectCurrency = this.onSelectCurrency.bind(this);
        this.state = {
            showMenu: false,
            fav_currencies: [],
            currencies: [],
            defaultCurrencyCode: 'USD'
        };

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.currencyChanged = this.currencyChanged.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

    }

    //getting different currencies rate
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
    

    showMenu(event) {
        event.preventDefault();

        this.setState({ showMenu: true }, () => {
            // document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu() {
        this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
        });


    }

    onSelectCurrency(string) {
        let newRow =
        {
            currency: this.string,
            coversion:
                $.ajax({
                    url: "http://localhost:4000/currencies/getrate",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    crossDomain: true,
                    dataType: "json",
                    xhrFields: { withCredentials: true },
                    data: JSON.stringify(this.state.newData),
                    success: () => {
                        console.log("Work in progress");
                    },
                    error: () => {
                        console.log("Error: Could not submit");
                        ////////
                        this.props.action(false);
                    }
                })
        }
        // fav_currencies.push(newRow);
    }
    componentDidMount() {
        $.ajax({
            url: "http://localhost:4000/currencies/currencies",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            xhrFields: { withCredentials: true },
            success: (data) => {
                let currencies = []
                for (let i = 0; i < data.currencies.length; i++) {
                    const newRow = { value: '', label: '' };
                    newRow.value = data.currencies[i];
                    newRow.label = data.currencies[i];
                    currencies[i] = newRow;
                }
                this.setState({ currencies: currencies })
            },
            error: () => {
                console.log("Error: Could not submit");
                // this.props.action(false);
            }
        });
    }
    render() {
        // var fav_currencies = [
        //     { currency: 'USD', conversion: '0.342', change: '0.23%' },
        //     { currency: 'SEK', conversion: '1.00', change: '0.01%' }
        // ];
        // const cellEditP = {
        //     mode: 'click',
        // }
        var columns = [{
            Header: 'Currency',
            accessor: 'currency'
        }, {
            Header: '1 Sek',
            accessor: 'conversion'
        }, {
            Header: 'Change(day)',
            accessor: 'change'
        }]
        return (
            <body className="currencyreportsContainer">
                <Header />

                <div class="body">


                    <h1 align="center">Currencies</h1>

                    <div>

                        <div class="bottomBody">

                            <div className="gridContainer">

                                <div className="tableTop" >
                                    <div class = "clickButton">
                                        <button onClick={this.showMenu}>+Add New Currency</button>
                                        {
                                            this.state.showMenu
                                                ? (
                                                    <div id="currencyHolder" style={{ display: "inline-flex" }}>
                                                        <Select options={this.props.currencies} onChange={(e) => this.currencyChanged(e)} placeholder={this.state.defaultCurrencyCode}
                                                        className="dropdownContainer" />
                                                        <button onClick={this.closeMenu}>Done</button>
                                                    </div>
                                                )
                                                : (
                                                    null
                                                )
                                        }
                                    </div>

                                </div>

                                <div className="tableBottom">
                                    <ReactTable
                                        className="currencyDataTable"
                                        data={this.state.fav_currencies}
                                        noDataText="Your favorite currencies will appear here"
                                        columns={columns}
                                    />
                                </div>

                            </div>
                            <div class="linechart">
                                <h2 align="center" style={{ color: "black" }}>My Exchange Rates</h2>
                                <Linechart
                                    width={600}
                                    height={400}
                                    data={monthlyData}
                                    isDate="true"
                                    style={{ backgroundColor: "white", width: "600px" }}
                                />
                            </div>


                        </div>

                    </div>
                </div>
            </body>

        );
    }
}