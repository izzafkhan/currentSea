import React, { Component } from 'react';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Transaction from './Reports/Transaction';
import Header from './Header';

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        {/*<Link to="/Reports/Report">View Reports</Link>*/}
        <Transaction />
      </div>
    );
  }
}

export default Home;
