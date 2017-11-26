import React,{Component} from 'react';
import Divider from 'material-ui/Divider'

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import {changeValueAdmin} from '../actions/adminLoginAction';

import {withRouter} from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';

import AdminFlights from './AdminFlights';
import AdminHotels from './AdminHotels';
import AdminCars from './AdminCars';

import * as API from '../api/API';

class AdminHome extends Component{

    handleLogin = (adminLoginData) => {
        API.doLogin(adminLoginData)
        .then((res) => {
            if (res.status === 201) {
                console.log("Success");
                res.json().then(user => {
                    //this.props.loginSuccess(user);
                    //NotificationManager.success("Welcome", "Login Successful", 2500, true);
                    this.props.history.push("/adminHome");
                });
        
            } else if (res.status === 401) {
                // console.log("Fail");
                // NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
                // this.props.history.push("/");
            } 
        });
      }


    redirectToHotels(){
        this.props.history.push("/adminHotels");
    }
    redirectToFlights(){
        this.props.history.push("/adminFlights");
    }
    redirectToCars(){
        this.props.history.push("/adminCars");
    }
    render(){
        return(
            <div>
                <div className="col-md-2">
                    <List style={ListStyle}>
                        <ListItem primaryText="Hotels" style={{color:"#a2a9b2",marginLeft:"35px"}} onClick={()=>{this.redirectToHotels()}}/>
                        <ListItem primaryText="Flights" style={{color:"#a2a9b2",marginLeft:"35px"}} onClick={()=> {this.redirectToFlights()}}/>
                        <ListItem primaryText="Cars" style={{color:"#a2a9b2",marginLeft:"35px"}} onClick={()=>{this.redirectToCars()}}/>
                    </List>
                </div>
                <div className="col-md-7">
                    <Route exact path='/adminHotels' component={AdminHotels}/>
                    <Route exact path='/adminFlights' component={AdminFlights}/>
                    <Route exact path='/adminCars' component={AdminCars}/>
                </div>
                
            </div>
        )
    }
}
const ListStyle = {
    marginLeft:"25px",
    marginTop:"50px"
  };

function mapStateToProps(state){
    return{
        adminLoginData:state.adminLoginData
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            
        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(AdminHome));
