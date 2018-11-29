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
        } if (data.message === 'NOK'){
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
              <Link to="/Accounts">{this.state.loggedIn ? 'My Accounts': ' '}</Link>
              <Link to="/Reports/Report">{this.state.loggedIn ? 'View Reports' : ' '}</Link>
              <Link to="/Currencies/Currencies">{this.state.loggedIn ? 'My Currencies' : ' '}</Link>
              <Link to="/Help">?</Link>
              <Link to="/Login">
                <button onClick={this.logout} class="loginButton">{this.state.loggedIn ? 'Logout' : 'Login/Signup'}
                </button>
              </Link>
          </div>
        </div>
      </nav>
    );
  }
};




//ReactDOM.render(<nav></nav>,document.querySelector('navbar'));
export default Header;