import React, {Component} from 'react';
import './Report.css';
import Menu from './Menu'
import BalanceSheet from './Tables/BalanceSheet'
import IncomeStatement from './Tables/IncomeStatement'
import Header from '../Header'

import "react-datepicker/dist/react-datepicker.css";
import CurrencyMenu from '../Currencies/CurrencyMenu';

class Report extends Component {
    constructor(){
        
        super();
        this.state = {
            balance : true,
            
        }
     
    }

  

    showBalanceSheet(event){
        this.setState({
            balance : true
        })
    }

    showIncomeStatement(event){
        this.setState({
            balance : false
        })
    }

    render(){
        return(
            <div>
                <Header />
                <div class="container">
                    <div class="sheets">
                        <h1 align="center">Reports Page</h1>

                        <div className="reports-options">
                            <Menu className="reports-menu" setBalanceSheet={this.showBalanceSheet.bind(this)} setIncomeStatement={this.showIncomeStatement.bind(this)}/>
                            
                          
                        </div>

                        {this.state.balance ? 
                        <BalanceSheet /> :
                        <IncomeStatement /> }
                    </div>
                    <div class="diagrams">
                        {/*
                            Need to figure out how to display graphs and diagrams before this is workable
                        */}
                    </div>
                </div>
            </div>
        );
    }
}

export default Report;