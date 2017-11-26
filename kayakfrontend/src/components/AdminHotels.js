import React,{Component} from 'react';
import Divider from 'material-ui/Divider'
import CryptoJS from 'crypto-js';


import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import IconArrow from '../icons/IconArrow';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeValueAdmin} from '../actions/adminLoginAction';

import {withRouter} from 'react-router-dom';

import * as API from '../api/API';

class AdminHotels extends Component{


    render(){
        return(
            <div>
                <h1 style={{color:"skyblue"}}>Hotels Live Here </h1>
                <div className="col-md-12">
                    <div className="row" style={rstyle}>
                        <div className="col-md-2" >
                            <div className="row" style={divstyle}>
                                <TextField style={istyle}
                                    id="destination"
                                    hintText="From Where?"
                                />
                            </div>
                        </div>
                        <div className="col-md-2" >
                            <div className="row" style={divstyle}>
                                <TextField style={istyle}
                                    id="destination"
                                    hintText="To Where?"
                                />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="row" style={divstyle}>
                                <DatePicker style={istyle} hintText="To" container="inline" />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="row" style={divstyle}>
                                <DatePicker style={istyle} hintText="From" container="inline"/>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="row" style={divstyle}>
                                <TextField style={istyle}
                                    id="destination"
                                    hintText="Where"
                                />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="row" style={divstyle}>
                                <button style={btnstyle}
                                    id="destbtn"
                                    hintText="Submit"
                                >
                                 Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
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
    marginLeft:'5px',
    marginRight:'5px',
    barderSize:'1px',
    borderColor:'black',
    
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
    marginLeft:'-20px',
    marginRight:'-2px'
}

function mapStateToProps(state){
    return{
        adminLoginData:state.adminLoginData
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeValueAdmin
        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(AdminHotels));
