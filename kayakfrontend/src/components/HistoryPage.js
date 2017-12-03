import React,{Component} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeHistoryData} from '../actions/historyAction.js';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import * as API from '../api/API';

class HistoryPage extends Component
{
    state = {
        filter: 'Current'
    }

    componentDidMount(){
        this.getAllBookings();
    }

    getAllBookings = () => {
        var email = this.props.userData.data.email;
        API.getAllBookings({email})
        .then((res)=>{
            if(res.status===201){
                res.json().then(history=>{
                    console.log(history);
                    this.props.changeHistoryData(history.data);
                });
                
            }
        });
    }

    showHistory = () => {

    }
    handleSelect = (event,value) => this.setState({...this.state,filter:value})
    render(){
        return(
            <div>
                <div className="row">
                    <span style={titlestyle}>
                        History
                    </span> 
                    <hr style={{borderTop:'2px solid rgba(0,0,0,0.1)',width:'90%',marginTop:'7px',marginLeft:'0px'}}/>       
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <RadioButtonGroup 
                        name="history" 
                        defaultSelected="Current"
                        onChange={this.handleSelect}>
                            <RadioButton
                                value="All"
                                label="All"
                                style={styles.radioButton}
                            />
                            <RadioButton
                                value="Past"
                                label="Past"
                                style={styles.radioButton}
                            />
                            <RadioButton
                                value="Current"
                                label="Current"
                                style={styles.radioButton}
                            />
                        </RadioButtonGroup>
                    </div>
                    <div className="col-md-10">
                        {this.showHistory()}
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    block: {
      maxWidth: 250,
    },
    radioButton: {
      marginBottom: 16,
    },
};

const titlestyle={
    fontSize: '30px',
    fontWeight: '200',
    marginBottom:'20px'
}
function mapStateToProps(state){
    return{
        userData:state.userData
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeHistoryData,
        }
    ,dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(HistoryPage);