import React, {Component} from 'react';
import './Report.css';
import Menu from './Menu'
import BalanceSheet from './Tables/BalanceSheet'
import IncomeStatement from './Tables/IncomeStatement'
import Header from '../Header'
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

class Report extends Component {
    constructor(props){
        super(props);

        this.state = {
            presentIncomeStatement: false
            
        }

        this.handleIncomeStatementTapped = this.handleIncomeStatementTapped.bind(this);
        this.handleBalanceSheetTapped = this.handleBalanceSheetTapped.bind(this)
    }

    handleIncomeStatementTapped() {

        this.setState({
            presentIncomeStatement : false
        })

        console.log("in income")

    }

    handleBalanceSheetTapped() {

        this.setState({
            presentIncomeStatement : true
        })

        console.log("in balance")
    }

    //
    //
    // showBalanceSheet(event){
    //     this.setState({
    //         balance : true
    //     })
    // }
    //
    // showIncomeStatement(event){
    //     this.setState({
    //         balance : false
    //     })
    // }

    render(){

        const currentSheet = () => {
            if (this.state.presentIncomeStatement == true) {
                return <IncomeStatement action={this.handleIncomeStatementTapped}/>

            }
            return <BalanceSheet action={this.handleBalanceSheetTapped}/>
        }

        return(
            <body className="reportsRootContainer">
                <Header/>
                <div className="reportsTitle">Reports</div>

                {currentSheet()}


            </body>
            // {/*<div>*/}
            //     {/*<Header />*/}
            //     {/*<div class="container">*/}
            //         {/*<div class="sheets">*/}
            //             {/*<h1 align="center">Reports Page</h1>*/}
            //
            //             {/*<div className="reports-options">*/}
            //                 {/*<Menu className="reports-menu" setBalanceSheet={this.showBalanceSheet.bind(this)} setIncomeStatement={this.showIncomeStatement.bind(this)}/>*/}
            //                 {/**/}
            //                 {/*<CurrencyMenu />*/}
            //             {/*</div>*/}
            //
            //             {/*{this.state.balance ? */}
            //             {/*<BalanceSheet /> :*/}
            //             {/*<IncomeStatement /> }*/}
            //         {/*</div>*/}
            //         {/*<div class="diagrams">*/}
            //             {/*/!**/}
            //                 {/*Need to figure out how to display graphs and diagrams before this is workable*/}
            //             {/**!/*/}
            //         {/*</div>*/}
            //     {/*</div>*/}
            // {/*</div>*/}

        );
    }
}

export default Report;