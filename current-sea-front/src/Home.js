import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Home.css';
import Transaction from './Reports/Transaction';

class Home extends Component {
  render() {
    return (
      <div>
        <Link to="/Reports/Report">View Reports</Link>
        <Transaction />
      </div>
    );
  }
}

export default Home;
