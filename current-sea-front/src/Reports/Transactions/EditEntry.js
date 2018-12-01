import React from 'react';
import './EditEntry.css';
import CurrencyMenu from '../../Currencies/CurrencyMenu';

export default class EditEntry extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : {
                account : '9000 Bank',
                debit : 0,
                credit : 0,
                event : 'Party',
            },
            action_id : 0,
        }
        this.componentWillMount = this.componentWillMount.bind(this);
        this.addinfo = this.addinfo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.remove = this.remove.bind(this);
    }

    componentWillMount(){
        if(this.props.editData){
            this.setState({
                data: this.props.editData
            });
        }
        if(this.props.id){
            this.setState({
                action_id: this.props.id,
            })
        } 
    }

    addinfo = () => {
        var internalEntries = this.state.data.slice(0);

        let newRow = {
            account : '9000 Bank',
            debit : 0,
            credit : 0,
            event : 'Party',

            id : this.state.newData.internalEntries.length,
        };

        internalEntries.push(newRow);
    
        this.state.data = internalEntries;
        this.forceUpdate();
    }

    handleChange(row, entry, event) {
        row[entry] = event.target.type === 'number' ? parseFloat(event.target.value) : event.target.value;
    }

    save(){
        $.ajax({
            url: "http://localhost:4000/transactions/add_transactions",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType:"json",
            xhrFields: { withCredentials:true },
            data: JSON.stringify(this.state.data),
            success: () => {
                 this.props.action(this.state.action_id);
            },
            error: () => {
                 console.log("Error: Could not submit");
                 this.props.action(this.state.action_id);
            }
        })
    }

    remove(){
        $.ajax({
            url: "http://localhost:4000/transactions/add_transactions",
            type: "DELETE",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType:"json",
            xhrFields: { withCredentials:true },
            data: JSON.stringify(this.state.action_id),
            success: () => {
                 this.props.action(this.state.action_id);
            },
            error: () => {
                 console.log("Error: Could not submit");
                 this.props.action(this.state.action_id);
            }
        })
    }

    render(){
        return(
            <div>
                <table>
                    <thead id='headEntry'>
                        <tr>
                            <th>Account</th>
                            <th>Debit</th>
                            <th>Credit</th>
                            <th>Event</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(row => {
                            return (
                                <tr key={`row-${row.id}`}>
                                    <td><input type="text" placeholder="Account" onChange={(e) => this.handleChange(row, 'account', e)}/></td>
                                    <td><input type="number"  placeholder="Debit" onChange={(e) => this.handleChange(row, 'debit', e)}/></td>
                                    <td><input type="number" placeholder="Credit" onChange={(e) => this.handleChange(row, 'credit', e)}/></td>
                                    <td><input type="text"  placeholder="Event" onChange={(e) => this.handleChange(row, 'event', e)}/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <button onClick={this.addRow}>Add +</button>
                <button onClick={this.save}>Save</button>
                <button id='entryButton' onClick={this.remove}>Delete</button>
            </div>
            
        );
    }
}