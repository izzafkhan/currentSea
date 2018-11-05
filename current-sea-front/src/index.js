import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home';
import Report from './Reports/Report';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from "react-router-dom";

class App extends React.Component{
    render() {
        return (
          <BrowserRouter>
            <div>
              <Route path="/" exact component={Home}/>
              <Route path="/Reports/Report" exact component={Report}/>
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
