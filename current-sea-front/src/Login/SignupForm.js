import React, { Component } from 'react';
import './SignupForm.css';
import Header from '../Header.js';
import { Link } from "react-router-dom";


export default class SignupForm extends Component{
    constructor(props){
        super(props);
        this.state= {
            firstName: "",
            lastName: "",
            email:"",
            password:"",
            confirmPassword:"",
            country:"",
            toRegister : true,
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

    

  render() {
      return(

        <div>
            <Header/>
            
            <h1 align = "center">Register</h1>
            <div class= "inputContainer">
            <input
                
                id = "firstName"
                placeholder = "First Name"
                value = {this.state.firstName}
                onChange = {e => this.onChange(e)}
                />
                <br/>

             <input
                
                id = "lastName"
                placeholder = "Last Name"
                value = {this.state.lastName}
                onChange = {e => this.onChange(e)}
                />
                <br/>

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

             <input
                
                id = "confirmPassword"
                placeholder = "Re-enter Password"
                value = {this.state.confirmPassword}
                onChange = {e => this.onChange(e)}
                />
                <br/>
            
             <input
                
                id = "country"
                placeholder = "Country"
                value = {this.state.country}
                onChange = {e => this.onChange(e)}
                />
                <br/>




                <br/>
                
                <button class="btn">  Register </button>
                
                <br/>
                <Link to="/Login">
                <h6 class="loginLink"> Already have an account? Click here</h6>
                </Link>
                </div>
        </div>
  
       
    );
  }
};


