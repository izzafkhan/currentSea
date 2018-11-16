import React, { Component } from 'react';
import Header from '../Header.js';
import './LoginForm.css';
import { Link, Redirect } from "react-router-dom";
import { type } from 'os';
import $ from 'jquery';



export default class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state= {
            email: "",
            password: "",
            toRegister : false,
            loginSuccess: false
        };
      
        }

    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    onSubmit = e => {
        e.preventDefault();
        const loginData = {
            id: this.state.email,
            password: this.state.password
        }
        $.ajax({
            url: "http://localhost:4000/profile/login",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(loginData),
            success: (data) => {
                this.setState({ loginSuccess: true });
            },
            error: (data) => {
                this.setState({ password: '' });
                alert(data.responseJSON.message);
            }
        }
        );

       
    }

    redirectAfterLogin = () => {
        if (this.state.loginSuccess) return <Redirect to='/' />;
    }

    regClick = e =>{
        e.preventDefault();
        this.setState({
            [e.target.id]: false});

            
            
    }
    

  render() {
      return(

        <div>
            {this.redirectAfterLogin()}
            
            <h1 align = "center">Login</h1>
            <div class= "inputContainer">
            <input
                
                id = "email"
                placeholder = "Email or Username"
                value = {this.state.email}
                onChange = {e => this.onChange(e)}
                />
                <br/>
             
             <input 
                id = "password"
                placeholder = "Password"
                type= "password"
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


