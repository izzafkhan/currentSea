import React from 'react';
import Header from '../Header';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
//import SplitPane from 'react-split-pane'
import Linechart from 'react-linechart';
import $ from 'jquery'
import {monthlyData} from 'react-linechart/example/constants/points'
import 'react-linechart/dist/styles.css';
import currencyMenu from './CurrencyMenu';
import Select from 'react-select';
import './currencies.css';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import DatePicker from "react-datepicker/es";
import AddAccount from '../Account/AddAccount';
import RateRow from './RateRow.js';
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
        this.alreadyRan = false;
        //this.onSelectCurrency = this.onSelectCurrency.bind(this);
        this.state = {
            showMenu: false,
            fav_currencies: [
                // toCurrency: cur_obj={currency, conversion, change}   
            ],
            fav_curList: [],
            currencies: [],
            ////////////////////where to access defaultcurrency
            defaultCurrencyCode: 'USD',
        };

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.currencyChanged = this.currencyChanged.bind(this);
        this.call_getrate = this.call_getrate.bind(this);
        this.call_me_first = this.call_me_first.bind(this);
    }

    //getting different currencies rate
    currencyChanged = event => {
        let currencyCode = event.value;
        this.setState({defaultCurrencyCode: currencyCode});
        console.log("new currency: ", this.state.defaultCurrencyCode);

        //////need to change
        $.ajax({
            url: "http://localhost:4000/currencies/getrate",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: 'json',
            xhrFields: {withCredentials: true},
            data: JSON.stringify({from: this.state.defaultCurrencyCode, to: currencyCode}),
            success: (receivedData) => {
                console.log('what is this ' + receivedData);
                this.setState({exchangeRate: receivedData.rate, defaultCurrencyCode: currencyCode});
                console.log("defaultCode changed to ", this.state.defaultCurrencyCode)
                this.alreadyRan = false;
                this.call_getrate();
                // let rates = [
                //     // toCurrency: {rate}
                // ];
                // if(rates[currencyCode] === undefined){
                //     rates[currencyCode] = receivedData.rate.toFixed(4);
                // }
                //this.state.fav_currencies.push({ currency: currencyCode, conversion: receivedData.rate, change: '0.23%' })
                // console.log('steve, what is this', receivedData.rate);
                // let { rate } = data[i];
                //     // start = (start * this.state.exchangeRate).toFixed(4);
                //     // change = (change * this.state.exchangeRate).toFixed(4);
                //     // end = (end * this.state.exchangeRate).toFixed(4);
                //     // data[i].start = start;
                //     // data[i].change = change;
                //     // data[i].end = end;
                // };
                // this.setState({data: data});
            },
            error: (receivedData) => {
                alert('error occurred')

            }
        });
    }


    showMenu(event) {
        event.preventDefault();

        this.setState({showMenu: true}, () => {
            // document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu() {
        this.setState({showMenu: false}, () => {
            document.removeEventListener('click', this.closeMenu);
        });


    }

    // onSelectCurrency(string) {
    //     let newRow =
    //     {
    //         currency: this.string,
    //         coversion:
    //             $.ajax({
    //                 url: "http://localhost:4000/currencies/getrate",
    //                 type: "POST",
    //                 contentType: "application/json; charset=utf-8",
    //                 crossDomain: true,
    //                 dataType: "json",
    //                 xhrFields: { withCredentials: true },
    //                 data: JSON.stringify(this.state.newData),
    //                 success: (data) => {
    //                     for(let i = 0; i < data.length; i +=1){

    //                     }
    //                     console.log("Work in progress");
    //                 },
    //                 error: () => {
    //                     console.log("Error: Could not submit");
    //                     ////////
    //                     this.props.action(false);
    //                 }
    //             })
    //     }
    // fav_currencies.push(newRow);
    //}
    //getting all the different currencies
    call_me_first() {
        if (!this.alreadyRan) {
            console.log("1");
            $.ajax({
                url: "http://localhost:4000/currencies/currencies",
                type: "GET",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                dataType: "json",
                xhrFields: {withCredentials: true},
                success: (data) => {
                    console.log("success into currencies", data);
                    let currencies = []
                    for (let i = 0; i < data.currencies.length; i++) {
                        const newRow = {value: '', label: ''};
                        newRow.value = data.currencies[i];
                        newRow.label = data.currencies[i];
                        currencies[i] = newRow;
                    }
                    this.setState({currencies: currencies})
                    this.call_getrate();
                },
                error: () => {
                    console.log("Error: Could not submit");
                    // this.props.action(false);
                }
            });
            this.alreadyRan = true;
        }

        // $.ajax({
        //     url: "http://localhost:4000/currencies/get_fav_cur",
        //     type: "GET",
        //     contentType: "application/json; charset=utf-8",
        //     crossDomain: true,
        //     dataType: "json",
        //     xhrFields: { withCredentials: true },
        //     success: (data) => {
        //         console.log("success into get_fav_cur and what's data" );
        //         for (let i = 0; i < data.length; i++) {
        //             console.log("success into get_fav_cur and what's data" + data[i].to);
        //             this.state.fav_curList.push(data[i].to);
        //         }
        //         this.call_getrate();
        //     },
        //     error: () => {
        //         console.log("Error: Could not Sumbit");
        //         // this.props.action(false);
        //     }
        // });

    }

    call_getrate() {
        console.log("call_getrate...so what is data");
        let tempCurs = [];
        for (let i = 0; i < this.state.currencies.length; i++) {
            console.log("getting into getrate");
            $.ajax({
                url: "http://localhost:4000/currencies/get_all_rates",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                dataType: "json",
                xhrFields: {withCredentials: true},
                data: JSON.stringify({from: this.state.defaultCurrencyCode}),
                success: (data) => {
                    if (data.length === 0) {
                        console.log("THERE IS NOTHING MEANINGFUL IN THIS WORLD");
                    }
                    console.log("returned data: ", data.results[i]);
                    tempCurs.push({
                        currency: this.state.currencies[i].label,
                        conversion: data.results[i].ct_rate.toFixed(4),
                        change: (100 * (data.results[i].ct_rate - data.results[i + 33].ct_rate) / data.results[i + 33].ct_rate).toFixed(4)
                    });
                    this.forceUpdate();
                    console.log(data);
                    console.log("Work in progress");
                },
                error: () => {
                    console.log("Error: Could not submit");
                }
            });
            this.setState({fav_currencies: tempCurs});
        }
        console.log("after getrate: ", this.state.fav_currencies);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("UPDATED!!!")
        this.call_me_first();
    }

    render() {
        console.log("RENDERING");
        this.call_me_first();
        console.log("What is in here, " + this.state.fav_currencies);
        var columns = [{
            Header: 'Currency',
            accessor: 'currency'
        }, {
            Header: '1 ' + this.state.defaultCurrencyCode,
            accessor: 'conversion'
        }, {
            Header: 'Change(day)',
            accessor: 'change',
            Cell: row => (
                <span
                    style={{
                        color: row.value >= 0 ? 'green'
                            : 'red',
                    }}>{row.value + "%"}</span>)
            // Cell: rowInfo => (<div 
            // style={{
            //     color:
            //         rowInfo.value > 0 
            //             ? "green" : "red"
            // }}
            // ></div>)
        }]
        return (
            <div className="currencyreportsContainer">
                <Header/>

                <div class="body">


                    <h1 id="h1title" align="center">Currencies</h1>


                    <div class="bottomBody">
                        <div className="gridContainer">

                            <div className="tableTop">
                                <h6 class="word" style={{color: "white"}}>Change Currency</h6>
                                <Select options={this.state.currencies} onChange={(e) => this.currencyChanged(e)}
                                        placeholder={this.state.defaultCurrencyCode}
                                        className="dropdown"/>
                                <div class="clickButton">
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
                        {/* <div class="linechart">
                                <h2 align="center" style={{ color: "black" }}>My Exchange Rates</h2>
                                <Linechart
                                    width={600}
                                    height={400}
                                    data={monthlyData}
                                    isDate="true"
                                    style={{ backgroundColor: "white", width: "600px" }}
                                />
                            </div> */}


                    </div>

                </div>
            </div>

        );
    }
}