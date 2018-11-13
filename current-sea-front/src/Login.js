import React, { Component } from 'react';
import Header from '../Header.js';
import LoginForm from '../Login/LoginForm.js';
import SignupForm from '../Login/SignupForm.js';

import { Link } from "react-router-dom";



export default class Login extends Component{
    constructor(props){
        super(props);
    }

  render() {
      return(

        <div>
     
            <Header/>
            <LoginForm/>
            
            
        </div>
  
       
    );
  }
};


