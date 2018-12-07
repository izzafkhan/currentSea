import React from 'react';
import './Transaction.css';
import AddEntry from './Transactions/AddEntry';
import EditEntry from './Transactions/EditEntry';
import StartBalance from './Transactions/StartBalance';
import $ from 'jquery'
import moment from "moment"
import Select from 'react-select';   
import {HorizontalBar} from 'react-chartjs-2';

const options = {
    scales: {
         xAxes: [{
             stacked: true,
             display: false,
         }],
         yAxes: [{
             stacked: true,
             display: false,
         }]
     },
     legend: {
        display : true,
        position: 'bottom',
        labels: {
            fontColor: 'rgb(255, 99, 132)'
        }
    }
}

export default class Transaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddEntry: false,
            update: false,
            editableData : {},
            editUpdate : false,

            currentData: [{
                tt_transaction_id : 0,
                tt_date : ' ',
                tt_description: 'Start Balance',
                tt_balance: 0,
                tt_currency: ' ',
                tt_user_id : ' ',
                edit : false,

            }],
            convertCurrencies: [],
            startCurrency: {label: '', value: ''},
            endCurrency: {label: '', value: ''},
            original: 0,
            rate : 1,
            conversion: 0,
            startBalance: false,
            accounts: [],

            chartData : { 
                datasets:[{
                  label: 'event1',
                  backgroundColor: 'rgba(0,99,132,0.2)',
                     hoverBackgroundColor: 'rgba(0,99,132,0.4)',
                    data :[1]
                  },
                  {
                    label: 'event2',
                    backgroundColor: 'rgba(255,0,132,0.2)',
                     hoverBackgroundColor: 'rgba(255,0,132,0.4)',  
                    data:  [2]   
                  },
                  {
                     label: 'event3',
                     backgroundColor: 'rgba(255,99,0,0.2)',
                      hoverBackgroundColor: 'rgba(255,99,0,0.4)',    
                     data:  [2]   
                   },
                   {
                     label: 'event4',
                     backgroundColor: 'rgba(255,99,132,0.2)',
                      hoverBackgroundColor: 'rgba(255,99,132,0.4)',     
                     data:  [2]   
                   }
                 ],
                labels:['label']
              }
        }
        this.convert = this.convert.bind(this);
        this.income = this.income.bind(this);
        this.expenses = this.expenses.bind(this);
        this.addRow = this.addRow.bind(this);
        this.editRow = this.editRow.bind(this);
        this.closeRow = this.closeRow.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.closeStart = this.closeStart.bind(this);
        this.deleteEdit = this.deleteEdit.bind(this);
        this.handleStartCurrency = this.handleStartCurrency.bind(this);
        this.handleEndCurrency = this.handleEndCurrency.bind(this);
        this.setBalance = this.setBalance.bind(this);
        this.updateChart = this.updateChart.bind(this);
    }

    updateChart(){
        let dataSetCopy = this.state.chartData.datasets.slice(0);
        let dataCopy1 = dataSetCopy[0].data.slice(0);
        let labelCopy1 = dataSetCopy[0].label;
        let dataCopy2 = dataSetCopy[1].data.slice(0);
        let labelCopy2 = dataSetCopy[1].label;
        let dataCopy3 = dataSetCopy[2].data.slice(0);
        let labelCopy3 = dataSetCopy[2].label;
        let dataCopy4 = dataSetCopy[3].data.slice(0);
        let labelCopy4 = dataSetCopy[3].label;

        let max1 = 0;
        let label1 = '';
        let max2 = 0;
        let label2 = '';
        let max3 = 0;
        let label3 = '';
        let total = 1;
        let other = 'Other';
        for(let i = 0; i < this.state.currentData.length; i++){
            console.log(this.state.currentData);
            if(this.state.currentData[i].tt_balance >= max1){
                max3 = max2;
                label3 = label2;
                max2 = max1;
                label2 = label1;
                max1 = this.state.currentData[i].tt_balance;
                label1 = this.state.currentData[i].tt_description; 
            }
            total += this.state.currentData[i].tt_balance;
        }

        dataCopy1[0] = (max1*100 / total);
        labelCopy1 = (label1);
        dataCopy2[0] = (max2*100 / total);
        labelCopy2 = (label2);
        dataCopy3[0] = (max3*100 / total);
        labelCopy3 = (label3);
        dataCopy4[0] = ((total - (max1 + max2 + max3))*100/total);
        labelCopy4 = (other);

        dataSetCopy[0].data = dataCopy1;
        dataSetCopy[1].data = dataCopy2;
        dataSetCopy[2].data = dataCopy3;
        dataSetCopy[3].data = dataCopy4;

        dataSetCopy[0].label = labelCopy1;
        dataSetCopy[1].label = labelCopy2;
        dataSetCopy[2].label = labelCopy3;
        dataSetCopy[3].label = labelCopy4;
        console.log(dataSetCopy);
        this.setState({
            chartData : Object.assign({}, this.state.chartData, {
                datasets: dataSetCopy
            })
        })
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

    closeRow(id){
        this.state.showAddEntry = id;
        this.state.update = true;
        this.forceUpdate();
        this.updateChart();
    } 

    closeEdit(tt_transaction_id, sum){
        let index = this.state.currentData.findIndex(x=>x.tt_transaction_id==tt_transaction_id);
        let editData = this.state.currentData;
        editData[index].edit = false;
        editData[index].tt_balance = sum;
        this.setState({
            currentData : editData,
            update: true,  
        });
        this.updateChart();
    }

    closeStart(){
        this.setState({
            startBalance : false,
            update: true,
        })
    }

    deleteEdit(tt_transaction_id){
        let index = this.state.currentData.findIndex(x=>x.tt_transaction_id==tt_transaction_id);
        let editData = this.state.currentData;
        var editIndex = editData.indexOf(index);
        editData.splice(editIndex, 1);
        this.setState({
            currentData : editData,
            update: true,
        });
        this.forceUpdate();
        this.updateChart();
    }

    editRow = (e, tt_transaction_id) => {
        let index = this.state.currentData.findIndex(x=>x.tt_transaction_id==tt_transaction_id);
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

    handleStartCurrency(event){
        this.setState({
            startCurrency : event
        })
    }

    handleEndCurrency(event){
        this.setState({
            endCurrency : event
        })
    }

    setBalance(){
        if (this.state.startBalance === false){
            this.setState({
                startBalance: true
            });
        } else {
            this.setState({
                startBalance: false
            });
        }
    }

    convert(event) {
        var from = this.state.startCurrency.value;
        var to = this.state.endCurrency.value;
        $.ajax({
            url: "http://localhost:4000/currencies/getrate",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType:"json",
            xhrFields: {withCredentials:true},
            data : JSON.stringify({from, to}),
            success: (data) => {
                console.log(data);
                this.setState({
                    rate : parseFloat(data.rate) 
                })
            },
            error: () => {
                 console.log("Error: Could not update.");
            }
        });
        this.state.original = parseFloat(event.target.value);
        this.setState({
            conversion : isNaN(this.state.rate * this.state.original) ? 0 : (this.state.rate * this.state.original).toFixed(4) 
        })
        var test = event.target.value;
        console.log(test);
        console.log(parseFloat(test));
    }

    income() {
        this.setState({
            showIncome: true
        })
    }

    expenses() {
        this.setState({
            showIncome: false
        })
    }

    componentDidMount(){
        $.ajax({
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
                console.log(this.state.currentData);
                console.log('Update');
                this.updateChart();
            },
            error: () => {
                 console.log("Error: Could not update.");
            }
        });

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
                this.setState({convertCurrencies: currencies,
                    startCurrency : currencies[31],
                    endCurrency: currencies[8]    
                })
           },
           error: () => {
                console.log("Error: Could not fetch data");
           }
        });
        $.ajax({
            url: "http://localhost:4000/accounts/get_accounts",
           type: "GET",
           contentType: "application/json; charset=utf-8",
           crossDomain: true,
           dataType:"json",
           xhrFields: { withCredentials:true },
           success: (data) => {
                const accounts = [];
                for (let i = 0; i < data.results.length; i++) {
                    const newRow = {value: '', label: ''};
                    newRow.value = data.results[i].at_account_id;
                    newRow.label = data.results[i].at_account_id + " " + data.results[i].at_account_name;
                    accounts[i] = newRow;
                }
                this.setState({
                    accounts: accounts
                });
           },
           error: () => {
                console.log("Error: Could not fetch data");
           }
        });
    }


    render() {
        if(this.state.update === true){
            $.ajax({
                url: "http://localhost:4000/transactions/get_transactions",
                type: "GET",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                dataType:"json",
                xhrFields: {withCredentials:true},
                success: (data) => {
                    this.setState({
                        currentData : data,
                        update: false
                    });
                },
                error: () => {
                     console.log("Error: Could not update.");
                     this.setState({
                         update : false
                     })
                }
            });
        }
        return (
            <div class="bigContainer">
                <h1 id='h1title'>Bookkeeping</h1>
                <div class="myContainer">
                    <div className="transaction-table">
                        <table id='dataTable' width="600">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Balance</th>
                                    <th>DF</th>
                                    <th>Category</th>
                                </tr>
                                <tr>
                                    <th colSpan='6'>
                                        <button id='addEntryButton' onClick={ e => this.addRow()}>+</button>
                                        {this.state.showAddEntry ? <div><AddEntry addEntry={this.state.showAddEntry} action={this.closeRow} currencies={this.state.convertCurrencies} accounts={this.state.accounts}/></div> : <span></span>}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.currentData.slice(0).reverse().map(row => {
                                    let index = this.state.currentData.indexOf(row);
                                    let display = 1 + index; 
                                    return (    
                                        <tr key={`row-${row.tt_transaction_id}`}>
                                            <td colSpan='6'>
                                                <table>
                                                    <tbody>
                                                        <tr id='nested'>
                                                            <td><button onClick={(e) =>{this.editRow(e, row.tt_transaction_id)}}>{display}</button></td>
                                                            <td><button onClick={(e) =>{this.editRow(e, row.tt_transaction_id)}}>{(moment(row.tt_date)).format('YYYY-MM-DD')}</button></td>
                                                            <td><button onClick={(e) =>{this.editRow(e, row.tt_transaction_id)}}>{row.tt_description}</button></td>
                                                            <td><button onClick={(e) =>{this.editRow(e, row.tt_transaction_id)}}>{row.tt_balance}</button></td>
                                                            <td><button onClick={(e) =>{this.editRow(e, row.tt_transaction_id)}}>{row.tt_currency}</button></td>
                                                            <td><button onClick={(e) =>{this.editRow(e, row.tt_transaction_id)}}>{row.tt_description}</button></td>
                                                        </tr>
                                                        {row.edit ?
                                                            <tr>
                                                                <td colSpan='6'>
                                                                    <EditEntry editData={this.state.editableData} 
                                                                               id={row.tt_transaction_id} 
                                                                               makeEdit={row.edit} 
                                                                               deleteAction={this.deleteEdit} 
                                                                               accounts={this.state.accounts} 
                                                                               currencies={this.state.convertCurrencies} 
                                                                               closeAction={this.closeEdit} 
                                                                               transactionInfo={row} />
                                                                </td>
                                                            </tr> : <tr></tr>}
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    )
                                })}
                                <tr>
                                    <td colSpan='6'>
                                        <table>
                                            <tbody>
                                                <tr id='nested'>
                                                    <td color='black'><button  onClick={this.setBalance}>0</button></td>
                                                    <td><button></button></td>
                                                    <td color='black'><button onClick={this.setBalance} >Start Balance</button></td>
                                                    <td><button></button></td>
                                                    <td><button></button></td>
                                                    <td><button></button></td>
                                                </tr>
                                                <tr>
                                                    {this.state.startBalance ?
                                                        <td><StartBalance accounts={this.state.accounts} currencies={this.state.convertCurrencies} closeAction={this.closeStart}/></td> : (null) }
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div> 

                    <div class="quick">
                        <div class="summary">
                            <h2>Events</h2>
                            <HorizontalBar id="myChart" data={this.state.chartData} options={options}/>
                        </div>
                        <div class="conversion">
                            <h2>Currency Conversion</h2>
                            <input type="number" defaultValue={this.state.original} onInput={this.convert} />
                            <Select id='start-currency' options={this.state.convertCurrencies} placeholder={this.state.startCurrency.value} onChange={this.handleStartCurrency}/>
                            <h3>=</h3>
                            <p>{this.state.conversion}</p>
                            <Select id='end-currency' options={this.state.convertCurrencies} placeholder={this.state.endCurrency.value} onChange={this.handleEndCurrency}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}