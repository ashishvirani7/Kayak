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
        return(
            <Paper style={paperstyle} zDepth={3}>
                {this.userData.booking.bookingType==="Hotel" && 
                    <div className="row">
                        <div className="col-md-6">

                        </div>
                    </div>
                }
                {this.userData.booking.bookingType==="Flight" && 
                    <div className="row">
                        <div className="col-md-6">

                        </div>
                    </div>
                }
                {this.userData.booking.bookingType==="Car" && 
                    <div className="row">
                        <div className="col-md-6">

                        </div>
                    </div>
                }
            </Paper>
        )
    }

    showPaymentDetails = () => {
        return(
            <Paper style={paperstyle} zDepth={3}>

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
                <div className="row" style={{marginRight:'-30px',height:'110vh'}}>
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
    textAlign: 'center',
    display: 'inline-block',
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