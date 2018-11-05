import React, {Component} from 'react';
import './IncomeStatement.css';

class IncomeStatement extends Component{
    render(){
        return(
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
            </table>
        );
    }
}

export default IncomeStatement