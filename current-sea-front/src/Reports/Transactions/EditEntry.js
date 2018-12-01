import React from 'react';
import './EditEntry.css';
import CurrencyMenu from '../../Currencies/CurrencyMenu';

export default class EditEntry extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : this.props.editData
        }
    }

    render(){
        return(
            <div>
                <table>
                    <thead id='headEntry'>
                        <tr>
                            <th>No.</th>
                            <th>Account</th>
                            <th>Debit</th>
                            <th>Credit</th>
                            <th>Category</th>
                            <th><div><CurrencyMenu editCurrency={this.state.data.currencyId}/></div></th>
                        </tr>
                    </thead>
                    <tbody id='bodyEntry'>
                        <tr>
                            <td>{this.state.data.accountId}</td>
                            <td>{this.state.data.account}</td>
                            <td></td>
                            <td>{this.state.data.creditAmt}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>{this.state.data.eventId}</td>
                            <td>{this.state.data.description}</td>
                            <td>{this.state.data.debitAmt}</td>
                            <td></td>
                            <td>{this.state.data.event}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <button>Save</button>
                <button id='entryButton'>Delete</button>
            </div>
            
        );
    }
}