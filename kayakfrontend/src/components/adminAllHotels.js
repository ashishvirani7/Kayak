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
import { ListItem } from 'material-ui/List';

import {adminCurrentUpdate} from '../actions/adminCurrentUpdate';

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
        this.props.adminAllHotels([{"hotel_id":"1","hotel_name":"Taj","address":{"street":"201 S 4th","city":"San Jose","zip_code":"95112",
            "state":"CA","country":"US"},"stars":5,"rooms":[{"room_id":"1","room_type":"Standard","room_price":1000}],"avg_rating":4,
          "reviews":{"ratings":"3","feedback":"good","user_id":"1"}}])
    }

    componentWillMount(){
        this.getAllHotels();
    }
    onHotelClick(hotel){
        this.props.adminCurrentUpdate(hotel);
        this.props.history.push("/adminUpdateHotel");
    }
    createHotelsList(){
        return this.props.adminHotels.map((hotel) => {
            return(
                <div>
                    <ListItem onClick={()=>{this.onHotelClick(hotel)}}>
                    <div className="row">
                        <div className="col-md-3">
                            {hotel.hotel_name}
                        </div>
                        <div className="col-md-3">
                            {hotel.address.city}
                        </div>
                        <div className="col-md-3">
                            {hotel.address.state}
                        </div>
                        <div className="col-md-3">
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
                <h1 ><u> All Hotels</u> </h1>
                <ListItem disabled={true} style={{height:"30px","backgroundColor":"#ec7132"}}>
                    <div className="row" style={{"color":"white",fontSize:"20px"}}> 
                        <div className="col-md-3">
                            Hotel Name
                        </div>
                        <div className="col-md-3">
                            City
                        </div>
                        <div className="col-md-3">
                            State
                        </div>
                        <div className="col-md-3">
                        </div>
                    </div>
                </ListItem>
                <Divider/>
                <Divider/>
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
            adminCurrentUpdate,
            
        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(AdminAllHotels));
