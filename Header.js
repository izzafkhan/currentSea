import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './Header.css';


export class Header extends Component{
  render() {
      return(
        <nav>
        <div className = "navWide">
          <div className = "wideDiv">
          <a href ="#"> Reports</a>
          <a href ="#"> Favorite Currencies</a>
          <a href ="#"> Help</a>
        </div>
      </div>
      </nav>
    );
  }
};




//ReactDOM.render(<nav></nav>,document.querySelector('navbar'));
export default Header;