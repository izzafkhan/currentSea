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
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Accounts from './Account/Accounts';
import $ from 'jquery';

export const log = {
  loggedIn : false,
  authenticate(){
    this.loggedIn = true;
    localStorage.setItem('loggedIn', this.loggedIn);
  },
  signout(){
    this.loggedIn = false;
    localStorage.setItem('loggedIn', this.loggedIn);
  }
}

{/*}
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
  log.loggedIn ? ( <Link to="/Transactions"></Link> ) : (<Redirect to={{pathname: "/"}} />)
)) */}

export default class App extends React.Component{
  render() {
    console.log(localStorage.getItem('loggedIn'));
    return (
      <BrowserRouter>
        <Switch>
          <Route  path="/Reports/Report"  render={() => ( localStorage.getItem('loggedIn') ? <Report/> : <Redirect to="/"/>)}/>
          <Route  path="/Account/Accounts"  render={() => ( localStorage.getItem('loggedIn') ? <Accounts/> : <Redirect to="/"/>)}/>
          <Route  path="/Currencies/Currencies"  render={() => ( localStorage.getItem('loggedIn') ? <Currencies/> : <Redirect to="/"/>)}/>
          <Route  path="/Help"  render={() => ( localStorage.getItem('loggedIn') ? <Help/> : <Redirect to="/"/>)}/>
          <Route  path="/Transactions"  render={() => ( localStorage.getItem('loggedIn') ? <Home/> : <Redirect to="/"/> )}/>
          <Route  path="/Register"  component = {SignUpForm}/>
          <Route  path="/"  component={Login}/>
        </Switch>
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