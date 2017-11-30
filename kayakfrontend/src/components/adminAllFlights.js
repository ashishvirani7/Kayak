import React,{Component} from 'react';
import Divider from 'material-ui/Divider'
import CryptoJS from 'crypto-js';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeValueAdmin} from '../actions/adminLoginAction';
import {adminAllFlights} from '../actions/adminAllFlights';
import {adminCurrentUpdate} from '../actions/adminCurrentUpdate';

import {withRouter} from 'react-router-dom';
import {adminSetCurrentItem} from '../actions/adminSetCurrent';
import * as API from '../api/API';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import IconArrow from '../icons/IconArrow';
import SelectField from 'material-ui/SelectField';
import { ListItem } from 'material-ui/List';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import Cancel from 'material-ui/svg-icons/navigation/cancel';
import IconButton from 'material-ui/IconButton';
import {
    
    red300,
    fullWhite
  
} from 'material-ui/styles/colors';
class AdminAllFlights extends Component{
    
    getAllFlights(){
        API.adminGetAllFlights()
        .then((res) => {
            if (res.status === 201) {
                console.log("Success");
                res.json().then(data => {
                    this.props.adminAllFlights(data.message.data);
                    //NotificationManager.success("Success", data.message, 2500, true);
                    // this.props.history.push("/logs");
                });
        
            } else if (res.status === 401) {
                console.log("Fail");
                // NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
                // this.props.history.push("/");
            } 
        });
        // this.props.adminAllFlights([{
        //     flight_name : "AI114",
        //     flight_operator_name : "Air India",
        //     departure_date : "Thu Nov 30 2017 11:05:00 GMT-0800 (PST)",
        //     arrival_date : "Dec 02 2017 1:50:00 GMT-0800 (PST)",
        //     origin : "san jose",
        //     destination : "amd",
        //     classes :[
        //         {
        //             class_type : "Business",
        //             class_price : 1000
    
        //         },
        //         {
        //             class_type : "Economy",
        //             class_price : 2000
        //         },
        //         {
        //             class_type : "First Class",
        //             class_price : 3000
        //         }
        //     ]
        // }])
    }

    componentWillMount(){
        this.getAllFlights();
    }

    onFlightClick(flight){
        this.props.adminCurrentUpdate(flight);
        this.props.history.push("/adminUpdateFlight");
    }
    deleteFlight(_id){
        API.deleteFlightAdmin(_id)
        .then((res) => {
            if (res.status === 201) {
                console.log("Success");
                NotificationManager.error("Flight Deleted", "Success", 2500, true);
                this.getAllFlights();
        
            } else if (res.status === 401) {
                console.log("Fail");
                //NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
                // this.props.history.push("/");
            } 
        });
    }
    
    createFlightsList(){
        return this.props.adminFlights.map((flight) => {
            return(
                <div>
                    <div className="row">
                        <div className="col-md-11">
                            <ListItem onClick={()=>{this.onFlightClick(flight)}} style={{height:"60px"}}>
                                <div className="col-md-2">
                                    {flight.flight_name}
                                </div>
                                <div className="col-md-2">
                                    {flight.origin}
                                </div>
                                <div className="col-md-2">
                                    {flight.destination}
                                </div>
                                <div className="col-md-3">
                                    {flight.departure_date}
                                </div>
                                <div className="col-md-3">
                                    {flight.arrival_date}
                                </div>
                                </ListItem>
                        </div>
                    
                        <div className="col-md-1">
                                <IconButton iconStyle={smallIcon} tooltip="Delete"
                                    onClick={()=> this.deleteFlight(flight._id)}>
                            
                                    <Cancel backgroundColor={fullWhite} color={red300}
                                        style={small} 
                                        onClick={()=> this.deleteFlight(flight._id)}/>
                                </IconButton>
                        </div>
                    </div>
                </div>
            )
        });
    }
    

    render(){
        return(
            <div>
                <h1><u> All Flights </u></h1>
                
                    <ListItem disabled={true} style={{height:"45px","backgroundColor":"#ec7132"}}>
                        <div className="row" style={{"color":"white",fontSize:"20px"}}>
                            <div className="col-md-11">
                                <div className="col-md-2">
                                    Name
                                </div>
                                <div className="col-md-2">
                                    Origin
                                </div>
                                <div className="col-md-2">
                                    Destination
                                </div>
                                <div className="col-md-3">
                                    Departure Date
                                </div>
                                <div className="col-md-3">
                                    Arrival Date
                                </div>
                            </div>
                        </div>
                    </ListItem>
                    
                {this.createFlightsList()}
            </div>
        )
    }
}

const smallIcon= {
    width: 20,
    height: 20,
  }
const small={
    width: 20,
    height: 20,
}


function mapStateToProps(state){
    return{
        adminLoginData:state.adminLoginData,
        adminFlights:state.adminFlights
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeValueAdmin,
            adminSetCurrentItem,
            adminAllFlights,
            adminCurrentUpdate,

        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(AdminAllFlights));
