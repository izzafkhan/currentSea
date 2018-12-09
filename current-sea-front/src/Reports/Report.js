import React, {Component} from 'react';
import './Report.css';
import Menu from './Menu';
import BalanceSheet from './Tables/BalanceSheet';
import IncomeStatement from './Tables/IncomeStatement';
import Header from '../Header';
import $ from 'jquery';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

class Report extends Component {
    constructor(props){
        super(props);
        this.state = {
            presentIncomeStatement: false,
            currencies: []
        }

        this.handleIncomeStatementTapped = this.handleIncomeStatementTapped.bind(this);
        this.handleBalanceSheetTapped = this.handleBalanceSheetTapped.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    handleIncomeStatementTapped() {
        this.setState({
            presentIncomeStatement : false
        })
    }

    handleBalanceSheetTapped() {
        this.setState({
            presentIncomeStatement : true
        })
    }

    //getting all the different currencies

    componentDidMount() {
        $.ajax({
            url: "http://localhost:4000/currencies/currencies",
           type: "GET",
           contentType: "application/json; charset=utf-8",
           crossDomain: true,
           dataType:"json",
           xhrFields: { withCredentials:true },
           success: (data) => {
               let currencies = []
                for (let i = 0; i < data.currencies.length; i++) {
                    const newRow = {value: '', label: ''};
                    newRow.value = data.currencies[i];
                    newRow.label = data.currencies[i];
                    currencies[i] = newRow;
                }
                this.setState({currencies: currencies });
           },
           error: () => {
                console.log("Error: Could not fetch data");
           }
        });
    }

    render(){
        const currentSheet = () => {
            if (this.state.presentIncomeStatement == true) {
                return <IncomeStatement action={this.handleIncomeStatementTapped} currencies={this.state.currencies}/>
            }
            return <BalanceSheet action={this.handleBalanceSheetTapped} currencies={this.state.currencies}/>
        }

        return(
            <body className="reportsRootContainer">
                <Header/>
                <h1 id="h1title">Reports</h1>

                {currentSheet()}


            </body>
        );
    }
}

export default Report;