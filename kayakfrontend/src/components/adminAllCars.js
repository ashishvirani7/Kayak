import React,{Component} from 'react';
import Divider from 'material-ui/Divider'
import CryptoJS from 'crypto-js';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeValueAdmin} from '../actions/adminLoginAction';
import {adminAllCars} from '../actions/adminAllCars';
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
class AdminAllCars extends Component{
    
    getAllCars(){
        API.adminGetAllCars()
        .then((res) => {
            if (res.status === 201) {
                console.log("Success");
                res.json().then(data => {
                    this.props.adminAllCars(data.message.data)
                    //NotificationManager.success("Success", data.message, 2500, true);
                    // this.props.history.push("/logs");
                });
        
            } else if (res.status === 401) {
                console.log("Fail");
                NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
                // this.props.history.push("/");
            } 
        });
        // this.props.adminAllCars([{
        //     car_name : "tesla",
        //     car_type : "SUV",
        //     model_name : "Lx",
            
        //     car_rental_price : 1000
        // }])
    }

    componentWillMount(){
        this.getAllCars();
    }

    onCarClick(car){
        this.props.adminCurrentUpdate(car);
        this.props.history.push("/adminUpdateCar");
    }

    createCarsList(){
        return this.props.adminCars.map((car) => {
            return(
                <div>
                    <ListItem onClick={()=>{this.onCarClick(car)}}>
                    <div className="row">
                        <div className="col-md-3">
                            {car.car_name}
                        </div>
                        <div className="col-md-3">
                            {car.car_type}
                        </div>
                        <div className="col-md-3">
                            {car.model_name}
                        </div>
                        <div className="col-md-3">
                            {car.car_rental_price}
                        </div>
                    </div>
                </ListItem>
                <Divider/>
                </div>
            )
        });
    }

    render(){
        return(
            <div>
                <h1 ><u> All Cars</u> </h1>
                <ListItem disabled={true} style={{height:"30px","backgroundColor":"#ec7132"}}>
                    <div className="row" style={{"color":"white",fontSize:"20px"}}> 
                        <div className="col-md-3">
                            Car Name
                        </div>
                        <div className="col-md-3">
                            Car Type
                        </div>
                        <div className="col-md-3">
                            Model Name
                        </div>
                        <div className="col-md-3">
                            Rental Price
                        </div>
                    </div>
                </ListItem>
                <Divider/>
                <Divider/>
                {this.createCarsList()}
            </div>
        )
    }
}



function mapStateToProps(state){
    return{
        adminLoginData:state.adminLoginData,
        adminCars:state.adminCars,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeValueAdmin,
            adminSetCurrentItem,
            adminAllCars,
            adminCurrentUpdate,

        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(AdminAllCars));
