import React from 'react';
import AccountMenu from '../../Account/AccountMenu'

export default class AddEntry extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            newData : {
            'description': '',
            'debitAmt': '',
            'creditAmt': '',
            'eventId': '',
            'currencyId': '' }
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitData = this.submitData.bind(this);
    }

    handleChange = (stateName, e) => {
        var property = {...this.state.newData}
        property[stateName] = e.target.value;
        this.setState({ newData : property})
    }

    submitData = () => {
        var submission = this.state.newData;
        this.props.onAddData(submission);
    }

    render(){
        return(
            <div>
                <AccountMenu />
                <input type="text" placeholder="Description" defaultValue={this.state.newData.description} onChange={this.handleChange.bind(this, 'description')} />
                <input type="text" placeholder="Debit" defaultValue={this.state.newData.debitAmt} onChange={this.handleChange.bind(this, 'debitAmt')} />
                <input type="text" placeholder="Credit" defaultValue={this.state.newData.creditAmt} onChange={this.handleChange.bind(this, 'creditAmt')}/>
                <input type="text" placeholder="Category" defaultValue={this.state.newData.eventId} onChange={this.handleChange.bind(this, 'eventId')}/>
                <input type="text" placeholder="Currency" defaultValue={this.state.newData.currencyId} onChange={this.handleChange.bind(this, 'currencyId')} />
                <button onClick={this.submitData}>Submit</button>
            </div>
        );
    }
}

{/*
            <div>
                <input type="text" value="Description">Description</input>
                <input type="number" value="Debit">Debit</input>
                <input type="number" value="Credit">Credit</input>
                <input type="submit" value="Done">Done</input>
            </div>*/}