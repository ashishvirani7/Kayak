import React,{Component} from 'react';
import Divider from 'material-ui/Divider'
import CryptoJS from 'crypto-js';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeValueAdmin} from '../actions/adminLoginAction';
import {adminAllHotels} from '../actions/adminAllHotels';

import {withRouter} from 'react-router-dom';
import {adminSetCurrentItem} from '../actions/adminSetCurrent';
import * as API from '../api/API';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import IconArrow from '../icons/IconArrow';
import SelectField from 'material-ui/SelectField';


class AdminAllHotels extends Component{
    
    getAllHotels(){
        // API.adminShowAllHotels()
        // .then((res) => {
        //     if (res.status === 201) {
        //         console.log("Success");
        //         res.json().then(data => {
        //             this.props.adminAllHotels(data.hotels)
        //             //NotificationManager.success("Success", data.message, 2500, true);
        //             // this.props.history.push("/logs");
        //         });
        
        //     } else if (res.status === 401) {
        //         // console.log("Fail");
        //         // NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
        //         // this.props.history.push("/");
        //     } 
        // });
        this.props.adminAllHotels([{"name":"Taj"},{"name":"av"}])
    }

    componentWillMount(){
        this.getAllHotels();
    }
    createHotelsList(){
        return this.props.adminHotels.map((hotel) => {
            return(
                <div>
                    <h2> {hotel.name} </h2>
                </div>
            )
        });
    }

    render(){
        return(
            <div>
                <h1 style={{color:"skyblue"}}> All Hotels </h1>
                {this.createHotelsList()}
            </div>
        )
    }
}



function mapStateToProps(state){
    return{
        adminLoginData:state.adminLoginData,
        adminHotels:state.adminHotels
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeValueAdmin,
            adminSetCurrentItem,
            adminAllHotels,

        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(AdminAllHotels));
