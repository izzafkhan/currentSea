import React from 'react';
import Header from '../Header';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import $ from 'jquery'
import 'react-linechart/dist/styles.css';
import Select from 'react-select';
import './currencies.css';




export default class Currencies extends React.Component {
    constructor(props) {
        super(props);
        this.alreadyRan = false;
        this.state = {
            fav_currencies: [
                // toCurrency: cur_obj={currency, conversion, change}   
            ],
            currencies: [],
            defaultCurrencyCode: 'USD',
        };
        this.currencyChanged = this.currencyChanged.bind(this);
        this.call_getrate = this.call_getrate.bind(this);
        this.call_me_first = this.call_me_first.bind(this);
    }

    //getting different currencies rate
    currencyChanged = event => {
        let currencyCode = event.value;
        this.setState({defaultCurrencyCode: currencyCode});
        $.ajax({
                url: "http://localhost:4000/currencies/getrate",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                dataType: 'json',
                xhrFields: {withCredentials: true},
                data: JSON.stringify({from: this.state.defaultCurrencyCode, to: currencyCode}),
                success:  (receivedData) => {
                    this.setState({exchangeRate: receivedData.rate, defaultCurrencyCode: currencyCode});
                    this.alreadyRan = false;
                    this.call_getrate();
                },
                error: (receivedData) => {
                    alert('error occurred')

                }
            });
    }
    //getting all the different currencies
    call_me_first() {
        if(!this.alreadyRan){
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
                this.call_getrate();
            },
            error: () => {
                console.log("Error: Could not submit");
            }
        });
    this.alreadyRan = true;
    }
        
    }

    call_getrate(){
        let tempCurs = [];
        for (let i = 0; i < this.state.currencies.length; i++) {
            $.ajax({
                url: "http://localhost:4000/currencies/get_all_rates",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                dataType: "json",
                xhrFields: { withCredentials: true },
                data: JSON.stringify({from: this.state.defaultCurrencyCode}),
                success: (data) => {
                    if(data.length === 0){
                        console.log("data is empty");
                    }
                    tempCurs.push({currency: this.state.currencies[i].label, conversion: data.results[i].ct_rate.toFixed(4), change: (100*(data.results[i].ct_rate-data.results[i+33].ct_rate)/data.results[i+33].ct_rate).toFixed(4)
                    }); 
                    this.forceUpdate();
                    console.log("Work in progress");
                },
                error: () => {
                    console.log("Error: Could not submit");
                }
            });
            this.setState({fav_currencies : tempCurs});
        }
    }

componentDidUpdate(prevProps, prevState){
    // console.log("UPDATED!!!")
    this.call_me_first();
}

    render() {
        this.call_me_first();
        var columns = [{
            Header: 'Currency',
            accessor: 'currency'
        }, {
            Header: '1 ' + this.state.defaultCurrencyCode,
            accessor: 'conversion'
        }, {
            Header: 'Change (day)*',
            accessor: 'change',
            Cell: row => (
                  <span
                    style={{
                      color: row.value >= 0 ? 'green'
                        : 'red',
                    }}>{row.value+"%"}</span>)
        }]
        return (
            <div className="currencyreportsContainer">
                <Header />

                <div class="body">


                    <h1 align="center">Currencies</h1>

                    <div>

                        <div class="bottomBody">
                            <div className="gridContainer">

                                <div className="tableTop" >
                                    <Select options={this.state.currencies} onChange={(e) => this.currencyChanged(e)} placeholder={this.state.defaultCurrencyCode}
                                                        className="dropdown" />
                                    <h15 class = "word" style = {{color: "white"}}>* Rates do not change over the weekend</h15>
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
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}