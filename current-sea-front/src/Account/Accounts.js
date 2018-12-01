import React from 'react';
import './Accounts.css';
import CurrencyMenu from '../Currencies/CurrencyMenu';
import AddAccount from './AddAccount';
import $ from 'jquery'
import Header from '../Header';

export default class Accounts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            showAddAccount: false,

            currentData: [{
                aa_num  : 2103,
                aa_description: 'New Entries Go Here',
                aa_type: 'Balance',
                aa_user_id : '',
                aa_id: 0,
                edit : false,

            }]

        }
      
       
       
        this.addRowA = this.addRowA.bind(this);
        this.editRowA = this.editRowA.bind(this);
        this.closeRowA = this.closeRowA.bind(this);
    }

    addRowA = () => {
        if (this.state.showAddAccount === false){
            this.setState({
                showAddAccount: true
            });
        } else {
            this.setState({
                showAddAccount: false
            });
        }
    }

    closeRowA(aa_id){
        this.state.showAddAccount = aa_id;
        this.forceUpdate();
    } 

    editRowA = (e, aa_id) => {
        let index = this.state.currentData.findIndex(x=>x.aa_id==aa_id);
        let editData = this.state.currentData;
        if (editData[index].edit === false) {
            editData[index].edit = true;
            this.setState({
                currentData : editData
            });
        } else {
            editData[index].edit = false;
            this.setState({
                currentData : editData
            });
        }
    }



    render() {

       /* $.ajax({
            url: "http://localhost:4000/transactions/get_transactions",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType:"json",
            xhrFields: {withCredentials:true},
            success: (data) => {
                this.setState({
                    currentData : data
                });
            },
            error: () => {
                 console.log("Error: Could not update.");
            }
        });
*/
        return (
            <div>
                <Header/>
            <div class="tableContainer">
            
                <div className="account-table">
                    <table id='dataTableAcct' width="600">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Description</th>
                                <th>Type</th>
                            </tr>
                            <tr>
                                <th colSpan='6'>
                                    <button id='addAccountButton' onClick={ e => this.addRowA()}>+</button>
                                    {this.state.showAddAccount? <div><AddAccount addAccount={this.state.showAddAccount} action={this.closeRow}/></div> : <span></span>}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            
                             
                                    <tr key={`row-${this.aa_id}`}>
                                        <td colSpan='6'>
                                            <table>
                                                <tbody>
                                                    <tr id='rows'>
                                                        <td><button onClick={(e) =>{this.editRowA(e, this.aa_id)}}>{this.aa_id}</button></td>
                                                        <td><button onClick={(e) =>{this.editRowA(e, this.aa_id)}}>{this.aa_num}</button></td>
                                                        <td><button onClick={(e) =>{this.editRowA(e, this.aa_id)}}>{this.aa_description}</button></td>
                                                        <td><button onClick={(e) =>{this.editRowA(e, this.aa_id)}}>{this.aa_type}</button></td>
                                                    </tr>
                                                    {this.edit ?
                                                        <tr>
                                                            <td colSpan='6'>
                                                                
                                                            </td>
                                                        </tr> : <tr></tr>}
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                
                            
                        </tbody>
                    </table>
                </div>
                </div>

                </div>
     
        );
    }
}