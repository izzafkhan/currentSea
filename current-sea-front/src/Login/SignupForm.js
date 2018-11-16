import React, { Component } from 'react';
import './SignupForm.css';
import Header from '../Header.js';
import { Link, Redirect } from "react-router-dom";
import $ from 'jquery';

export default class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            country: "",
            toRegister: true,
            registered: false
        };

    }

    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    redirectAfterRegistration = () => {
        if (this.state.registered) return <Redirect to='/' />;
    }
    onSubmit = e => {
        e.preventDefault();
        const formData = {
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailID: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };

        $.ajax({
            url: "http://localhost:4000/profile/register",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(formData),
            contentType: "application/json; charset=UTF-8",
            dataType: 'json',
            success: (data) => {
                this.setState({registered: true});
            },
            error: (data) => {
                this.setState({password:'', confirmPassword:''});
                return alert(data.responseJSON.message);
            }
        });

    }



    render() {
        return (
            <div>
                {this.redirectAfterRegistration()}
                <Header />

                <h1 align="center">Register</h1>
                <div class="inputContainer">
                    <input
                        id="username"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={e => this.onChange(e)}
                    />
                    <br />
                    <input

                        id="firstName"
                        placeholder="First Name"
                        value={this.state.firstName}
                        onChange={e => this.onChange(e)}
                    />
                    <br />

                    <input

                        id="lastName"
                        placeholder="Last Name"
                        value={this.state.lastName}
                        onChange={e => this.onChange(e)}
                    />
                    <br />

                    <input

                        id="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={e => this.onChange(e)}
                    />
                    <br />

                    <input
                        id="password"
                        placeholder="Password"
                        type="password"
                        value={this.state.password}
                        onChange={e => this.onChange(e)}
                    />
                    <br />

                    <input

                        id="confirmPassword"
                        placeholder="Re-enter Password"
                        type="password"
                        value={this.state.confirmPassword}
                        onChange={e => this.onChange(e)}
                    />
                    <br />

                    <input

                        id="country"
                        placeholder="Country"
                        value={this.state.country}
                        onChange={e => this.onChange(e)}
                    />
                    <br />




                    <br />

                    <button class="btn" onClick={e => this.onSubmit(e)}>  Register </button>

                    <br />
                    <Link to="/Login">
                        <h6 class="loginLink"> Already have an account? Click here</h6>
                    </Link>
                </div>
            </div>


        );
    }
};


