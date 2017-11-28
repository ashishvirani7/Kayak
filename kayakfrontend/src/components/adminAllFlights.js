import React,{Component} from 'react';
import Divider from 'material-ui/Divider'
import CryptoJS from 'crypto-js';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeValueAdmin} from '../actions/adminLoginAction';
import {adminAllFlights} from '../actions/adminAllFlights';

import {withRouter} from 'react-router-dom';
import {adminSetCurrentItem} from '../actions/adminSetCurrent';
import * as API from '../api/API';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import IconArrow from '../icons/IconArrow';
import SelectField from 'material-ui/SelectField';


class AdminAllFlights extends Component{
    
    getAllFlights(){
        // API.adminShowAllFlights()
        // .then((res) => {
        //     if (res.status === 201) {
        //         console.log("Success");
        //         res.json().then(data => {
        //             this.props.adminAllFlights(data.flights)
        //             //NotificationManager.success("Success", data.message, 2500, true);
        //             // this.props.history.push("/logs");
        //         });
        
        //     } else if (res.status === 401) {
        //         // console.log("Fail");
        //         // NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
        //         // this.props.history.push("/");
        //     } 
        // });
        this.props.adminAllFlights([{"name":"AI114"},{"name":"AI7"}])
    }

    componentWillMount(){
        this.getAllFlights();
    }
    createFlightsList(){
        return this.props.adminFlights.map((flight) => {
            return(
                <div>
                    <h2> {flight.name} </h2>
                </div>
            )
        });
    }

    render(){
        return(
            <div>
                <h1 style={{color:"skyblue"}}> All Flights </h1>
                {this.createFlightsList()}
            </div>
        )
    }
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

        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(AdminAllFlights));
