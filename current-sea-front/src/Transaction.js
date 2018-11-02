import React from 'react';
import './Transaction.css';

class Transaction extends React.Component{
    render(){
        return(
            <table className="Transaction-table">
                <thead>
                    <tr>
                        <th id="headerCategory">
                            <div className="Transaction-category"> Category </div>
                        </th>
                        <th><hr id="columnLine"/></th>
                        <th id="headerCurrency">    
                            <div className="Transaction-currency"> Spending </div>
                        </th>
                        <th><hr id="rowLine"/></th>
                    </tr>
                </thead>
                <tbody className="Transaction-body">
                {/*
                
                        Below is a demo of what entries will look like
                        when they are added to the table. Remove the 
                        comments to preview.
                -----------------------------------------------------------
                    <tr>
                        <td className="Transaction-entryLeft">Books</td>
                        <td className="Transaction-entryRight">$400</td>
                    </tr>
                    <tr>
                        <td className="Transaction-entryLeft">Books</td>
                        <td className="Transaction-entryRight">$400</td>
                    </tr>
                */}
                </tbody>
            </table>
        );
    }
}

export default Transaction;