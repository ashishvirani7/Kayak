import React,{Component} from 'react';
import Divider from 'material-ui/Divider'
import CryptoJS from 'crypto-js';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeValueAdmin} from '../actions/adminLoginAction';

import {withRouter} from 'react-router-dom';
import TextField from 'material-ui/TextField';
import * as API from '../api/API';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

class AdminFlights extends Component{

    constructor(props) {
        super(props);
        this.state = {
            flightName:"",
            flightOperatorName:"",
            departureDate: "",
            arrivalDate:"",
            origin:"",
            destination:"",
            businessClassPrice:"",
            economyClassPrice:""

        };
      }
      
      handleNameChange = (event, index, value) => {
        this.setState({...this.state,flightName:event.target.value});
      };
      handleOperatorChange = (event, index, value) => {
        this.setState({...this.state,flightOperatorName:event.target.value});
      };
      handleDepartureDateChange = (event, date) => {
          console.log();
        this.setState({...this.state,departureDate:date});
      };
      handleDepartureTimeChange = (event, time) => {
        var DDate=this.state.departureDate;
        var hours = time.getHours();
        var minutes = time.getMinutes();

        DDate.setHours(hours);
        DDate.setMinutes(minutes);
        console.log(DDate);
        this.setState({...this.state,departureDate:DDate});
      };
      handleArrivalDateChange = (event, date) => {
        this.setState({...this.state,arrivalDate:date});
      };
      handleArrivalTimeChange = (event, time) => {
        var DDate=this.state.arrivalDate;
        var hours = time.getHours();
        var minutes = time.getMinutes();

        DDate.setHours(hours);
        DDate.setMinutes(minutes);
        console.log(DDate);
        this.setState({...this.state,arrivalDate:DDate});
      };
      handleOriginChange = (event, index, value) => {
        this.setState({...this.state,origin:event.target.value});
      };
      handleDestinationChange = (event, index, value) => {
        this.setState({...this.state,destination:event.target.value});
      };
      handleBusinessClassPriceChange = (event, index, value) => {
        this.setState({...this.state,businessClassPrice:event.target.value});
      };
      handleEconomyClassPriceChange = (event, index, value) => {
        this.setState({...this.state,economyClassPrice:event.target.value});
      };

      submitFlight() {
          console.log(this.state);
      }
    render(){
        return(
            <div>
                <h1 style={{color:"skyblue"}}>Flights Live Here </h1>

                <div className="row" style={divstyle}>
                    <TextField style={istyle}
                        id="flight_name"
                        hintText="Flight Name"
                        onChange={this.handleNameChange}
                    />
                </div>
                <div className="row" style={divstyle}>
                    <TextField style={istyle}
                        id="operator_name"
                        hintText="Flight Operator Name"
                        onChange={this.handleOperatorChange}
                    />
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <DatePicker style={istyle} hintText="Departure Date" container="inline" autoOk={true}
                            onChange={this.handleDepartureDateChange} />
                    </div>
                    <div className="col-md-4">
                        <TimePicker
                            hintText="Departure Time"
                            autoOk={true}
                            onChange={this.handleDepartureTimeChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <DatePicker style={istyle} hintText="Arrival Date" container="inline" autoOk={true}
                            onChange={this.handleArrivalDateChange}/>
                    </div>
                    <div className="col-md-4">
                        <TimePicker
                            hintText="Arrival Time"
                            autoOk={true}
                            onChange={this.handleArrivalTimeChange}
                        />
                    </div>
                </div>
                    
                <div className="row" style={divstyle}>
                    <TextField style={istyle}
                        id="origin"
                        hintText="Origin"
                        onChange={this.handleOriginChange}
                    />
                </div>
                <div className="row" style={divstyle}>
                    <TextField style={istyle}
                        id="destination"
                        hintText="Destination"
                        onChange={this.handleDestinationChange}
                    />
                </div>
                <div className="row" style={divstyle}>
                    <TextField style={istyle}
                        id="business_price"
                        hintText="Business Class Price"
                        onChange={this.handleBusinessClassPriceChange}
                    />
                </div>
                <div className="row" style={divstyle}>
                    <TextField style={istyle}
                        id="economy_class"
                        hintText="Economy Class Price"
                        onChange={this.handleEconomyClassPriceChange}
                    />
                </div>
                <div className="row" style={divstyle}>
                    <button style={btnstyle}
                        id="destbtn"
                        onClick={()=>{this.submitFlight()}}
                    >
                    Submit
                    </button>
                </div>
            </div>
        )
    }
}
const rstyle={
    marginTop:'50px',
    marginRight:'15px',
    marginLeft:'15px'
}

const istyle={
    fontSize:'16px',
    height:'50px',
    width:'100%',
    backgroundColor:'white',
    marginRight:'5px',
    barderSize:'1px',
    borderColor:'black',
    
}

const roomStyle={
    fontSize:'16px',
    height:'50px',
    width:'100%',
    backgroundColor:'white',
    marginRight:'5px',
    barderSize:'1px',
    borderColor:'black',
    marginTop:"20px"
}

const btnstyle={
    border:'none',
    color:"white",
    fontSize:'16px',
    height:'50px',
    width:'100%',
    backgroundColor:'green',
    marginLeft:'5px',
    marginRight:'5px'
}
const divstyle={
    marginLeft:'1px',
    marginRight:'-2px',
    width:"300px"
}

function mapStateToProps(state){
    return{
        adminLoginData:state.adminLoginData
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeValueAdmin
        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(AdminFlights));
