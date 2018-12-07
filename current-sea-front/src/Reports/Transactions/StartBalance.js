import React from 'react';
import $ from 'jquery';
import Select from 'react-select';   

export default class StartBalance extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : [{                
            }],
            update : false,
            accounts: this.props.accounts,
            currencies : this.props.currencies,
        }
        this.addinfo = this.addinfo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.handleCurrency = this.handleCurrency.bind(this);
    }

    addinfo = () => {
        var internalEntries = this.state.data.slice(0);

        let newRow = {
            bt_accountID : '',
            bt_initialBalance: 0,
            bt_currency_abv: '',
        };

        internalEntries.push(newRow);
    
        this.state.data = internalEntries;
        this.forceUpdate();
    }

    handleCurrency(e){
        let newData = Object.assign({}, this.state.data);
        newData.bt_currency_abv = e.value;
        this.setState({data : newData})
    }

    handleChange(row, entry, event) {
        console.log(event);
        if(entry == "dt_accountID"){
            row[entry] = event.label;
        } else {
            row[entry] = event.target.type === 'number' ? parseFloat(event.target.value) : event.target.value;
            console.log('Here');
        }
    }

    save(){;
        $.ajax({
            url: "http://localhost:4000/transactions/edit_transactions",
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

    componentDidMount(){
        $.ajax({
            url: "http://localhost:4000/transactions/get_details",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType:"json",
            xhrFields: { withCredentials:true },
            data: JSON.stringify({'tt_transaction_id': this.props.id}),
            success: (receivedData) => {
                this.setState({
                    data: receivedData
                })
                if(receivedData){
                    this.setState({
                        data: receivedData
                    });
                }
                if(this.props.id){
                    this.setState({
                        action_id: this.props.id,
                    })
                } 
            },
            error: () => {
                console.log("Error: Could not submit");
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
                                    <td><Select options={this.state.accounts} onChange={(e) => this.handleChange(row, 'bt_accountID', e)}/></td>
                                    <td><input type="number"  defaultValue={row.bt_initialBalance} onChange={(e) => this.handleChange(row, 'bt_initialBalance', e)}/></td>
                                    <td><Select options={this.state.currencies} onChange={this.handleCurrency}/></td>
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