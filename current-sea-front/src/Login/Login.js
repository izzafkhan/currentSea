import React, { Component } from 'react';
import LoginForm from '../Login/LoginForm.js';

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



