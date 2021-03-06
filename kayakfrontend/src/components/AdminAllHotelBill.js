import React,{Component} from 'react';
import Divider from 'material-ui/Divider'
import CryptoJS from 'crypto-js';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeValueAdmin} from '../actions/adminLoginAction';
import {adminAllBill} from '../actions/adminAllBill';

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
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {
    
    red300,
    fullWhite
  
  } from 'material-ui/styles/colors';

  const months = [
    {
        "name":"1"
    },
    {
        "name":"2"
    },
    {
        "name":"3"
    },
    {
        "name":"4"
    },
    {
        "name":"5"
    },
    {
        "name":"6"
    },
    {
        "name":"7"
    },
    {
        "name":"8"
    },
    {
        "name":"9"
    },
    {
        "name":"10"
    },
    {
        "name":"11"
    },
    {
        "name":"12"
    },
]

const years = [
    {
        "name":"2014"
    },
    {
        "name":"2015"
    },
    {
        "name":"2016"
    },
    {
        "name":"2017"
    },
];
const allMonths = [];
const allYears = [];
months.map(month=>{
    allMonths.push(<MenuItem value={month.name} key={month.name} primaryText={month.name} />);
}) 
years.map(year=>{
    allYears.push(<MenuItem value={year.name} key={year.name} primaryText={year.name} />)
})
class AdminAllHotelBill extends Component{

    constructor(props){
        super(props);
        this.state={
            date:"",
            month:"1",
            year:"2017",
            current:"date"
        };
        
        this.radioButtonChange=this.radioButtonChange.bind(this);
    }
    getAllBilling(){
        API.adminGetAllBilling()
        .then((res) => {
            if (res.status === 201) {
                console.log("Success");
                res.json().then(data => {
                    console.log(JSON.stringify(data))
                    this.props.adminAllBill(data.message.data);
                    //NotificationManager.success("Success", data.message, 2500, true);
                    // this.props.history.push("/logs");
                });
        
            } else if (res.status === 401) {
                
                NotificationManager.error("Fail", "Fail", 2500, true);
                // this.props.history.push("/");
            } 
        });
        // this.props.adminAllHotels([{"hotel_id":"1","hotel_name":"Taj","address":{"street":"201 S 4th","city":"San Jose","zip_code":"95112",
        //     "state":"CA","country":"US"},"stars":7,"rooms":[{"room_id":"1","room_type":"Standard","room_price":1000}],"avg_rating":4,
        //   "reviews":{"ratings":"3","feedback":"good","user_id":"1"}}])

        
        //this.props.adminAllBill([{"_id":"1","bill_type":"Hotel","email":"av@gmail.com",bill_amount:"1000",hotel:{"hotel_name":"Taj"}}])
    }
    dateValueChange(event){
        this.setState({...this.state,date:event.target.value});
    }
    monthValueChange(event){
        this.setState({...this.state,month:event.target.value});
    }
    

    componentWillMount(){
        this.getAllBilling();
    }
    onBillClick(bill){
        this.props.adminCurrentUpdate({bill:bill,type:"Hotel"});
        this.props.history.push("/adminShowBill");
    }
    radioButtonChange = (event,value) => { 
        this.setState({...this.state,current:value});
    }

    handleDateChange = (event, date) => {
        console.log();
      this.setState({...this.state,date:date});
    };
    handleMonthChange = (event, index, value) => {
        this.setState({...this.state,month:value});
    };
    handleYearChange = (event, index, value) => {
        this.setState({...this.state,year:value});
    };

    createHotelBillList(){
        return this.props.adminBill.map((bill) => {
            return(
                <div>
                    {bill.bill_type === "Hotel" &&
                    <div>
                        <ListItem onClick={()=>{this.onBillClick(bill)}} style={{height:"60px"}}>
                            <div className="row" style={{height:"60px"}}> 
                               
                                <div className="col-md-3">
                                    {bill.bill_date}
                                </div>
                                <div className="col-md-3">
                                    {bill.email}
                                </div>
                                <div className="col-md-2">
                                    {bill.hotel.hotel_name}
                                </div>
                                <div className="col-md-2">
                                    {bill.hotel.city}
                                </div>
                                
                                <div className="col-md-2" >
                                    {bill.bill_amount}
                                </div>
                                        
                                
                            </div>
                        </ListItem>
                    </div>
                }
                </div>
            )
        });
    }

    
    
    // searchHotel(){
    //     console.log(this.state.hotel_name);
    //     API.searchHotelAdmin({hotel_name:this.state.hotel_name})
    //     .then((res) => {
    //         if (res.status === 201) {
    //             res.json().then(data => {
    //                 console.log(JSON.stringify(data))
    //                 this.props.adminAllHotels(data.message.data);
    //                 //NotificationManager.success("Success", data.message, 2500, true);
    //                 // this.props.history.push("/logs");
    //             });
                
    //         } else if (res.status === 401) {
    //             console.log("Fail");
    //             //NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
    //             // this.props.history.push("/");
    //         } 
    //     });
        
    // }

    searchBill() {
        if(this.state.current === "month"){
            API.searchBillsMonthAdmin({month:this.state.month,year:this.state.year})
            .then((res) => {
                if (res.status === 201) {
                    res.json().then(data => {
                        console.log(JSON.stringify(data))
                        this.props.adminAllBill(data.message.data);
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
        else{
            API.searchBillsDateAdmin({date:this.state.date})
            .then((res) => {
                if (res.status === 201) {
                    res.json().then(data => {
                        console.log(JSON.stringify(data))
                        this.props.adminAllBill(data.message.data);
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
    }

    render(){
        return(
            <div>
                <span style={titlestyle}>
                        Hotel Bill List 
                </span> 
                <hr style={{borderTop:'2px solid rgba(0,0,0,0.1)',width:'100%',marginTop:'7px',marginLeft:'0px'}}/>  
                
                
                <div className="row">

                    <div className="col-md-2 col-md-offset-5" style={{marginTop:"10px"}} >
                        <RadioButtonGroup  name="picker" defaultSelected="date" onChange={this.radioButtonChange}>
                            
                                <RadioButton
                                    value="date"
                                    label="Date"
                                    
                                />
                            
                                <RadioButton
                                    value="month"
                                    label="Month"
                                />
                            
                        </RadioButtonGroup>
                        
                    </div>

                    <div className="col-md-4 ">
                        <div class="input-group">
                            <div>
                            {
                                this.state.current === "date" &&
                                <DatePicker  floatingLabelText="Date" container="inline" autoOk={true}
                                    onChange={this.handleDateChange} />
                            }
                            {
                                this.state.current === "month" &&
                                <div className="row">
                                    <div className="col-md-6">
                                        <SelectField
                                        value={this.state.month}
                                        onChange={this.handleMonthChange}
                                        floatingLabelText="Month"
                                        maxHeight={200}  
                                        style={{width:100,height:'70px'}} 

                                        >
                                            {allMonths}
                                        </SelectField>
                                    </div>
                                    <div className="col-md-6">
                                        <SelectField
                                        value={this.state.year}
                                        onChange={this.handleYearChange}
                                        floatingLabelText="Year"
                                        maxHeight={200}  
                                        style={{width:100,height:'70px'}} 
                                        >
                                            {allYears}
                                        </SelectField>
                                    </div>
                                    
                                    
                                </div>

                            }
                            </div>
                            <span class="input-group-addon" style={{cursor:"pointer"}} onClick={()=>this.searchBill()}>
                                🔎
                            </span>
                        </div>
                    </div>
                    
                </div>
                
                <br/>
                <ListItem disabled={true} style={{height:"45px","backgroundColor":"#ec7132"}}>
                    <div className="row" style={{"color":"white",fontSize:"20px"}}> 
                        
                            <div className="col-md-3">
                                Bill Date
                            </div>
                            <div className="col-md-3">
                                User email
                            </div>
                            <div className="col-md-2">
                                Hotel Name
                            </div>
                            <div className="col-md-2">
                                City
                            </div>
                            
                            <div className="col-md-2" >
                                Amount
                            </div>
                            
                        
                    </div>
                </ListItem>
                <Divider/>
                <Divider/>
                {this.createHotelBillList()}
            </div>
        )
    }
}
const titlestyle={
    fontSize: '30px',
    fontWeight: '200',
    marginBottom:'20px'
}
const smallIcon= {
    width: 20,
    height: 20,
  }
const small={
    width: 20,
    height: 20,
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

function mapStateToProps(state){
    return{
        adminLoginData:state.adminLoginData,
        adminBill:state.adminBill
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeValueAdmin,
            adminSetCurrentItem,
            adminCurrentUpdate,
            adminAllBill
        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(AdminAllHotelBill));
