import React,{Component} from 'react';
import CustomNavbar from './CustomNavbar';
import {Route} from 'react-router-dom';
import HomeFooter from './HomeFooter';
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import {withRouter} from 'react-router-dom';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import AA from '../images/DL.png';
import PaymentPage from './PaymentPage';


class UserBooking extends Component{

    state = {
        finished: false,
        stepIndex: 0,
      };
    
    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 2,
        });
    };
    
    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
          this.setState({stepIndex: stepIndex - 1});
        }
    };
    
      renderStepActions(step) {
        const {stepIndex} = this.state;
    
        return (
          <div style={{margin: '12px 20px'}}>
            <RaisedButton
              label={stepIndex === 2 ? 'Finish' : 'Next'}
              disableTouchRipple={true}
              disableFocusRipple={true}
              primary={true}
              onClick={this.handleNext}
              style={{marginRight: 12}}
            />
            {step > 0 && (
              <FlatButton
                label="Back"
                disabled={stepIndex === 0}
                disableTouchRipple={true}
                disableFocusRipple={true}
                onClick={this.handlePrev}
              />
            )}
          </div>
        );
    }

    showBookingDetails = () => {

        var booking = this.props.userData.booking;
        return(
            <div className="row">
                <div className="col-md-7">
                <Paper style={flightstyle} zDepth={3}>
                    {booking.bookingType==="Flight" && 
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-2">
                                        <div className="row" style={{marginTop:'30px',marginLeft:'10px'}}>
                                            <img src={AA} style={{width:'32px'}}/>
                                        </div>
                                        <div className="row" style={{marginTop:'20px'}}>
                                            {booking.flight.flight_operator_name}
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="row" style={{marginTop:'40px'}}>
                                            {booking.flight.departure_date.slice(11,16)}
                                        </div>
                                        <div className="row" style={{marginTop:'10px'}}>
                                            {booking.flight.departure_date.slice(0,10)}
                                        </div>
                                        <div className="row">
                                            {booking.flight.origin}
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                    <div className="row" style={{marginTop:'60px'}}>
                                            <span style={{width:'100%',height:'2px',display:'inline-block',background:'#717585',position:'relative',margin:'3px 0'}} />
                                        </div>
                                        <div className="row" style={{textAlign:'center'}}>
                                            {'nonstop'}
                                        </div>  
                                    </div>
                                    <div className="col-md-2 col-md-offset-1">
                                        <div className="row" style={{marginTop:'40px'}}>
                                            {booking.flight.arrival_date.slice(11,16)}  
                                        </div>
                                        <div className="row" style={{marginTop:'10px'}}>
                                            {booking.flight.arrival_date.slice(0,10)}  
                                        </div>
                                        <div className="row" >
                                            {booking.flight.destination}
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="row" style={{marginTop:'50px'}}>
                                            {'21h 50m'}
                                            {booking.flight.duration}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    
                                </div>
                            </div>
                        </div>
                    }
                    {booking.bookingType==="Hotel" && 
                        <div className="row">
                            <div className="col-md-6">
                                hello
                            </div>
                        </div>
                    }
                    {booking.bookingType==="Car" && 
                        <div className="row">
                            <div className="col-md-6">

                            </div>
                        </div>
                    }
                </Paper>
                </div>
                <div className="col-md-4">
                <Paper style={{...flightstyle,width:'250px',marginLeft:'-100px'}} zDepth={3}>
                    <div className="row">
                        Name: {this.props.userData.data.first_name}
                        <br/>
                        Class: {booking.search.class}
                        <br/>
                        No Of Travellers: {booking.search.no_of_traveler}
                        <br/>
                        price: 
                        {(booking.flight.classes[0].class_type === booking.search.class) && booking.flight.classes[0].class_price}
                        {(booking.flight.classes[1].class_type === booking.search.class) && booking.flight.classes[1].class_price}
                        {(booking.flight.classes[2].class_type === booking.search.class) && booking.flight.classes[2].class_price}
                        <br/>
                        Total: 
                        {(booking.flight.classes[0].class_type === booking.search.class) && booking.flight.classes[0].class_price*booking.search.no_of_traveler}
                        {(booking.flight.classes[1].class_type === booking.search.class) && booking.flight.classes[1].class_price*booking.search.no_of_traveler}
                        {(booking.flight.classes[2].class_type === booking.search.class) && booking.flight.classes[2].class_price*booking.search.no_of_traveler}
                    </div>
                </Paper>
                </div>
            </div>
        )
    }

    showPaymentDetails = () => {
        return(
            <Paper style={paymentstyle} zDepth={3}>
                <PaymentPage/>
            </Paper>
        )
    }

    finalBooking = () => {
        return(
            <Paper style={paperstyle} zDepth={3}>

            </Paper>
        )
    }
    render(){
        const {finished, stepIndex} = this.state;
        return(
            <div>
                <div className="row">
                    <div className="col-md-12" style={{backgroundColor:'black',height:'46px'}}>
                        <div className="row" style={navstyle}>
                            <CustomNavbar />
                        </div>
                    </div>
                </div>
                <div className="row" style={{margin:'20px -30px 0px 50px',height:'50px',fontSize:'30px',fontWeight:'500px'}}>
                    {this.props.userData.booking.bookingType} Booking
                </div>
                <div className="row" style={{marginRight:'-30px',minHeight:'90vh'}}>
                <div style={{ margin: '20px 50px 50px 50px'}}>
                    <Stepper activeStep={stepIndex} orientation="vertical">
                    <Step>
                        <StepLabel style={{fontSize:'18px',color:'#00bcd4'}}>Booking Details</StepLabel>
                        <StepContent>
                        {this.showBookingDetails()}
                        {this.renderStepActions(0)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel style={{fontSize:'18px',color:'#00bcd4'}}>Confirm Your Payment</StepLabel>
                        <StepContent>
                        {this.showPaymentDetails()}
                        {this.renderStepActions(1)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel style={{fontSize:'px',color:'#00bcd4'}}>Confirm Your Booking</StepLabel>
                        <StepContent>
                        {this.finalBooking()}
                        {this.renderStepActions(2)}
                        </StepContent>
                    </Step>
                    </Stepper>
                </div>
                </div>
                <div className="row" >
                    <HomeFooter />
                </div>
            </div>
        )
    }
}

const navstyle={
    marginLeft:'120px',
    marginRight:'120px'
}

const paperstyle = {
    height: 200,
    width: 700,
    margin: 20,
    display: 'inline-block',
    padding:'15px'
  };

const flightstyle = {
    height: 200,
    width: 600,
    margin: 20,
    display: 'inline-block',
    padding:'15px 20px 15px 50px'
  };

const paymentstyle = {
    height: 750,
    width: 600,
    margin: 20,
    display: 'inline-block',
    padding:'15px 20px 15px 50px'
  };

function mapStateToProps(state){
    return{
        userData:state.userData,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            
        }
    ,dispatch);
}

export default withRouter(connect(mapStateToProps,matchDispatchToProps)(UserBooking));