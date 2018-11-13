import React, { Component } from 'react';
import Header from '../Header.js';
import './LoginForm.css';
import { Link } from "react-router-dom";



export default class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state= {
            email: "",
            password: "",
            toRegister : false,
        };
      
        }

    onChange = e =>{
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    onSubmit = e =>{
        e.preventDefault();
       
    }

    regClick = e =>{
        e.preventDefault();
        this.setState({
            [e.target.id]: false});

            
            
    }
    

  render() {
      return(

        <div>
            
            
            <h1 align = "center">Login</h1>
            <div class= "inputContainer">
            <input
                
                id = "email"
                placeholder = "Email"
                value = {this.state.email}
                onChange = {e => this.onChange(e)}
                />
                <br/>
             
             <input 
                id = "password"
                placeholder = "Password"
                value = {this.state.password}
                onChange = {e => this.onChange(e)}
                />
                <br/>
                <br/>
                <button class="loginBtn" onClick = {e => this.onSubmit(e)}> Log In </button>
                <br/>
                <h6 class="registerLink"> Not registered? </h6>
                <Link to="/Register">
                    <button class ="registerBtn" id="toRegister"> Click here. </button>
                </Link>
                </div>
        </div>
  
       
    );
  }
};


