import React from 'react';
import $ from 'jquery';
import Select from 'react-select';   

export default class StartBalance extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : [],
            update : false,
            accounts: this.props.accounts,
            currencies : this.props.currencies,
        }
        this.addinfo = this.addinfo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.handleCurrency = this.handleCurrency.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(){
        console.log("GET");
        $.ajax({
            url: "http://localhost:4000/startBalance/get_balance",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType:"json",
            xhrFields: { withCredentials:true },
            success: (receivedData) => {
                console.log("Received Data");
                this.state.data = receivedData.results;
                console.log(this.state.data.results);
                this.forceUpdate();
            },
            error: () => {
                 console.log("Error: Could not submit");
            }
        });

        $.ajax({
            url: "http://localhost:4000/accounts/get_balance_accounts",
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

    addinfo = () => {
        var internalEntries = this.state.data.slice(0);

        let newRow = {
            bt_account_id : '',
            bt_initialBalance: 0,
            bt_currency_abv: '',
        };

        internalEntries.push(newRow);
    
        this.state.data = internalEntries;
        this.forceUpdate();
    }

    handleCurrency(row, entry, event){
        let newData = Object.assign({}, this.state.data);
        row[entry] = event.value;
    }

    handleChange(row, entry, event) {
        if(entry == "bt_account_id"){
            row[entry] = event.value;
        } else {
            row[entry] = event.target.type === 'number' ? parseFloat(event.target.value) : event.target.value;
            console.log('Here');
        }
    }

    save(){
        console.log('SAVE');
        $.ajax({
            url: "http://localhost:4000/startBalance/set_balance",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType:"json",
            xhrFields: { withCredentials:true },
            data: JSON.stringify({'data': this.state.data}),
            success: () => {
                 this.props.closeAction();
            },
            error: () => {
                 console.log("Error: Could not submit");
                 this.props.closeAction();
            }
        })
    }

    render(){
        return(
            <div width='300'>
                <table id='startTable'>
                    <thead id='headEntry'>
                        <tr>
                            <th>Account</th>
                            <th>Balance</th>
                            <th>DF</th>
                        </tr>
                    </thead>
                    <tbody id='bodyEntry'>
                        {this.state.data.map( (row, index) => {
                            return (
                                <tr key={`row-${index}`}>
                                    <td><Select options={this.state.accounts} placeholder={row.bt_account_id} onChange={(e) => this.handleChange(row, 'bt_account_id', e)}/></td>
                                    <td><input type="number"  defaultValue={row.bt_initialBalance} onChange={(e) => this.handleChange(row, 'bt_initialBalance', e)}/></td>
                                    <td><Select options={this.state.currencies} placeholder={row.bt_currency_abv} onChange={(e) => this.handleCurrency(row, 'bt_currency_abv', e)}/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <button onClick={this.addinfo}>Add +</button>
                <button onClick={this.save}>Save</button>
            </div>
            
        );
    }
}