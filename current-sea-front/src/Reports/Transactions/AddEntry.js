import React from 'react';

export default class AddEntry extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            description: '',
            debit: '',
            credit: '',
            category: '',
            currency: ''
        }
    };

    render(){
        return(
            <div>
                <input type="text" placeholder="Description" value={this.state.description}></input>
                <input type="text" placeholder="Debit" value={this.state.debit}></input>
                <input type="text" placeholder="Credit" value={this.state.credit}></input>
                <input type="text" placeholder="Category" value={this.state.category}></input>
                <input type="text" placeholder="Currency" value={this.state.currency}></input>
                <button>Submit</button>
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