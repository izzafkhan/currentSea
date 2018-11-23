import React from 'react';

export default class AddEntry extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            newData : {
            'description': '',
            'debit': '',
            'credit': '',
            'category': '',
            'currency': '' }
        }
        this.addData = this.props.addData;
    }

    handleChange(stateName, e) {
        this.setState({ [stateName]: e.target.value });
    }

    render(){
        return(
            <div>
                <input type="text" placeholder="Description" defaultValue={this.state.newData.description} onChange={this.handleChange.bind(this, 'description')} />
                <input type="text" placeholder="Debit" defaultValue={this.state.newData.debit} onChange={this.handleChange.bind(this, 'debit')} />
                <input type="text" placeholder="Credit" defaultValue={this.state.newData.credit} onChange={this.handleChange.bind(this, 'credit')}/>
                <input type="text" placeholder="Category" defaultValue={this.state.newData.category} onChange={this.handleChange.bind(this, 'category')}/>
                <input type="text" placeholder="Currency" defaultValue={this.state.newData.currency} onChange={this.handleChange.bind(this, 'currency')} />
                <button onClick={() => this.addData(this.state.newData)}>Submit</button>
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