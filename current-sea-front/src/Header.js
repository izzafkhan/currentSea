import React, {Component} from 'react';
import './Header.css';
import {Link} from "react-router-dom";
import $ from 'jquery';

export class Header extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: true // set to true by default for testing purposes
        };

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        $.ajax({
            url: 'http://localhost:4000/profile/loggedin',
            type: 'GET',
            crossDomain: true,
            xhrFields: {withCredentials: true},
            success: (data) => {
                if (data.message === 'OK') {
                    console.log(data.message);
                    this.setState({loggedIn: true});
                }
                if (data.message === 'NOK') {
                    console.log(data.message);
                    this.setState({loggedIn: false});
                }
            }
        });
    }

    logout = () => {
        $.ajax({
            url: 'http://localhost:4000/profile/logout',
            type: 'GET',
            crossDomain: true,
            xhrFields: {withCredentials: true},
            success: (data) => {
                this.setState({loggedIn: false});
            },
            error: (data) => {
                this.setState({loggedIn: false});
            }
        });
    }

    render() {
        return (

            <nav className="headerRoot">

                <div className="linkContainer">

                    <img className="logo" src={require('./Assets/CSLogo.png')}></img>

                    <Link to="/">
                        <button onClick={this.logout} class="logoutHeader"><img src={require('./Assets/lockwhite.png')}
                                                                                alt="lockwhite" width="15"
                                                                                height="15"></img>{this.state.loggedIn ? 'Logout' : 'Login'}
                        </button>
                    </Link>

                    <Link to="/Help">?</Link>
                    <Link to="/Currencies/Currencies">My Currencies</Link>
                    <Link to="/Reports/Report"> View Reports</Link>
                    <Link to="/Transactions">My Transactions</Link>
                    <Link to="/Account/Accounts">My Account</Link>
                </div>


            </nav>


        );
    }
};


//ReactDOM.render(<nav></nav>,document.querySelector('navbar'));
export default Header;
