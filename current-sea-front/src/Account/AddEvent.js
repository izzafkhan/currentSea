import React from 'react';
import DatePicker from 'react-datepicker'
import moment from "moment"
import "react-datepicker/dist/react-datepicker.css";
import './AddAccount.css'
import $ from 'jquery'
import Select from 'react-select';
import SketchPicker, { CirclePicker } from 'react-color'

export default class AddEvent extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            newData : {
                eventAbv: 'Event Abbreviation',
                eventName: 'Event Name',
                eventColor: 'Event Color'
                
               
            },
            enteringData : false,

        }
        this.addinfo = this.addinfo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitData = this.submitData.bind(this);
        this.handleAbv = this.handleAbv.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleColor = this.handleColor.bind(this);

    }

    


    addinfo = () => {
        
        this.forceUpdate();
    }

   
    handleName(e){
        let newData = Object.assign({}, this.state.newData);
   
        newData.eventName = e.target.value;
        this.setState({newData});
    }

    handleAbv(e){
        let newData = Object.assign({}, this.state.newData);
        newData.eventAbv = e.target.value;
        this.setState({newData});
    }

    handleColor(color) {
        let newData = Object.assign({}, this.state.newData);
        newData.eventColor = color.hex;
  
        this.setState({newData});
     
        
      };

    

    handleChange(row, entry, event) {
       
        row[entry] = event.target.type === 'number' ? parseFloat(event.target.value) : event.target.value;
        
    }

   
    submitData(){
        console.log(this.state.newData)
        let newData = Object.assign({}, this.state.newData);
      
        this.setState({newData});
  
        this.props.action(false);
        console.log(this.state.newData)
        
        
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
                                <th> <CirclePicker width="200px" onChange={this.handleColor} circleSize = {23}  colors= {["#f44336", "#e91e63", "#9c27b0",
                                 "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39",
                                  "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#a07b8e", "#795548","#a3a3a3", "#607d8b"]}/> </th>
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