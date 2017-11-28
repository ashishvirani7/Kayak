import React,{Component} from 'react';
import Divider from 'material-ui/Divider'
import CryptoJS from 'crypto-js';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeValueAdmin} from '../actions/adminLoginAction';
import {adminAllCars} from '../actions/adminAllCars';

import {withRouter} from 'react-router-dom';
import {adminSetCurrentItem} from '../actions/adminSetCurrent';
import * as API from '../api/API';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import IconArrow from '../icons/IconArrow';
import SelectField from 'material-ui/SelectField';

class AdminAllCars extends Component{
    
    getAllCars(){
        // API.adminShowAllCars()
        // .then((res) => {
        //     if (res.status === 201) {
        //         console.log("Success");
        //         res.json().then(data => {
        //             this.props.adminAllCars(data.cars)
        //             //NotificationManager.success("Success", data.message, 2500, true);
        //             // this.props.history.push("/logs");
        //         });
        
        //     } else if (res.status === 401) {
        //         // console.log("Fail");
        //         // NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
        //         // this.props.history.push("/");
        //     } 
        // });
        this.props.adminAllCars([{"name":"tesla"}])
    }

    componentWillMount(){
        this.getAllCars();
    }
    createCarsList(){
        return this.props.adminCars.map((car) => {
            return(
                <div>
                    <h2> {car.name} </h2>
                </div>
            )
        });
    }

    render(){
        return(
            <div>
                <h1 style={{color:"skyblue"}}> All Cars </h1>
                {this.createCarsList()}
                
            </div>
        )
    }
}



function mapStateToProps(state){
    return{
        adminLoginData:state.adminLoginData,
        adminCars:state.adminCars
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeValueAdmin,
            adminSetCurrentItem,
            adminAllCars,

        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(AdminAllCars));
