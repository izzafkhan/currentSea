import React from 'react';
import DatePicker from 'react-datepicker'
import moment from "moment"
import "react-datepicker/dist/react-datepicker.css";
import './AddAccount.css'
import $ from 'jquery'
import Select from 'react-select';
import SketchPicker from 'react-color'

export default class AddEvent extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            newData : {
                eventAbv: 'Event Abbreviation',
                eventName: 'Event Name'
                
               
            },
            enteringData : false,

        }
        this.addinfo = this.addinfo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitData = this.submitData.bind(this);
        this.handleAbv = this.handleAbv.bind(this);
        this.handleName = this.handleName.bind(this);
    }

    


    addinfo = () => {
        
        this.forceUpdate();
    }

   
    handleName(e){
        let newData = Object.assign({}, this.state.newData);
       // console.log(accountType.value);
        newData.eventName = e.target.value;
        this.setState({newData});
    }

    handleAbv(e){
        let newData = Object.assign({}, this.state.newData);
        newData.eventAbv = e.target.value;
        this.setState({newData});
    }

    handleChange(row, entry, event) {
       
        row[entry] = event.target.type === 'number' ? parseFloat(event.target.value) : event.target.value;
        
    }

   
    submitData(){
        let newData = Object.assign({}, this.state.newData);
        this.setState({newData});
        this.props.action(false);
        
        
        /*
            Ajax magic 
            
        */
      $.ajax({
           url: "http://localhost:4000/event/create_event",
           type: "POST",
           contentType: "application/json; charset=utf-8",
           crossDomain: true,
           dataType:"json",
           xhrFields: { withCredentials:true },
           data: JSON.stringify(this.state.newData),
           success: () => {
                this.props.action(false);
                console.log("EVENT ADDED");
           },
           error: (data) => {
                alert(data.responseJSON.message);
                this.props.action(false);
           }
       })
       
    
    }
    

    render(){
        return(
            <div>
                {this.props.addEntry ? 
                <div>
                    <table width='600' id='addTableE'>
                        <thead>
                            <tr>
                                
                                <th><input type="text" placeholder="Event Abbreviation" onChange={this.handleAbv }/></th>
                                <th><input type="text" placeholder="Name" onChange={this.handleName} /></th>
                               {/*} <th><SketchPicker/> /></th>*/}
                                
                               
                            </tr>
                           
                        </thead>
                    
                        <tbody>
                           
                        </tbody>     
                    </table>
                    <button onClick={()=>{
                            this.props.add(this.state.newData);
                             this.submitData();}}>Done</button>
                </div>
                : (null) }
            </div>
        );
    }
}