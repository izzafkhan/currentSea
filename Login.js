import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import Header from './components/Header.js';
import './Login.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


export class Login extends Component{
  render() {
      return(
        <div>
          <Header/>
            <MuiThemeProvider>
                <div>
                    <h1 className="login">Login</h1>
                    <TextField loginTxt="Enter login email"
                    floatingLabelText= "Email"
                    />
                    <br/>
                    <TextField 
                        type="password"
                        hintText="Enter password"
                        
                        />
                        <br/>
                   <RaisedButton label ="Enter" primary={true} floatingLabelText="Password" style={style} />
                </div>
            </MuiThemeProvider>
        </div>
    );
  }
};

const style={
    margin:15,textAlign:'center'
    
};


export default Login;