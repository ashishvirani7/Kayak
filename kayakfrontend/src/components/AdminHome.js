import React,{Component} from 'react';
import Divider from 'material-ui/Divider'

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import {changeValueAdmin} from '../actions/adminLoginAction';
import {adminSetCurrentItem} from '../actions/adminSetCurrent';
import {adminSetActivePage} from '../actions/adminActivePage';
import {withRouter} from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import AdminFlights from './AdminFlights';
import AdminHotels from './AdminHotels';
import AdminCars from './AdminCars';

import AdminAllHotels from './adminAllHotels';
import AdminAllFlights from './adminAllFlights';
import AdminAllCars from './adminAllCars';
import AdminUpdateHotel from './adminUpdateHotel';
import AdminUpdateFlight from './adminUpdateFlight';
import AdminUpdateCar from './adminUpdateCar';

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
                    this.props.history.push("/adminHotels");
                });
        
            } else if (res.status === 401) {
                // console.log("Fail");
                // NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
                // this.props.history.push("/");
            } 
        });
      }


    redirectToHotels(){
        this.props.adminSetActivePage("add");
        this.props.adminSetCurrentItem("Hotels");
        this.props.history.push("/adminHotels");
    }
    redirectToFlights(){
        this.props.adminSetActivePage("add");
        this.props.adminSetCurrentItem("Flights");
        this.props.history.push("/adminFlights");
    }
    redirectToCars(){
        this.props.adminSetActivePage("add");
        this.props.adminSetCurrentItem("Cars");
        this.props.history.push("/adminCars");
    }
    showAll(){
        
        this.props.adminSetActivePage("all");
        {this.props.adminCurrentItem=="Hotels" && this.props.history.push("/adminshowHotels")};
        {this.props.adminCurrentItem=="Flights" && this.props.history.push("/adminShowFlights")};
        {this.props.adminCurrentItem=="Cars" && this.props.history.push("/adminShowCars")};
        

    }
    addItem(){
        this.props.adminSetActivePage("add");
        {this.props.adminCurrentItem=="Hotels" && this.props.history.push("/adminHotels")}
        {this.props.adminCurrentItem=="Flights" && this.props.history.push("/adminFlights")}
        {this.props.adminCurrentItem=="Cars" && this.props.history.push("/adminCars")}
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
                    <Route exact path="/adminShowHotels" component={AdminAllHotels}/>
                    <Route exact path="/adminShowFlights" component={AdminAllFlights}/>
                    <Route exact path="/adminShowCars" component={AdminAllCars}/>
                    <Route exact path="/adminUpdateHotel" component={AdminUpdateHotel}/>
                    <Route exact path="/adminUpdateFlight" component={AdminUpdateFlight}/>
                    <Route exact path="/adminUpdateCar" component={AdminUpdateCar}/>
                </div>
                <div className="col-md-3">

                
                    {   this.props.adminActivePage=="add" &&

                        <RaisedButton backgroundColor="#03A9F4" style={{"marginTop":"30px"}} onClick={()=>{this.showAll()}}>
                            Show {this.props.adminCurrentItem}
                        </RaisedButton>
                    }
                    {   this.props.adminActivePage=="all" &&

                        <RaisedButton backgroundColor="#03A9F4" style={{"marginTop":"30px"}} onClick={()=>{this.addItem()}}>
                        Add {this.props.adminCurrentItem}
                        </RaisedButton>
                    }
                </div>
                
            </div>
        )
    }
}
const ListStyle = {
    marginLeft:"25px",
    marginTop:"50px"
  };

const buttonStyle = {
    backgroundColor: "#545456",
    color: "#fff",
    borderRadius: "2px",
    boxShadow: "0 2px 2px 0 rgba(0,0,0,0.16)",
    height: "42px",
    width: "100%",
    fontSize: "16px",
    marginTop:"50px"
}

function mapStateToProps(state){
    return{
        adminLoginData:state.adminLoginData,
        adminCurrentItem:state.adminCurrentItem,
        adminActivePage:state.adminActivePage,

    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            adminSetCurrentItem,
            adminSetActivePage,

        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(AdminHome));
