import React,{Component} from 'react';
import Divider from 'material-ui/Divider'
import CryptoJS from 'crypto-js';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeValueAdmin} from '../actions/adminLoginAction';
import {adminAllHotels} from '../actions/adminAllHotels';
import {adminAllUsers} from '../actions/adminAllUsers';

import {withRouter} from 'react-router-dom';
import {adminSetCurrentItem} from '../actions/adminSetCurrent';
import * as API from '../api/API';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import IconArrow from '../icons/IconArrow';
import SelectField from 'material-ui/SelectField';
import { ListItem } from 'material-ui/List';

import ReactStars from 'react-stars';

import {adminCurrentUpdate} from '../actions/adminCurrentUpdate';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import IconButton from 'material-ui/IconButton';
import {
    
    red300,
    fullWhite
  
  } from 'material-ui/styles/colors';
class AdminAllUsers extends Component{

    constructor(props){
        super(props);
        this.state={
            email:""
        };
        this.emailChange=this.emailChange.bind(this);
    }
    
    getAllUsers(){
        API.adminGetAllUsers()
        .then((res) => {
            if (res.status === 201) {
                console.log("Success");
                res.json().then(data => {
                    console.log(JSON.stringify(data))
                    this.props.adminAllUsers(data.message.data);
                    //NotificationManager.success("Success", data.message, 2500, true);
                    // this.props.history.push("/logs");
                });
        
            } else if (res.status === 401) {
                
                NotificationManager.error("Fail", "Fail", 2500, true);
                // this.props.history.push("/");
            } 
        });
        
    }

    componentWillMount(){
        this.getAllUsers();
    }
    onUserClick(user){
        this.props.adminCurrentUpdate(user);
        this.props.history.push("/adminUpdateUser");
    }

    deleteUser(email){
        
        API.deleteUserAdmin({email})
        .then((res) => {
            if (res.status === 201) {
                console.log("Success");
                NotificationManager.error("User Deleted", "Success", 2500, true);
                this.getAllUsers();
        
            } else if (res.status === 401) {
                console.log("Fail");
                //NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
                // this.props.history.push("/");
            } 
        });
    }

    createUsersList(){
        return this.props.adminAllUsersData.map((user) => {
            return(
                <div>
                    <div className="row">
                        <div className="col-md-11">
                            <ListItem onClick={()=>{this.onUserClick(user)}} style={{height:"60px"}}>
                            <div className="col-md-4">
                                {user.email}
                            </div>
                            <div className="col-md-2">
                                {user.first_name}
                            </div>
                            <div className="col-md-2">
                                {user.last_name}
                            </div>
                            <div className="col-md-2">
                                {user.city}
                            </div>
                            <div className="col-md-1">
                                {user.state}
                            </div>
                            <div className="col-md-1">
                                {user.zip_code}
                            </div>
                                
                                
                            </ListItem>
                            
                        </div>
                        <div className="col-md-1">
                            <IconButton iconStyle={smallIcon} tooltip="Delete"
                                >
                                <Cancel backgroundColor={fullWhite} color={red300}
                                    style={small} 
                                    onClick={()=> this.deleteUser(user.email)}/>
                            </IconButton>
                        </div>
                    </div>
                    
                   
                </div>
            )
        });
    }

    emailChange(event){
        this.setState({email:event.target.value});
    }

    searchUser(){
        console.log(this.state.email);
        API.searchUserAdmin({email:this.state.email})
        .then((res) => {
            if (res.status === 201) {
                res.json().then(data => {
                    console.log(JSON.stringify(data))
                    this.props.adminAllUsers(data.message.data);
                    //NotificationManager.success("Success", data.message, 2500, true);
                    // this.props.history.push("/logs");
                });
                
            } else if (res.status === 401) {
                console.log("Fail");
                //NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
                // this.props.history.push("/");
            } 
        });
        
    }

    render(){
        return(
            <div>
                <h1 ><u> All Users</u> </h1>
                <div className="row" style={{marginLeft:"600px"}}>
                        <div class="input-group">
                        <input type="text" class="form-control"
                            placeholder="Search" id="inputGroup"
                            onChange={this.emailChange}
                            />
                        <span class="input-group-addon" style={{cursor:"pointer"}} onClick={()=>this.searchUser()}>
                            🔎
                        </span>
                        </div>
                </div>
                <br/>
                <ListItem disabled={true} style={{height:"45px","backgroundColor":"#ec7132"}}>
                    <div className="row" style={{"color":"white",fontSize:"20px"}}> 
                        <div className="col-md-11">
                            <div className="col-md-4">
                                Email
                            </div>
                            <div className="col-md-2">
                                First
                            </div>
                            <div className="col-md-2">
                                Last
                            </div>
                            <div className="col-md-2">
                                City
                            </div>
                            <div className="col-md-1">
                                State
                            </div>
                            <div className="col-md-1">
                                Zip
                            </div>
                        </div>
                    </div>
                </ListItem>
                <Divider/>
                <Divider/>
                {this.createUsersList()}
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
        adminHotels:state.adminHotels,
        adminAllUsersData:state.adminAllUsersData
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeValueAdmin,
            adminSetCurrentItem,
            adminAllHotels,
            adminCurrentUpdate,
            adminAllUsers
            
        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(AdminAllUsers));
