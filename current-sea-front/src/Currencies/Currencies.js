import React from 'react';
import Header from '../Header';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-table/react-table.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
//import SplitPane from 'react-split-pane'
import Linechart from 'react-linechart';
import $ from 'jquery'
import { monthlyData } from 'react-linechart/example/constants/points'
import 'react-linechart/dist/styles.css';
import currencyMenu from './CurrencyMenu';
import Select from 'react-select';
import './currencies.css'
//import {CurrencyMenu} from 'CurrenciesMenu.js'
//import CurrenciesGraph from 'CurrenciesGraph.js'
//import ReactChartkick, { LineChart} from 'react-native-chart-kit';
//var CanvasJSReact = require('./canvasjs.react');
//var CanvasJS = CanvasJSReact.CanvasJS;
//var CanvasJSChart = CanvasJSReact.CanvasJSChart;


/*function createGraph()
{
    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2", // "light1", "dark1", "dark2"
        title:{
            text: "Exchange Rates Change"
        },
        axisY: {
            title: "Percentage",
            includeZero: true,
            suffix: "%"
        },
        axisX: {
            title: "Month of Year",
            prefix: "M",
            interval: 1
        },
        data: [{
            type: "line",
            toolTipContent: "Month {x}: {y}%",
            dataPoints: [
                { x: 1, y: 64 },
                { x: 2, y: 61 },
                { x: 3, y: 64 },
                { x: 4, y: 62 },
                { x: 5, y: 64 },
                { x: 6, y: 60 },
                { x: 7, y: 58 },
                { x: 8, y: 59 },
                { x: 9, y: 53 },
                { x: 10, y: 54 },
                { x: 11, y: 61 },
                { x: 12, y: 60 }
            ]
        }]
    }
    return options;
}*/

var fav_currencies = [
    { currency: 'USD', conversion: '0.342', change: '0.23%' },
    { currency: 'SEK', conversion: '1.00', change: '0.01%' }
];

function onInsert(row) {
    let newRow = '';

}
export default class Currencies extends React.Component {
    constructor(props) {
        super(props);

        this.onSelectCurrency = this.onSelectCurrency.bind(this);
        this.state = {
            showMenu: false,
            currencies: []
        };

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    showMenu(event) {
        event.preventDefault();

        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
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
                        //this.props.action(false);
                    }
                })
        }
        fav_currencies.push(newRow);
        //{currency: 'USD', conversion : '0.342', change: '0.23%'},
        //{currency: 'SEK', conversion : '1.00',change:'0.01%'}
    }
    componentDidMount () {
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
                //this.props.action(false);
            }
        });
    }
    render() {
        /*
        const cellEditP = {
            mode: 'click',
        }
        */
        return (

            <div class="body">
                {/*
                <Header />
                <h1 align="center">Currencies</h1>
                <div>
                    <div>
                        <button onClick={this.showMenu}>+New</button>
                        {
                            this.state.showMenu
                                ? (
                                    <div id="currencyHolder">
                                        <Select options={this.state.currencies} />
                                    </div>
                                )
                                : (
                                    null
                                )
                        }
                    </div>
                    <div class="col-sm-12">
                        <BootstrapTable data={fav_currencies}
                            insertRow={true}
                            pagination={true}
                            //cellEdit = {cellEditP}
                            containerStyle={
                                {
                                    width: "40%"
                                }
                            }

                        >
                            <TableHeaderColumn isKey dataField='currencyFrom'
                                headerAlign="center"
                                width="40%"
                                dataAlign="right">

                                Currency From
                    </TableHeaderColumn>

                            <TableHeaderColumn dataField='conversion'
                                dataAlign="right">
                                "Rate"
                    </TableHeaderColumn>

                            <TableHeaderColumn dataField='change'
                                dataAlign="right">
                                Change(day)
                    </TableHeaderColumn>

                        </BootstrapTable>

                    </div>
                    <div>
                        <h2>My Exchange Rates</h2>
                        <Linechart
                            width={1500}
                            height={500}
                            data={monthlyData}
                        />
                    </div>

                        </div>*/}
            </div>
        );
    }
}