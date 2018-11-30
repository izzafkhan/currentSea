import React from 'react';
import './LoginForm.css';
import {Link, Redirect} from "react-router-dom";
import $ from 'jquery';
import {Form,BasicText,asField} from 'informed';

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            toRegister: false,
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
            xhrFields: { withCredentials: true },
            data: JSON.stringify(loginData),
            success: (data) => {
                this.setState({ loginSuccess: true });
            },
            error: (data) => {
                this.setState({ password: '' });
                alert('Invalid credentials');
            }
        }
      
    ); 
 
       
    }

    redirectAfterLogin = () => {
        if (this.state.loginSuccess) return <Redirect to='/Transactions' />;
    }

    regClick = e => {
        e.preventDefault();
        this.setState({
            [e.target.id]: false
        });
    }

    handleEmailChange = event => {
        event.preventDefault()
        this.setState({email: event.target.value});
    }

    handlePasswordChange = event => {
        event.preventDefault()
        this.setState({password: event.target.value});
    }

    onSubmit = e => {
        e.preventDefault();

        if (this.state.email.length == 0 || this.state.password.length == 0) {
            alert("Missing login data")
        }

        const loginData = {
            id: this.state.email,
            password: this.state.password
        }

        console.log(loginData)

        $.ajax({
                url: "http://localhost:4000/profile/login",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                dataType: 'json',
                xhrFields: {withCredentials: true},
                data: JSON.stringify(loginData),
                success: (data) => {
                    this.setState({loginSuccess: true});
                    alert('Successful Login')
                },
                error: (data) => {
                    this.setState({password: ''});
                    alert('Invalid credentials');
                }
            }
        );
    }

    render() {
        return (
            <div class="rootContainer">
            {this.redirectAfterLogin()}
                <div class="container">
                    <div class="titleLabel">
                        <label>CurrentSea</label>
                    </div>
                    <form class="userInfoForm">
                        <fieldset>
                            <input type="text" className="emailField" placeholder="Email" value={this.state.email}
                                   onChange={this.handleEmailChange}/>
                        </fieldset>
                        <fieldset>
                            <input class="passwordField" type="password" placeholder="Password"
                                   value={this.state.password} onChange={this.handlePasswordChange}/>
                        </fieldset>
                    </form>
                    <div class="loginButtonSignInDiv">
                        <button class="loginButtonSignIn" onClick={e => this.onSubmit(e)}>Login</button>
                    </div>
                    <div class="registerDiv">
                        <Link class="regLink" to="/Register">Not registered? Click here.</Link>
                    </div>
                    <div class="forgotDiv">
                        <Link class="forgotLink" to="/">Forgot password?</Link>
                    </div>
                </div>
            </div>
        );
    }
}