import React from 'react';
import './LoginForm.css';
import Header from '../Header'
import {Link, Redirect} from "react-router-dom";
import $ from 'jquery';
import Transaction from "../Reports/Transaction";
import {log} from '../index';

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            toRegister: false,
            loginSuccess: false,

            loginForDemo: false,
            redirectRef : false,
        };

    }

    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
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

    mouseOver = event => {
        event.mouseOver()
        this.setState()
    }

    onSubmit = e => {
        e.preventDefault();

            if (this.state.email.length == 0 || this.state.password.length == 0) {
                alert("Missing login data")
                return
            }

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
            /*
        log.authenticate( () => {
            this.setState({redirectRef: true})
        }) */


    }

    // onSubmit = e => {
    //     e.preventDefault();
    //
    //     if (this.state.email.length == 0 || this.state.password.length == 0) {
    //         alert("Missing login data")
    //     }
    //
    //     const loginData = {
    //         id: this.state.email,
    //         password: this.state.password
    //     }
    //
    //     $.ajax({
    //             url: "http://localhost:4000/profile/login",
    //             type: "POST",
    //             contentType: "application/json; charset=utf-8",
    //             crossDomain: true,
    //             dataType: 'json',
    //             xhrFields: {withCredentials: true},
    //             data: JSON.stringify(loginData),
    //             success: (recivedData) => {
    //                 this.setState({loginSuccess: true});
    //                 console.log('Successful Login')
    //             },
    //             error: (data) => {
    //                 alert('Invalid credentials');
    //             }
    //         }
    //     );
    // }

    onSubmitDemo = () => {
        this.setState({loginForDemo: true})
    }

    redirectDemo = () => {

        if (this.state.loginForDemo == true) {
            console.log("redirect demo")
            return <Transaction/>
        }
    }

    render() {
        if(this.state.redirectRef){
            return(
                <Redirect to={this.props.location.state || {from: {pathname: "/"}}} />
            );       
        }

        return (

            <div className="loginRoot">

                {this.redirectAfterLogin()}

                <div className="navbarLoginDiv">
                    <nav className="navbarLogin">
                        <Link to="/">
                            <img className="logo" src={require('../Assets/CSLogo.png')}></img>
                        </Link>
                        
                        <Link to="/Register">
                            <button className="signUpButtonToolbar"><img src={require('../Assets/lockblue.png')}
                            alt="lockblue" width="15"
                            height="15"></img>Sign Up</button>
                        </Link>
                    </nav>
                </div>
                

                <div className="loginBody">


                    <div className="navbarLoginFormGap"></div>

                    <div className="loginContainerGrid">
          
                        <div className="lcgTop">CurrentSea</div>

                        <div className="lcgMiddle">


                            <div className="loginFieldsContainer">
                                <div>
                                    <input type="text" className="loginFormField" placeholder="Username or Email"
                                           onChange={this.handleEmailChange}/>
                                </div>

                                <div className="loginFieldGap">

                                </div>

                                <div>
                                    <input type="password" className="loginFormField" placeholder="Password"
                                           onChange={this.handlePasswordChange}/>
                                </div>
                            </div>




                        </div>

                        <div className="lcgBottom">
                            <div className="loginButtonContainer">

                                <button className="loginButton" onClick={e => this.onSubmit(e)}>Log In</button>
                            </div>

                            <div className="registerDiv">
                                <Link class="regLink" to="/Register">Don't have an account? Sign Up</Link>
                            </div>
                        </div>



                    </div>

                </div>
            </div>


        );
    }
}