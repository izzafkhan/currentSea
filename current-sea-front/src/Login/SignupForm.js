import React, {Component} from 'react';
import './SignupForm.css';
import {Redirect} from "react-router-dom";
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

        this.handleChange = this.handleChange.bind(this);

    }


    redirectAfterRegistration = () => {
        if (this.state.registered) return <Redirect to='/'/>;
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    fieldIsEmpty = () => {
        if (this.state.firstName.length === 0 ||
            this.state.lastName.length === 0 ||
            this.state.email.length === 0 ||
            this.state.password.length === 0 ||
            this.state.confirmPassword.length === 0) {

            return true
        }
        return false
    }

    passwordIsInvalid = () => {
        if (this.state.password.length < 6) {
            return true
        }
        return false
    }

    passwordsMissMatch = () => {
        if (this.state.password == this.state.confirmPassword) {
            return false
        }
        return true
    }

    onSubmit = e => {
        e.preventDefault();

        if (this.fieldIsEmpty()) {
            alert("Missing registration data")
            return
        }

        if (this.passwordIsInvalid()) {
            alert("Password must be at least 6 characters long")
            return
        }

        if (this.passwordsMissMatch()) {
            alert("The passwords entered do not match")
            return
        }

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
                this.setState({password: '', confirmPassword: ''});
                return alert(data.responseJSON.message);
            }
        });

    }

    render() {
        return (

            <div class="container">

                <div class="titleLabelSignUpContainer">
                    <label class="signUpTitle">CurrentSea</label>
                    <label className="titleSubText">Sign up to begin tracking your<br/>interational journeys </label>
                </div>


                <div >

                    <form class="formContainer">
                        <div className="nameContainer">
                            <input name="firstName" className="firstNameInput" placeholder="First Name"
                                   onChange={this.handleChange}/>
                            <input name="lastName" className = "lastNameInput" placeholder="Last Name" onChange={this.handleChange}/>

                        </div>

                        <input name="email" className="emailSignUp" placeholder="Email" onChange={this.handleChange}/>

                        <input name="password" className="passwordSignUp" placeholder="Password"
                               onChange={this.handleChange}/>

                        <input name="confirmPassword" className="confirmPasswordSignUp" placeholder="Confirm Password"
                               onChange={this.handleChange}/>
                    </form>

                </div>

                <button className="signUpButton" onClick={e => this.onSubmit(e)}>Sign Up</button>


            </div>

        );
    }
};


