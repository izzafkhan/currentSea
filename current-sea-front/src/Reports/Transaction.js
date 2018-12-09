import React from 'react';
import './Transaction.css';
import AddEntry from './Transactions/AddEntry';
import EditEntry from './Transactions/EditEntry';
import StartBalance from './Transactions/StartBalance';
import $ from 'jquery'
import moment from "moment"
import Select from 'react-select';   
import {HorizontalBar} from 'react-chartjs-2';
import {Circle} from 'react-shapes';

const options = {
    scales: {
         xAxes: [{
             stacked: true,
             display: false,
             categoryPercentage: 5,
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
            fontColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(0,0,0)'
        }
    },
    responsive: true,
    maintainAspectRatio: true
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
            events: [],
            myEvents: {},

            chartData : { 
                datasets:[{
                  label: 'event1',
                  backgroundColor: 'rgba(196,196,196,0.6)',
                     hoverBackgroundColor: 'rgba(196,196,196,0.8)',
                    data :[1]
                  },
                  {
                    label: 'event2',
                    backgroundColor: 'rgba(204,13,13,0.6)',
                     hoverBackgroundColor: 'rgba(204,13,13,0.8)',  
                    data:  [2]   
                  },
                  {
                     label: 'event3',
                     backgroundColor: 'rgba(177,113,241,0.6)',
                      hoverBackgroundColor: 'rgba(177,113,241,0.8)',    
                     data:  [2]   
                   },
                   {
                     label: 'event4',
                     backgroundColor: 'rgba(247,37,252,0.6)',
                      hoverBackgroundColor: 'rgba(247,37,252,0.8)',     
                     data:  [2]   
                   }
                 ],
                labels:['label']
              }
        }
        this.convert = this.convert.bind(this);
        this.updateConvert = this.updateConvert.bind(this);
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
        
        console.log('updated');
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
            console.log(max1);
            if(this.state.currentData[i].tt_balance >= max1){
                max3 = max2;
                label3 = label2;
                max2 = max1;
                label2 = label1;
                max1 = this.state.currentData[i].tt_balance;
                label1 = this.state.currentData[i].tt_description; 
            } else if(this.state.currentData[i].tt_balance >= max2){
                max3 = max2;
                label3 = label2;
                max2 = this.state.currentData[i].tt_balance;
                label2 = this.state.currentData[i].tt_description;

            } else if(this.state.currentData[i].tt_balance >= max3){
                max3 = this.state.currentData[i].tt_balance;
                label3 = this.state.currentData[i].tt_description;
            }
            total += this.state.currentData[i].tt_balance;
        }

        dataCopy1[0] = (max1/total).toFixed(2)*100;
        labelCopy1 = (label1).length > 14 ? label1.substr(0, 7) + "..." : label1;
        dataCopy2[0] = (max2/total).toFixed(2)*100;
        labelCopy2 = (label2).length > 14 ? label2.substr(0, 7) + "..." : label2;
        dataCopy3[0] = (max3/total).toFixed(2)*100 ;
        labelCopy3 = (label3).length > 14 ? label3.substr(0, 7) + "..." : label3;
        dataCopy4[0] = ((total - (max1 + max2 + max3))/total).toFixed(2)*100;
        labelCopy4 = (other);

        dataSetCopy[0].data = dataCopy1;
        dataSetCopy[1].data = dataCopy2;
        dataSetCopy[2].data = dataCopy3;
        dataSetCopy[3].data = dataCopy4;

        dataSetCopy[0].label = labelCopy1;
        dataSetCopy[1].label = labelCopy2;
        dataSetCopy[2].label = labelCopy3;
        dataSetCopy[3].label = labelCopy4;
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
        this.updateChart();
    }

    closeRow(id){
        this.setState({
            showAddEntry : id,
            update : true,
        });
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
        console.log(this.state.startBalance);
        
        this.updateChart();
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
        this.updateChart();
    }

    handleStartCurrency(event){
        this.setState({
            startCurrency : event
        })
        this.updateConvert(this.state.original, event, this.state.endCurrency);
    }

    handleEndCurrency(event){
        this.setState({
            endCurrency : event
        })
        this.updateConvert(this.state.original, this.state.startCurrency, event);
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
        this.setState({
            original : parseFloat(event.target.value),
        })
        $.ajax({
            url: "http://localhost:4000/currencies/getrate",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType:"json",
            xhrFields: {withCredentials:true},
            data : JSON.stringify({ 'from' : from, 'to' : to}),
            success: (data) => {
                this.setState({
                    rate : parseFloat(data.rate) 
                })
                this.setState({
                    conversion : isNaN(this.state.rate * this.state.original) ? 0 : 
                            (this.state.rate * this.state.original).toFixed(4),
                })
            },
            error: () => {
                 console.log("Error: Could not update.");
            }
        });
    }

    updateConvert(original, start, end){
        $.ajax({
            url: "http://localhost:4000/currencies/getrate",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType:"json",
            xhrFields: {withCredentials:true},
            data : JSON.stringify({ 'from' : start.value, 'to' : end.value}),
            success: (data) => {
                this.setState({
                    rate : parseFloat(data.rate),
                })
                this.setState({
                    conversion : isNaN(this.state.rate * original) ? 0 : (this.state.rate * original).toFixed(4),
                })
            },
            error: () => {
                 console.log("Error: Could not update.");
            }
        });
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
                this.setState({
                    convertCurrencies: currencies,
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

        $.ajax({
            url: "http://localhost:4000/event/get_all_events",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType:"json",
            xhrFields: {withCredentials:true},
            success: (data) => {
                console.log(data);
                const events = []; 
                for (let i = 0; i < data.length; i++) {
                    const newRow = {value: '', label: ''};
                    newRow.value = data[i].et_event_id;
                    newRow.label = data[i].et_event_abv + " " + data[i].et_event_name;
                    events[i] = newRow;
                }
                events.push({'value' : 42, 'label' : 'No Event'});
                this.setState({
                    events: events,
                })
            }
        })

        $.ajax({
            url: "http://localhost:4000/transactions/get_transaction_event",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType:"json",
            xhrFields: { withCredentials:true },
            success: (receivedData) => {
                console.log(receivedData);
                this.setState({
                    myEvents : receivedData,
                })
            }
        })
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
                    this.updateChart();
                },
                error: () => {
                     console.log("Error: Could not update.");
                     this.setState({
                         update : false
                     })
                }
            }); 

            $.ajax({
                url: "http://localhost:4000/transactions/get_transaction_event",
                type: "GET",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                dataType:"json",
                xhrFields: { withCredentials:true },
                success: (receivedData) => {
                    console.log(receivedData);
                    this.setState({
                        myEvents : receivedData,
                    })
                }
            })

            
        }
        return (
            <div class="bigContainer">
                <h1 id='h1title' style={{paddingBottom: "10px"}}>Bookkeeping</h1>
                <div className="settingSubHead" style={{paddingBottom: "30px"}}>Here you can record your transactions</div>

                <div class="myContainer" style={{marginTop: "30px"}}>
                    <div className="transaction-table">
                        <table id='dataTable' width="600">
                            <thead>
                                <tr>
                                    <th style={{width: "60px"}}>No.</th>
                                    <th style={{width: "110px"}}>Date</th>
                                    <th style={{width: "230px"}}>Description</th>
                                    <th style={{width: "80px"}}>Balance</th>
                                    <th style={{width: "80px"}}>Currency</th>
                                    <th style={{width: "80px"}}>Event</th>
                                </tr>
                                <tr>
                                    <th colSpan='6'>
                                        <button id='addEntryButton' onClick={ e => this.addRow()}>+</button>
                                        {this.state.showAddEntry ? <div><AddEntry   nextEntry={this.state.currentData.length + 1} 
                                                                                    addEntry={this.state.showAddEntry} 
                                                                                    action={this.closeRow} 
                                                                                    currencies={this.state.convertCurrencies} 
                                                                                    events={this.state.events} 
                                                                                    accounts={this.state.accounts}/></div> : <span></span>}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.currentData.slice(0).reverse().map(row => {
                                    let index = this.state.currentData.indexOf(row);
                                    let display = 1 + index; 
                                    if(!this.state.myEvents[row.tt_transaction_id]){ 
                                        const data = this.state.myEvents;
                                        data[row.tt_transaction_id] = {et_event_abv: " "};
                                        console.log(data);
                                        this.setState({myEvents: data});
                                    }
                                    return (    
                                        <tr key={`row-${row.tt_transaction_id}`}>
                                            <td colSpan='6'>
                                                <table>
                                                    <tbody>
                                                        <tr id='nested'>
                                                            <td><button style={{width: "50px"}}onClick={(e) =>{this.editRow(e, row.tt_transaction_id)}}>{display}</button></td>
                                                            <td><button style={{width: "120px"}} onClick={(e) =>{this.editRow(e, row.tt_transaction_id)}}>{(moment(row.tt_date)).format('YYYY-MM-DD')}</button></td>
                                                            <td><button style={{width: "240px"}} onClick={(e) =>{this.editRow(e, row.tt_transaction_id)}}>{row.tt_description}</button></td>
                                                            <td><button style={{width: "80px"}}onClick={(e) =>{this.editRow(e, row.tt_transaction_id)}}>{row.tt_balance}</button></td>
                                                            <td><button style={{width: "80px"}}onClick={(e) =>{this.editRow(e, row.tt_transaction_id)}}>{row.tt_currency}</button></td>
                                                            <td><button style={{width: "80px"}}onClick={(e) =>{this.editRow(e, row.tt_transaction_id)}}>
                                                            <Circle r={10} fill={{color:this.state.myEvents[row.tt_transaction_id].et_event_color}} 
                                                            stroke={{color:this.state.myEvents[row.tt_transaction_id].et_event_color}} strokeWidth={3} /></button></td>
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
                                                                               events={this.state.events} 
                                                                               myEvents={this.state.myEvents}
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
                                                        <td colSpan='3'><StartBalance currencies={this.state.convertCurrencies} closeAction={this.closeStart}/></td> : (null) }
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
                            <h2>    Currency Conversion</h2>
                            <div>
                                <input type="number" id='currency-number-in' defaultValue={this.state.original} onChange={this.convert} />
                                <Select id='start-currency' options={this.state.convertCurrencies} placeholder={this.state.startCurrency.value} onChange={this.handleStartCurrency}/>
                            </div>

                            <h3 id='currency-equal'>=</h3>
                            <div class='currency-out'>
                                <p id='currency-number-out'>{this.state.conversion}</p>
                                <Select id='end-currency' options={this.state.convertCurrencies} placeholder={this.state.endCurrency.value} onChange={this.handleEndCurrency}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}