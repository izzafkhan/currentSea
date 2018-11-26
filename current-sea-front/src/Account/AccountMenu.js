import React from 'react'

export default class AccountMenu extends React.Component{

constructor(){
    super();
    this.state = {
        buttonText : "Select Account",
        selectedAccount: "",
        menu : false,
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

setText(account){
    this.setState({
        selectedAccount : account
    });
}

render(){
    return(
        <div>
            <button onClick={this.showMenu}>{this.state.buttonText}</button>
            { this.state.menu ? (
                <div id="currencyHolder">
                    Placeholder
                    {/*
                        Let's use the ajax here to get a database call for
                        the info in the accounts.
                    */}
                </div>
            ) : (null) }
        </div>
    );
}

}