import React, {Component} from 'react';

class Menu extends Component{
    constructor(){
        super();
        this.state = {
            buttonText : "Balance Sheet",
            menu : false,
        }
        this.showMenu = this.showMenu.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
        this.onBalanceSheet = this.onBalanceSheet.bind(this);
        this.onIncomeStatement = this.onIncomeStatement.bind(this);
    }

    showMenu(event){
        event.preventDefault();
        this.setState({menu: true}, () => {
            document.addEventListener('click', this.hideMenu);
        });


    }

    hideMenu(){
        this.setState({menu: false}, () => {
            document.removeEventListener('click', this.hideMenu);
        });
    }

    onBalanceSheet(){
        this.setState({
            buttonText : "Balance Sheet"
        });
    }

    onIncomeStatement(){
        this.setState({
            buttonText: "Income Statement"
        });
    }

    render(){
        return(
            <div>
                <button onClick={this.showMenu}>
                    {this.state.buttonText}
                </button>
                { this.state.menu ? (
                <div className="menu">
                    <button onClick={() => {
                        this.props.setBalanceSheet(); this.onBalanceSheet()}}> Balance Sheet</button>
                    <button onClick={() => {
                        this.props.setIncomeStatement(); this.onIncomeStatement()}}> Income Statement</button>
                </div>
                ) : (null) }
            </div>
        );
    }
}

export default Menu;