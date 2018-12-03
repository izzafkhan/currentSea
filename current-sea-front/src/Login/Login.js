import React, { Component } from 'react';
import Header from '../Header.js';
import LoginForm from '../Login/LoginForm.js';
import SignupForm from '../Login/SignupForm.js';
import Accounts from '../Account/Accounts'
import { Link } from "react-router-dom";

import IncomeStatement from '../Reports/Tables/IncomeStatement'



export default class Login extends Component{
    constructor(props){
        super(props);
    }

  render() {
      return(
        <div>
            {<LoginForm/>} 
        </div>
    );
  }
};


