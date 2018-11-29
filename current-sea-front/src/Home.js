import React, { Component } from 'react';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Transaction from './Reports/Transaction';
import Header from './Header';
import Login from './Login/Login';

class Home extends Component {
  render() {
    return (
      <div>
        {/*<Link to="/Reports/Report">View Reports</Link>*/}
        <Login/>
        <Header/>
        <Transaction/>
      </div>
    );
  }
}

export default Home;
