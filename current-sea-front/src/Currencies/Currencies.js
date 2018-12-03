import React from 'react';
import Header from '../Header';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-table/react-table.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
//import SplitPane from 'react-split-pane'
import Linechart from 'react-linechart';
import $ from 'jquery'
import {monthlyData} from 'react-linechart/example/constants/points'
import 'react-linechart/dist/styles.css';
import currencyMenu from './CurrencyMenu';
//import {CurrencyMenu} from 'CurrenciesMenu.js'
//import CurrenciesGraph from 'CurrenciesGraph.js'
//import ReactChartkick, { LineChart} from 'react-native-chart-kit';
//var CanvasJSReact = require('./canvasjs.react');
//var CanvasJS = CanvasJSReact.CanvasJS;
//var CanvasJSChart = CanvasJSReact.CanvasJSChart;

/*
function createGraph()
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
}
*/
var fav_currencies = [
    {currency: 'USD', conversion : '0.342', change: '0.23%'},
    {currency: 'SEK', conversion : '1.00',change:'0.01%'}
];

function onInsert(row){
    let newRow = '';
    
}
export default class Currencies extends React.Component{
    constructor(props) 
    {
        super(props);
        
        this.onSelectCurrency = this.onSelectCurrency.bind(this);
        this.state = {
          showMenu: false,
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
    
    onSelectCurrency(string)
    {
        let newRow = 
        {
            currency: this.string,
            coversion: 
                $.ajax({
                    url: "http://localhost:4000/currencies/get-rate",
                    type: "GET",
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
                        //this.props.action(false);
                    }
                }),
            change:       
                $.ajax({
                    url: "http://localhost:4000/currencyUpdate/update",
                    type: "PUT",
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
                        //this.props.action(false);
                    }
                })
        }
        fav_currencies.push(newRow);
    //{currency: 'USD', conversion : '0.342', change: '0.23%'},
    //{currency: 'SEK', conversion : '1.00',change:'0.01%'}
    }
    render(){
        /*
        const cellEditP = {
            mode: 'click',
        }
        */
        return(

            <div>
                <Header />
                <h1 align="center"> New </h1>
                <div>
                <div>
                    <button onClick={this.showMenu}>+New</button>
                    {
                    this.state.showMenu
                        ? (
                        <div id="currencyHolder">
                            <button onClick={ () => {this.onSelectCurrency('USD');}}>USD</button>
                            <button onClick={ () => {this.onSelectCurrency('EUR');}}>EUR</button>
                            <button onClick={ () => {this.onSelectCurrency('GBP');}}>GBP</button>
                            <button onClick={ () => {this.onSelectCurrency('JPY');}}>JPY</button>
                        </div>
                )
                : (
                null
                )
            }
                </div>
                <div class="col-sm-12">
                    <BootstrapTable data = {fav_currencies}
                        insertRow = {true}
                        pagination = {true}
                        //cellEdit = {cellEditP}
                        containerStyle = {
                            {
                                width: "40%"
                            }
                        }

                    >
                    <TableHeaderColumn isKey dataField = 'currency'
                                    headerAlign="center"
                                    width = "40%"
                                    dataAlign = "right">
                                    
                    Currency
                    </TableHeaderColumn>

                   <TableHeaderColumn dataField = 'conversion'
                        dataAlign = "right">
                        1 "currency here"
                    </TableHeaderColumn>

                    <TableHeaderColumn dataField = 'change'
                            dataAlign = "right">
                        Change(day)
                    </TableHeaderColumn>
                    </BootstrapTable>
            
                </div>
                <div>
                    <h2>My Exchange Rates</h2>
                    <Linechart
                        width={750}
                        height={500}
                        data={monthlyData}
                    />
                </div>

            </div>  
        </div>
        );
    }
}