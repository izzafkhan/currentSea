import React, { Component } from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import $ from 'jquery';

export class Header extends Component{
  constructor(){
    super();
    this.state = {
      loggedIn : true // set to true by default for testing purposes
    };
  }
  componentWillMount = () => {
    $.ajax({
      url: 'http://localhost:4000/profile/loggedin',
      type: 'GET',
      crossDomain: true,
      xhrFields: { withCredentials: true },
      success: (data) => {
        if (data.message === 'OK') {
          console.log(data.message);
          this.setState({loggedIn: true});
        } if (data.message  === 'NOK'){
          console.log(data.message);
          this.setState({loggedIn: false});
        }
      }
    });
  }

  logout = () => {
    $.ajax({
      url:'http://localhost:4000/profile/logout',
      type: 'GET',
      crossDomain: true,
      xhrFields: { withCredentials: true },
      success: (data) => {
        this.setState({ loggedIn: false });
      },
      error: (data) => {
        this.setState({ loggedIn: false });
      }
    });
  }

  render() {
      return(
        <nav>
          <div className = "navWide">
            <div className = "wideDiv">
              {this.state.loggedIn ? <Link to="/Account/Accounts">My Account</Link>: <span></span>}
              {this.state.loggedIn ? <Link to="/Transactions">My Transactions</Link>: <span></span>}
              {this.state.loggedIn ? <Link to="/Reports/Report"> View Reports</Link> : <span></span>} 
              {this.state.loggedIn ? <Link to="/Currencies/Currencies">My Currencies</Link> : <span></span>}
              {this.state.loggedIn ? <Link to="/Help">?</Link> : <span></span>}
              <Link to="/">
                <button onClick={this.logout} class="loginButton"><img src={require('./Assets/lockwhite.png')} alt="lockwhite" width="8" height="8"></img>{this.state.loggedIn ? 'Logout' : 'Login'}
                </button>
              </Link>
              {this.state.loggedIn ?  (null) :
              <Link to="/SignupForm">
                <button onClick={this.logout} class="signupButton"> Sign Up
                </button>
              </Link> }
          </div>
        </div>
      </nav>
    );
  }
};




//ReactDOM.render(<nav></nav>,document.querySelector('navbar'));
export default Header;
