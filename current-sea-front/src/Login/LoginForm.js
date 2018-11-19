import React, { Component } from 'react';
import './LoginForm.css';
import { Link, Redirect } from "react-router-dom";
import $ from 'jquery';
import {Form,Text,BasicText,asField} from 'informed';

const ErrorText = asField(({ fieldState, ...props }) => (
    <React.Fragment>
      <BasicText
        fieldState={fieldState}
        {...props}
        
        style={fieldState.error ? { border: 'solid 1px red' } : null}
      />
      {fieldState.error ? (
        <small style={{ color: 'red' }}>{fieldState.error}</small>
      ) : null}
    </React.Fragment>
  ));

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
            crossDomain: true,
            dataType: 'json',
            data: JSON.stringify(loginData),
            success: (data) => {
                this.setState({ loginSuccess: true });
            },
            error: (data) => {
                this.setState({ password: '' });
                //alert('Invalid credentials');
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

    validateEmail= value=>{
        return !value ? 'Enter username or email' : null;
    }
    
    validatePassword = value=>{
        return !value ? 'Enter password' : null;
    }

  render() {
      return(

        <div>
            {this.redirectAfterLogin()}
            
            <h1 align = "center">Login</h1>
            <div class= "inputContainer">
                <Form id= "Login">
                    <ErrorText placeholder="Email/UserName"
                        field="email" 
                        id="emailLabel"
                        validateOnBlur
                        validateOnChange
                        validate={this.validateEmail}
                        onChange = {e=> this.onChange(e)}/>
         
                    <br/>
                    <ErrorText placeholder="Password" 
                        field="password" 
                        id="passwordLabel"
                        validateOnBlur
                        validateOnChange
                        validate= {this.validatePassword}
                        onChange = {e => this.onChange(e)}
                        />
                    <button class="loginBtn" onClick = {e => this.onSubmit(e)}> Log In </button>
                    <h6 class="registerLink"> Not registered? </h6>
                         <Link to="/Register">
                        <button class ="registerBtn" id="toRegister"> Click here. </button>
                        </Link>
                </Form>    
                </div>
        </div>
  
       
    );
  }
};


