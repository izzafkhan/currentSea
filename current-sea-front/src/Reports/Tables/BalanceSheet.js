import React, {Component} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import './BalanceSheet.css';

class BalanceSheet extends Component{
    constructor(props){
        super(props);

    }
    render(){
        var { data = [] } = this.props
        var columns = [{
                Header: 'Number',
                accessor: 'number'
            }, {
                Header: 'Currency',
                accessor: 'currency',
            }, {
                Header: 'Account',
                accessor: 'account',
            }, {
                Header: 'Start',
                accessor: 'start'
            }, {
                Header: 'End',
                accessor: 'end'
            }, {
                Header: 'Change',
                accessor: 'change'
            }
        ]
        return(
            <div className="BalanceSheet-table">
                <ReactTable
                        data = {data}
                        noDataText="Your spending will appear here"
                        columns = {columns}
                    />
            </div>
        );
    }
}

export default BalanceSheet;

{/*<table className="BalanceSheet-table">
                <thead>
                    <tr>
                        <th id="header-number">
                            <div className="BalanceSheet-number"> # </div>
                        </th>
                        <th id="header-currency">    
                            <div className="BalanceSheet-acount">  </div>
                        </th>
                        <th id="header-account">    
                            <div className="BalanceSheet-account"> Account </div>
                        </th>
                        <th id="header-start">    
                            <div className="BalanceSheet-start"> Start </div>
                        </th>
                        <th id="header-change">    
                            <div className="BalanceSheet-change"> Change </div>
                        </th>
                        <th id="header-end">    
                            <div className="BalanceSheet-end"> End </div>
                        </th>
                    </tr>
                </thead>
                <tbody className="BalanceSheet-body">
                </tbody>
        </table> */}