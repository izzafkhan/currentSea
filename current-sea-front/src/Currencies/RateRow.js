import React from 'react';
import './RateRow.css';
import $ from 'jquery';
class RateRow extends React.Component{
    constructor(props){
        super(props);
        this.defaultCurrency = this.props.defaultCurrency;
        this.currency = this.props.currency;
        this.rate = undefined;

        this.getrate = this.getrate.bind(this);
    }
    getrate = () => {
        $.ajax({
            url: "http://localhost:4000/currencies/getrate",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            xhrFields: { withCredentials: true },
            data: JSON.stringify({from: this.currency, to: this.defaultCurrency}),
            success: (data) => {
                this.rate = data.rate.toFixed(4);
            },
            error: () => {
                console.log("Error: Could not fetch rate");
            }
        });
    }
    getpastrate = () => {
        $.ajax({
            url: "http://localhost:4000/currencies/gethistoricrate",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            xhrFields: { withCredentials: true },
            data: JSON.stringify({from: this.currency, to: this.defaultCurrency, }),
            success: (data) => {
                this.rate = data.rate.toFixed(4);
            },
            error: () => {
                console.log("Error: Could not fetch rate");
            }
        });
    }
    render() {
        this.getrate();
        this.getpastrate();
        return (
            <tr className="dtable" style = {{color: "white"}}>
                <th>{this.props.currency}</th>
                <th>{this.rate}</th>
                <th>changewhateverthisis</th>
            </tr>
        )
    }
}

export default RateRow;