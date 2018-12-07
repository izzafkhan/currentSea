import React from 'react';
import './Events.css';
import CurrencyMenu from '../Currencies/CurrencyMenu';
import AddEvent from './AddEvent';
import $ from 'jquery'
import moment from "moment"   
import Header from '../Header'
import ChromePicker from 'react-color'
import update from 'react-addons-update';

export default class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            

            showAddEntry: false,
            update: false,
            editableData : {},
            editUpdate : false,

            currentData: [{
                eventAbv:'',
                transactionID:'',
                eventName:'',

            },]

        }
        this.get = this.get.bind(this);
        this.addRow = this.addRow.bind(this);
        this.editRow = this.editRow.bind(this);
        this.closeRow = this.closeRow.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.deleteEdit = this.deleteEdit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.addToTable =this.addToTable.bind(this);
    }

    addRow = () => {
        if (this.state.showAddEntry === false){
            this.setState({
                showAddEntry: true
            });
        } else {
            this.setState({
                showAddEntry: false
                
            });
        }
    }

    addToTable(data){
        this.setState({
            update:true
        })

    }

    closeRow(id){
        this.state.showAddEntry = id;
        this.state.update = true;
        this.forceUpdate();
    } 

    closeEdit(accountId){
        let index = this.state.currentData.findIndex(x=>x.accountId==accountId);
        let editData = this.state.currentData;
        editData[index].edit = false;
        this.setState({
            currentData : editData,
            update: true,  
        });
        {/*Line 80 (was: editUpdate: true, which does nothing) is probably singlehandedly responsible for the problems we had today. Pitfall?*/}
    }

    
    deleteEdit(accountId){
        let index = this.state.currentData.findIndex(x=>x.accountId==accountId);
        let editData = this.state.currentData;
        var editIndex = editData.indexOf(index);
        editData.splice(editIndex, 1);
        this.setState({
            currentData : editData,
            update: true,
        });
        this.forceUpdate();
    }

    editRow = (e, accountId) => {
        let index = this.state.currentData.findIndex(x=>x.accountId==accountId);
        let editData = this.state.currentData;
        if (editData[index].edit === false) {
            editData[index].edit = true;
            this.setState({
                currentData : editData,
                editUpdate : true
            });
        } else {
            editData[index].edit = false;
            this.setState({
                currentData : editData,
                editUpdate : true
            });
        }
    }

    get(event) {
        {/*
            We'll need to figure out how to use the API before we can convert
            things. We will use the currency chosen in CurrencyMenu for this.
        */}
        this.setState({
            original: event.target.value,
            conversion: event.target.value
        })
    }


    componentDidMount(){
       /*$.ajax({
            url: "http://localhost:4000/event/get_all_events/",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType:"json",
            xhrFields: {withCredentials:true},
            success: (data) => {
                
                this.setState({
                    
                    currentData: data.results
                
                });   
                console.log("SUCCESS FOR EVENTS")
                
            },
            error: () => {
                 console.log("Error: Could not update.");
            }
        }); */
    }


    render() {
        if(this.state.update === true){
         /* $.ajax({
                url: "http://localhost:4000/events/get_all_events/",
                type: "GET",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                dataType:"json",
                xhrFields: {withCredentials:true},
                success: (data) => {
                    this.setState({
                        currentData : data.results,
                        update: false
                    });

                },
                error: () => {
                     console.log("Error: Could not update.");
                     this.setState({
                         update : false
                     })
                    }
            });*/
        }
        return (
            <div class="tableContainerE">
                <div className="events-table">
                    <table id='dataTableE'>
                        <thead>
                            <tr>
                                <th>Abbr.</th>
                                <th>Name</th>
                                <th>Color</th>
                            </tr>
                            <tr>
                                <th colSpan='6'>
                                    <button id='addEventButton' onClick={ e => this.addRow()}>+</button>
                                    {this.state.showAddEntry ? <div><AddEvent addEntry={this.state.showAddEntry} add={this.addToTable} action={this.closeRow}/></div> : <span></span>}                                </th>
                                 
                            </tr>
                        </thead>
                        <tbody>
                           { this.state.currentData.map(row => {
                                return (
                                    <tr key={`row-${row.accountID}`}>
                                        <td colSpan='6'>
                                            <table>
                                                <tbody>
                                                    <tr id='nested'>
                                                        <td><button onClick={(e) =>{this.editRow(e, row.transactionID)}}>{row.eventAbv}</button></td>
                                                        {/*<td><button onClick={(e) =>{this.editRow(e, row.transactionID)}}>{row.}</button></td>*/}
                                                        <td><button onClick={(e) =>{this.editRow(e, row.transactionID)}}>{row.eventName}</button></td>
                                                       
                                                    </tr>
                                                    {row.edit ?
                                                        <tr>
                                                            <td colSpan='6'>
                                                            </td>
                                                        </tr> : <tr></tr>}
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div> 
            </div>
            
        );
    }
}
