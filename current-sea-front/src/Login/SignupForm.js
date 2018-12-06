import React, {Component} from 'react';
import './SignupForm.css';
import { Link, Redirect} from "react-router-dom";
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


    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    fieldIsEmpty = () => {
        if (this.state.username.length == 0 ||
            this.state.firstName.length == 0 ||
            this.state.lastName.length == 0 ||
            this.state.email.length == 0 ||
            this.state.password.length == 0 ||
            this.state.confirmPassword.length == 0) {

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

    redirectAfterRegistration = () => {
        if (this.state.registered == true) {
            return <Redirect to='/'/>
        }
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
                console.log("Success")

            },
            error: (data) => {
                return alert(data.responseJSON.message);
            }
        });

        console.log("In on submit")
    }

    render() {

        console.log("In render")

        return (


            <div className="signUpRoot">
                {this.redirectAfterRegistration()}
                <div>
                    <nav className="navbarSignUp">
                        <Link to="/">
                        <img className="logo" src={require('../Assets/CSLogo.png')}></img>
                        </Link>

                        <Link to="/">
                            <button className="logInButtonToolbar"><img src={require('../Assets/lockblue.png')}
                            alt="lockblue" width="15"
                            height="15"></img>Log In</button>
                        </Link> 
                    </nav>
                </div>

                <div className="signUpBody">

                    <div className="navbarSignUpFormGap">

                    </div>

                    <div className="signUpContainerGird">

                        <div className="sucTop">CurrentSea</div>

                        <div className="sucBottom">
                            <div className="signUpFormFieldsContainer">

                                <div className="supUserNameDiv">
                                    <input name="username" className="supFormField" placeholder="Username"
                                           onChange={this.handleChange}/>
                                </div>

                                <div className="loginFieldGap"></div>

                                <div className="supNamesDiv">
                                    <input name="firstName" className="firstNameField" placeholder="First Name"
                                           onChange={this.handleChange}/>
                                    <input name="lastName" className="lastNameField" placeholder="Last Name"
                                           onChange={this.handleChange}/>
                                </div>

                                <div className="loginFieldGap"></div>

                                <div className="supEmailDiv">
                                    <input name="email" className="supFormField" placeholder="Email"
                                           onChange={this.handleChange}/>
                                </div>

                                <div className="loginFieldGap"></div>

                                <div className="supPasswordDiv">
                                    <input type="password" name="password" className="supFormField" placeholder="Password"
                                           onChange={this.handleChange}/>
                                </div>

                                <div className="loginFieldGap"></div>

                                <div className="supConfirmPasswordDiv">
                                    <input type="password" name="confirmPassword" className="supFormField"
                                           placeholder="Confirm Password" onChange={this.handleChange}/>
                                </div>

                                <div className="signUpButtonDiv">
                                    <button className="loginButton" onClick={e => this.onSubmit(e)}>Sign Up</button>
                                </div>

                                <div>
                                    <div className="supSignInDiv">
                                        <Link className="supsignInLink" to="/">Already have an account? Sign
                                            in.</Link>
                                    </div>
                                </div>


                            </div>
                        </div>

                    </div>

                </div>

            </div>


        );
    }
};


