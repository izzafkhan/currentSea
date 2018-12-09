import React, { Component } from 'react';
import LoginForm from '../Login/LoginForm.js';
import Accounts from '../Account/Accounts.js';
import Settings from '../Account/Settings';



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



