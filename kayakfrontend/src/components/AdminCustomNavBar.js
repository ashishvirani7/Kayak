import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {setActiveItem} from '../actions/activeItem';
import {adminSetCurrentItem} from '../actions/adminSetCurrent';
import {adminSetActivePage} from '../actions/adminActivePage';
import {withRouter} from 'react-router-dom';
import logo from '../images/kayak.svg';
import AdminProfileItem from './adminProfileItem';
import CustomItem from './CustomItem';
class AdminCustomNavbar extends Component
{
    onClickItem(itemName){
        this.props.setActiveItem(itemName);
        this.props.history.push("/"+itemName);
        
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
    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-2">
                        <img src={logo} style={imgStyle} onClick={()=>{
                            this.props.history.push('/adminHotels');
                        }}/>
                    </div>
                    <div className="col-md-1" onClick={()=>this.redirectToHotels()}>
                        <CustomItem name="Hotels" />
                    </div>
                    <div className="col-md-1" onClick={()=>this.redirectToFlights()}>
                        <CustomItem name="Flights" />
                    </div>
                    <div className="col-md-1" onClick={()=>this.redirectToCars()}>
                        <CustomItem name="Cars" />
                    </div>
                    <div className="col-md-3 col-md-offset-4">
                        <AdminProfileItem />
                    </div>
                </div>
                {/* <div className="row" style={{marginTop:'-25px'}}>
                    <hr style={{borderTop:'2px solid rgba(255,255,255,0.3)',width:'100%'}}/>
                </div> */}
            </div>
        )
    }
}

const imgStyle={
    height:'25px',
    width:'130px',
    marginTop:'10px',
    marginBottom:'10px',
    background:'transparent',
    cursor:'pointer'
}

function mapStateToProps(state){
    return{
        activeItem:state.activeItem,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            setActiveItem,
            adminSetCurrentItem,
            adminSetActivePage

        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(AdminCustomNavbar));