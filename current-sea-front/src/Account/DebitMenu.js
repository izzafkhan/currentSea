import React from 'react'

export default class DebitMenu extends React.Component{

constructor(){
    super();
    this.state = {
        buttonText : "Select Account",
        selectedAccount: "",
        menu : false,

        data : [
            {
                acctNum: '2193', 
                acctName : 'Food', 
                type: 'debit'
            }
        ]
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
                <div id="accountHolder">
                    {this.state.data.map(row => {
                        return (
                            <button key={`row-${row.transactionId}`} onClick={() => this.setText(row.acctName)}>
                                {row.acctNum} : {row.acctName}
                            </button>
                        )
                    })}
                </div>
            ) : (null) }
        </div>
    );
}

}