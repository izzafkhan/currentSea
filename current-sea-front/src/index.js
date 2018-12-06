import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home';
import Report from './Reports/Report';
import Currencies from './Currencies/Currencies';
import Help from './Help';
import Login from './Login/Login';
import SignUpForm from './Login/SignupForm'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Redirect, Link, withRouter } from "react-router-dom";
import Accounts from './Account/Accounts';
import $ from 'jquery';

export const log = {
  loggedIn : false,
  authenticate(cb){
    this.loggedIn = true
  },
  signout(cb){
    this.loggedIn = false
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    log.loggedIn ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: "/",
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const Auth = withRouter(({history}) => (
  log.loggedIn ? ( <Link to="/Transactions">Bookkeeping</Link> ) : (<Redirect to={{pathname: "/"}} />)
))

export default class App extends React.Component{
  render() {

    return (
      <BrowserRouter>
        <div>
          <Auth/>
          <Route exact path="/Reports/Report"  component={Report}/>
          <Route exact path="/Account/Accounts"  component={Accounts}/>
          <Route exact path="/Currencies/Currencies"  component={Currencies}/>
          <Route exact path="/Help"  component={Help}/>
          <Route exact path="/Transactions"  render={(props) => (
              log.loggedIn === true ? <Home {...props} /> : <Redirect to={{
                  pathname: "/",
                  state: {from: props.location}
              }} />
          )} />
          <Route exact path="/Register"  component = {SignUpForm}/>
          <Route exact path="/Accounts"  component = {Accounts}/>
          <Route exact path="/"  component={Login}/>
  
        </div>
      </BrowserRouter>
    );
  }    
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


{/*
<Route exact path="/Reports/Report"  component={Report}/>
          <Route exact path="/Account/Accounts"  component={Accounts}/>
          <Route exact path="/Currencies/Currencies"  component={Currencies}/>
          <Route exact path="/Help"  component={Help}/>
          <Route exact path="/Transactions"  component={Home}/>
          <Route exact path="/Register"  component = {SignUpForm}/>
          <Route exact path="/Accounts"  component = {Accounts}/>
          <Route exact path="/"  component={Login} render/>
*/}