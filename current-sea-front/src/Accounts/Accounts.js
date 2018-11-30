import React, { Component } from 'react';
import Header from '../Header.js';
import { Link } from "react-router-dom";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-table/react-table.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './Accounts.css';
import SelectCurrency from 'react-select-currency';
import {ChromePicker} from 'react-color';
import { Sketch } from 'react-color/lib/components/sketch/Sketch';
import { ToggleRadioButtonUnchecked } from 'material-ui/svg-icons';


var data = [
    {
         onBalance: false ,acctNum: '2193', acctName : 'Food'
    }
    ,{onBalance: false , acctNum: '2343', acctName : 'Cash'}
];

var data2 = [
    {
        evDate: '03/12/2018', evName: 'Dinner Party', evColor: 'pink'
    }
];
function onInsert(row){
    let newRow = '';
    
}


class CustomInsertModal extends React.Component {

    
    handleSaveBtnClick = () => {
      const { columns, onSave } = this.props;
      const newRow = {};
      columns.forEach((column, i) => {
        newRow[column.field] = this.refs[column.field].value;
      }, this);
      // You should call onSave function and give the new row
      onSave(newRow);
    }
    state = {
        displayColorPicker: true,
      };
    
      handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
      };
    
      handleClosToggleRadioButtonUncheckede = () => {
        this.setState({ displayColorPicker: false })
      };
    
    
    render() {
      const {
        onModalClose,
        onSave,
        columns,
        validateState,
        ignoreEditable
      } = this.props;
      const popover = {
        position: 'absolute',
        zIndex: '2',
      }
      const cover = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      }
      return (
        <div style={ { backgroundColor: 'white' } } className='modal-content'>
          <h2 align='center' style={ { color: 'black' } }>Add Account</h2>
          <div>
            
            
           <label> Account Name: </label>
           <input ref= 'acctName' type='text' defaultValue={ '' } />
              
              
              
          </div>
          <div>
            <button className="btn btn-outline-primary float-right" onClick={ () => this.handleSaveBtnClick(columns, onSave) }>Save</button>
            <button  className="btn btn-outline-danger float-right" onClick={ onModalClose }>Cancel</button>
           
          </div>
            
        </div>
      );
    }
  }
  

export default class Accounts extends Component{
    constructor(props){
        super(props);
        this.state={
            accounts: data,
            events : data2,
        }
       
    }
    customModal = (onModalClose, onSave, columns, validateState, ignoreEditable ) => {
        const attr = {
            onModalClose, onSave, columns, validateState, ignoreEditable
        };
        return(
            <CustomInsertModal { ... attr } />
        );
    }

    
  render() {
    const cellEditP = {
        mode: 'click',
    }
    const options = {
        insertModal : this.customModal
    };
  
      return(
        
        <div>     
            <Header/>
            <h1 align="center"> My Accounts </h1>
            <div class = "accountsTable">
            <BootstrapTable data = {this.state.accounts}
                            options={options}
                            insertRow = {true}
                            pagination = {true}
                            cellEdit = {cellEditP}
                            containerStyle = {
                                {
                                    width: "50%"
                                }
                            }

            >

                <TableHeaderColumn isKey dataField = 'acctNum'
                                    headerAlign="center"
                                    width = "30%"
                                    dataAlign = "right">
                                    
                    Account Number
                </TableHeaderColumn>
                <TableHeaderColumn dataField = 'acctName'
                                    dataAlign = "right">
                    Account Name
                </TableHeaderColumn>
            </BootstrapTable>

            <TableHeaderColumn isKey dataField = 'acctNum'
                                headerAlign="center"
                                width = "30%"
                                dataAlign = "right"
                                >
                                
                Statement Type 
            </TableHeaderColumn>


            </div>
         
            <div class = "EventsTable">
            <BootstrapTable data = {this.state.events}
                            insertRow = {true}
                            pagination = {true}
                            cellEdit = {cellEditP}
                          
                            containerStyle = {
                                {
                                    width: "50%",
                                    padding: "0"
                                }
                            }

            >
                <TableHeaderColumn  dataField = 'evColor'
                                    dataAlign = "right"
                                    width = "20%">
                                    
                    Color
                </TableHeaderColumn>
                <TableHeaderColumn  dataField= 'evDate'
                                    headerAlign="center"
                                    width= "40%"
                                    dataAlign = "center"
                                     >
                    Date
                                   
                
                </TableHeaderColumn>
                <TableHeaderColumn isKey dataField = 'evName'
                                    headerAlign="center"
                                    width = "40%"
                                    dataAlign = "right">
                                    
                    Event Name
                </TableHeaderColumn>
                
            </BootstrapTable>
            </div>

        </div>
  
       
    );
  }
};


