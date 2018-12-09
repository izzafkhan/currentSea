import React, {Component} from 'react';
import './Header.css';
import {Link, Redirect} from "react-router-dom";
import {withRouter} from "react-router";
import {log} from './index';
import $ from 'jquery';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false // set to true by default for testing purposes
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
                    log.authenticate();
                }
                if (data.message === 'NOK') {
                    console.log(data.message);
                    this.setState({loggedIn: false});
                    log.signout();
                    this.props.history.push("/");
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
            success: () => {
                this.setState({loggedIn: false});
                log.signout();
            },
            error: () => {
                this.setState({loggedIn: false});
            }
        });
    }

    render() {
        return (

            <nav className="headerRoot">

                <div className="linkContainer">

                    <Link to="/Transactions">
                        <img className="logo" src={require('./Assets/CurrentSeaLogo2.png')}></img>
                    </Link>
                    
                    <Link to="/" className="l">
                        <button onClick={this.logout} class="logoutHeader">
                        <img src={require('./Assets/lockwhite.png')}
                            alt="lockwhite" width="15"
                            height="15"></img>{this.state.loggedIn ? 'Logout' : 'Login'}
                        </button>
                    </Link>

                    <Link to="/Account/Settings" className="l">Settings</Link>
                    <Link to="/Currencies/Currencies" className="l">Currencies</Link>  
                    <Link to="/Reports/Report" className="l">Reports</Link>
                    <Link to="/Transactions" className="l">Bookkeeping</Link>


                
                </div>


            </nav>


        );
    }
};


//ReactDOM.render(<nav></nav>,document.querySelector('navbar'));
export default withRouter(Header);
