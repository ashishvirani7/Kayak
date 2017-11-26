import React,{Component} from 'react';
import Divider from 'material-ui/Divider'
import CryptoJS from 'crypto-js';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeValueAdmin} from '../actions/adminLoginAction';

import {withRouter} from 'react-router-dom';

import * as API from '../api/API';

class AdminCars extends Component{


    render(){
        return(
            <div>
                <h1 style={{color:"skyblue"}}>Cars Live Here </h1>
                
            </div>
        )
    }
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
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(AdminCars));
