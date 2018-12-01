import React from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'

class CurrencyMenu extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            buttonText : props.editCurrency,
            menu : false,
            currencySet : {},
        }
        this.showMenu = this.showMenu.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
        this.setText = this.setText.bind(this);
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

    setText(currency){
        this.setState({
            buttonText : currency
        });
    }

    componentDidMount(){
        $.ajax({
            url: "http://localhost:4000/transactions/currencies",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType:"json",
            xhrFields: {withCredentials:true},
            success: (data) => {
                this.setState({
                    currencySet : data,
                });
                console.log(this.state.currencySet);
            },
            error: () => {
                 console.log("Error: Could not update.");
            }
        });
    }
    
    render(){
        return(
            <div>
                <button onClick={this.showMenu}>{this.state.buttonText}</button>
                { this.state.menu ? (
                    <div id="currencyHolder">
                        <button onClick={ () => this.setText('USD')}>USD</button>
                        <button onClick={ () => this.setText('EUR')}>EUR</button>
                        <button onClick={ () => this.setText('GBP')}>GBP</button>
                        <button onClick={ () => this.setText('JPY')}>JPY</button>
                    </div>
                ) : (null) }
            </div>
        );
    }
    
}

CurrencyMenu.propTypes = {
    buttonText : PropTypes.string
};

CurrencyMenu.defaultProps = {
    buttonText : "Currency"
};

{/* Right now for demo purposes I'm only going to have a few currencies to pick from. 
    The idea is that later on more currencies can be added when we have a better grasp on
    the next tasks.

    What I think we'll do is have a button for all the currencies and only show the ones that the
    user has selected. We can get the data for that from Currencies.js
*/}

export default CurrencyMenu