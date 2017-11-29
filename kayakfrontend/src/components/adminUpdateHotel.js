import React,{Component} from 'react';
import Divider from 'material-ui/Divider'
import CryptoJS from 'crypto-js';

import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import IconArrow from '../icons/IconArrow';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeValueAdmin} from '../actions/adminLoginAction';
import {adminSetCurrentItem} from '../actions/adminSetCurrent';

import {withRouter} from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import * as API from '../api/API';

const US_States = [
    {
        "name": "Alabama",
        "abbreviation": "AL"
    },
    {
        "name": "Alaska",
        "abbreviation": "AK"
    },
    {
        "name": "American Samoa",
        "abbreviation": "AS"
    },
    {
        "name": "Arizona",
        "abbreviation": "AZ"
    },
    {
        "name": "Arkansas",
        "abbreviation": "AR"
    },
    {
        "name": "California",
        "abbreviation": "CA"
    },
    {
        "name": "Colorado",
        "abbreviation": "CO"
    },
    {
        "name": "Connecticut",
        "abbreviation": "CT"
    },
    {
        "name": "Delaware",
        "abbreviation": "DE"
    },
    {
        "name": "District Of Columbia",
        "abbreviation": "DC"
    },
    {
        "name": "Federated States Of Micronesia",
        "abbreviation": "FM"
    },
    {
        "name": "Florida",
        "abbreviation": "FL"
    },
    {
        "name": "Georgia",
        "abbreviation": "GA"
    },
    {
        "name": "Guam",
        "abbreviation": "GU"
    },
    {
        "name": "Hawaii",
        "abbreviation": "HI"
    },
    {
        "name": "Idaho",
        "abbreviation": "ID"
    },
    {
        "name": "Illinois",
        "abbreviation": "IL"
    },
    {
        "name": "Indiana",
        "abbreviation": "IN"
    },
    {
        "name": "Iowa",
        "abbreviation": "IA"
    },
    {
        "name": "Kansas",
        "abbreviation": "KS"
    },
    {
        "name": "Kentucky",
        "abbreviation": "KY"
    },
    {
        "name": "Louisiana",
        "abbreviation": "LA"
    },
    {
        "name": "Maine",
        "abbreviation": "ME"
    },
    {
        "name": "Marshall Islands",
        "abbreviation": "MH"
    },
    {
        "name": "Maryland",
        "abbreviation": "MD"
    },
    {
        "name": "Massachusetts",
        "abbreviation": "MA"
    },
    {
        "name": "Michigan",
        "abbreviation": "MI"
    },
    {
        "name": "Minnesota",
        "abbreviation": "MN"
    },
    {
        "name": "Mississippi",
        "abbreviation": "MS"
    },
    {
        "name": "Missouri",
        "abbreviation": "MO"
    },
    {
        "name": "Montana",
        "abbreviation": "MT"
    },
    {
        "name": "Nebraska",
        "abbreviation": "NE"
    },
    {
        "name": "Nevada",
        "abbreviation": "NV"
    },
    {
        "name": "New Hampshire",
        "abbreviation": "NH"
    },
    {
        "name": "New Jersey",
        "abbreviation": "NJ"
    },
    {
        "name": "New Mexico",
        "abbreviation": "NM"
    },
    {
        "name": "New York",
        "abbreviation": "NY"
    },
    {
        "name": "North Carolina",
        "abbreviation": "NC"
    },
    {
        "name": "North Dakota",
        "abbreviation": "ND"
    },
    {
        "name": "Northern Mariana Islands",
        "abbreviation": "MP"
    },
    {
        "name": "Ohio",
        "abbreviation": "OH"
    },
    {
        "name": "Oklahoma",
        "abbreviation": "OK"
    },
    {
        "name": "Oregon",
        "abbreviation": "OR"
    },
    {
        "name": "Palau",
        "abbreviation": "PW"
    },
    {
        "name": "Pennsylvania",
        "abbreviation": "PA"
    },
    {
        "name": "Puerto Rico",
        "abbreviation": "PR"
    },
    {
        "name": "Rhode Island",
        "abbreviation": "RI"
    },
    {
        "name": "South Carolina",
        "abbreviation": "SC"
    },
    {
        "name": "South Dakota",
        "abbreviation": "SD"
    },
    {
        "name": "Tennessee",
        "abbreviation": "TN"
    },
    {
        "name": "Texas",
        "abbreviation": "TX"
    },
    {
        "name": "Utah",
        "abbreviation": "UT"
    },
    {
        "name": "Vermont",
        "abbreviation": "VT"
    },
    {
        "name": "Virgin Islands",
        "abbreviation": "VI"
    },
    {
        "name": "Virginia",
        "abbreviation": "VA"
    },
    {
        "name": "Washington",
        "abbreviation": "WA"
    },
    {
        "name": "West Virginia",
        "abbreviation": "WV"
    },
    {
        "name": "Wisconsin",
        "abbreviation": "WI"
    },
    {
        "name": "Wyoming",
        "abbreviation": "WY"
    }
];

const Room_Types=[
    {
        "name":"Standard"
    },
    {
        "name":"Suite"
    },
    {
        "name":"Delux"
    }
];

const stateItems = [];
const roomTypes = [];

US_States.map(state =>{
    stateItems.push(<MenuItem value={state.abbreviation} key={state.abbreviation} primaryText={state.abbreviation} />);
});

Room_Types.map(type=>{
    roomTypes.push(<MenuItem value={type.name} key={type.name} primaryText={type.name} />);
})
//const zipregex = "^\d{5}(?:[-\s]\d{4})?$";
const zipregex = /(^\d{5}$)|(^\d{5}-\d{4}$)/ ;
class AdminUpdateHotel extends Component{

    constructor(props) {
        super(props);
        this.state = {
            
            hotel_name:this.props.adminUpdateCurrentData.hotel_name,
            street:this.props.adminUpdateCurrentData.address.street,
            city:this.props.adminUpdateCurrentData.address.city,
            state: this.props.adminUpdateCurrentData.address.state,
            zip_code:this.props.adminUpdateCurrentData.address.zip_code,
            room_type_value1:this.props.adminUpdateCurrentData.rooms[0].room_type,
            room_type_value2:this.props.adminUpdateCurrentData.rooms[0].room_type,
            room_type_value3:this.props.adminUpdateCurrentData.rooms[0].room_type,
            room_price_value1:this.props.adminUpdateCurrentData.rooms[0].room_price,
            room_price_value2:this.props.adminUpdateCurrentData.rooms[0].room_price,
            room_price_value3:this.props.adminUpdateCurrentData.rooms[0].room_price,

        }
      }

      handleNameChange = (event, index, value) => {
        this.setState({...this.state,hotel_name:event.target.value});
      };
      handleStreetChange = (event, index, value) => {
        this.setState({...this.state,street:event.target.value});
      };
      handleCityChange = (event, index, value) => {
        this.setState({...this.state,city:event.target.value});
      };
      handleZipChange = (event, index, value) => {
        this.setState({...this.state,zip_code:event.target.value});
      };
      handleStateChange = (event, index, value) => {
        this.setState({...this.state,state:value});
      };
      handleTypeChange1 = (event, index, value) => {
        this.setState({...this.state,room_type_value1:value});
      };
      handleTypeChange2 = (event, index, value) => {
        this.setState({...this.state,room_type_value2:value});
      };
      handleTypeChange3 = (event, index, value) => {
        this.setState({...this.state,room_type_value3:value});
      };
      handlePriceChange1 = (event, index, value) => {
        this.setState({...this.state,room_price_value1:event.target.value});
      };
      handlePriceChange2 = (event, index, value) => {
        this.setState({...this.state,room_price_value2:event.target.value});
      };
      handlePriceChange3 = (event, index, value) => {
        this.setState({...this.state,room_price_value3:event.target.value});
      };
      
      submitHotel(){
        //NotificationManager.success("Success", "lol", 2500, true);
        const zip = this.state.zipcode;
        if(!(zip.match(zipregex))){
            NotificationManager.error("Invalid Zip code", "Zip error", 2500, true);
        }
        else{
            console.log(this.state);
            API.addHotelAdmin(this.state)
            .then((res) => {
                if (res.status === 201) {
                    console.log("Success");
                    res.json().then(data => {
                        NotificationManager.success("Success", data.message, 2500, true);
                        // this.props.history.push("/logs");
                    });
            
                } else if (res.status === 401) {
                    // console.log("Fail");
                    // NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
                    // this.props.history.push("/");
                } 
            });
        }
        
      }

    render(){
        return(
            <div>
                
                <h1 style={{color:"skyblue"}}>Update Hotel</h1>
                
                <div className="row" style={divstyle}>
                    <TextField style={istyle}
                        id="hotel_name"
                        hintText="Hotel Name"
                        onChange={this.handleNameChange}
                        value={this.state.hotel_name}
                    />
                </div>
                <div className="row" style={divstyle}>
                    <TextField style={istyle}
                        id="destination"
                        hintText="Street"
                        onChange={this.handleStreetChange}
                        value={this.state.street}
                    />
                </div>
                <div className="row" style={divstyle}>
                    <TextField style={istyle}
                        id="city"
                        hintText="City"
                        onChange={this.handleCityChange}
                        value={this.state.city}
                    />
                </div>
                <div className="row" style={divstyle}>
                    <SelectField
                        
                        onChange={this.handleStateChange}
                        floatingLabelText="State"
                        maxHeight={200}  
                        value={this.state.state}
                    >
                        {stateItems}
                    </SelectField>
                </div>

                <div className="row" style={divstyle}>
                    <TextField style={istyle}
                        id="zipcode"
                        hintText="Zip Code"
                        onChange={this.handleZipChange}
                        value={this.state.zip_code}
                    />
                </div>

                {/* <div className="row" style={divstyle}>
                    <h4>Room Information</h4>
                </div> */}
            
                <div className="row">
                    <div className="col-md-4">

                        <SelectField
                            
                            onChange={this.handleTypeChange1}
                            floatingLabelText="Room Type"
                            maxHeight={200}  
                            value={this.state.room_type_value1}
                        >
                            {roomTypes}
                        </SelectField>
                    </div>
                    <div className="col-md-4">
                        <TextField style={roomStyle}
                            id="room_price"
                            hintText="Room Price"
                            onChange={this.handlePriceChange1}
                            value={this.state.room_price_value1}
                        />
                    </div>
                    

                </div>
                
                <div className="row">
                    <div className="col-md-4">

                        <SelectField
                            
                            onChange={this.handleTypeChange2}
                            floatingLabelText="Room Type"
                            maxHeight={200}  
                            value={this.state.room_type_value2}
                        >
                            {roomTypes}
                        </SelectField>
                    </div>
                    <div className="col-md-4">
                        <TextField style={roomStyle}
                            id="room_price"
                            hintText="Room Price"
                            onChange={this.handlePriceChange2}
                            value={this.state.room_price_value2}
                        />
                    </div>
                    

                </div>
                <div className="row">
                    <div className="col-md-4">

                        <SelectField
                            
                            onChange={this.handleTypeChange3}
                            floatingLabelText="Room Type"
                            maxHeight={200}  
                            value={this.state.room_type_value3}
                            
                        >
                            {roomTypes}
                        </SelectField>
                    </div>
                    <div className="col-md-4">
                        <TextField style={roomStyle}
                            id="room_price"
                            hintText="Room Price"
                            onChange={this.handlePriceChange3}
                            value={this.state.room_price_value3}
                        />
                    </div>
                    

                </div>
                <br/>

                <div className="row" style={divstyle}>
                    <button style={btnstyle}
                        id="destbtn"
                        hintText="Submit"
                        onClick={()=>{this.submitHotel()}}
                    >
                    Update
                    </button>
                </div>
                <NotificationContainer/>
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
    marginLeft:'7px',
    marginRight:'-2px',
    width:"300px"
}

function mapStateToProps(state){
    return{
        adminLoginData:state.adminLoginData,
        adminUpdateCurrentData:state.adminUpdateCurrentData
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeValueAdmin,
            adminSetCurrentItem,
            
        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(AdminUpdateHotel));
