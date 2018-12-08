import React, {Component} from 'react';
import Events from './Events';
import Header from '../Header';
import Accounts from './Accounts';
class Settings extends Component{
    constructor(){
        super();
       
    }


    render(){
        return(
            <div>
               <Header/>
               <Accounts/>
               <Events/>

            </div>
        );
    }
}

export default Settings;