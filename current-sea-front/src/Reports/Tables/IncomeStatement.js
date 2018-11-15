import React, {Component} from 'react';
import './IncomeStatement.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

class IncomeStatement extends Component{
    constructor(props){
        super(props);

    }
    render(){
        var { data = [] } = this.props
        var columns = [{
            Header: '#',
            accessor: 'number'
        }, {
            Header: 'Category',
            accessor: 'category'
        }, {
            Header: 'Account',
            accessor: 'account'
        }, {
            Header: 'Change',
            accessor: 'change'
        }]
        return(
            <div className="IncomeStatement-table">
                <ReactTable
                        data = {data}
                        noDataText="Your income and expenses will appear here"
                        columns = {columns}
                    />
            </div>
        );
    }
}

export default IncomeStatement

{/*}
            <table className="IncomeStatement-table">
                <thead>
                    <tr>
                        <th id="header-number">
                            <div className="IncomeStatement-number">#</div>
                        </th>
                        <th id="header-category">
                            <div className="IncomeStatement-category"> </div>
                        </th>
                        <th id="header-account">
                            <div className="IncomeStatement-account">Account</div>
                        </th>
                        <th id="header-change">
                            <div className="IncomeStatement-change">Change</div>
                        </th>
                    </tr>
                </thead>
            </table>*/}