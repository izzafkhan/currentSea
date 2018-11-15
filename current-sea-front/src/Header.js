import React, { Component } from 'react';
import './Header.css';
import { Link } from "react-router-dom";


export class Header extends Component{
  constructor(){
    super();
    this.state = {
      loggedIn : true // set to true by default for testing purposes
    };
  }
  render() {
      return(
        <nav>
          <div className = "navWide">
            <div className = "wideDiv">
              <Link to="/">{this.state.loggedIn ? 'My Account': ' '}</Link>
              <Link to="/Reports/Report">{this.state.loggedIn ? 'View Reports' : ' '}</Link>
              <Link to="/Currencies/Currencies">{this.state.loggedIn ? 'My Currencies' : ' '}</Link>
              <Link to="/Help">?</Link>
              <Link to="/Login">
                <button class="loginButton">{this.state.loggedIn ? 'Logout' : 'Login/Signup'}
                </button>
              </Link>
              {/* deprecated
              <a href ="#"> Reports</a>
              <a href ="#"> Favorite Currencies</a>
              <a href ="#"> Help</a>*/}
          </div>
        </div>
      </nav>
    );
  }
};




//ReactDOM.render(<nav></nav>,document.querySelector('navbar'));
export default Header;