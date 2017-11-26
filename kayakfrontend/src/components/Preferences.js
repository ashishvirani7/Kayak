import React,{Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import * as API from '../api/API';

class Preferences extends Component
{
    state={
        edit : false
    }

    render(){
        return(
            <div>
                <div className="row">
                    <span style={titlestyle}>
                        Preferences
                    </span> 
                    <hr style={{borderTop:'2px solid rgba(0,0,0,0.1)',width:'90%',marginTop:'7px',marginLeft:'0px'}}/>       
                </div>
                <div className="row" style={itemstyle}>
                    <div className="col-md-3" style={labelstyle}>
                        First Name
                    </div>
                    <div className="col-md-9">
                        {!this.state.edit
                            ?<div>Hello</div>
                            :<input 
                                id="firstName"
                                type="text" 
                                name="FirstName" 
                                defaultValue="first"
                            />
                        }
                    </div>
                    <hr style={{borderTop:'1px solid rgba(0,0,0,0.1)',width:'85%',marginTop:'33px',marginLeft:'0px'}}/>       
                </div>
                <div className="row" style={itemstyle}>
                    <div className="col-md-3" style={labelstyle}>
                        Middle Name
                    </div>
                    <div className="col-md-9">
                        {!this.state.edit
                            ?<div>Hello</div>
                            :<input 
                                id="middleName"
                                type="text" 
                                name="MiddleName" 
                                defaultValue="middle"
                            />
                        }
                    </div>
                    <hr style={{borderTop:'1px solid rgba(0,0,0,0.1)',width:'85%',marginTop:'33px',marginLeft:'0px'}}/>       
                </div>
                <div className="row" style={itemstyle}>
                    <div className="col-md-3" style={labelstyle}>
                        Last Name
                    </div>
                    <div className="col-md-9">
                    {!this.state.edit
                            ?<div>Hello</div>
                            :<input 
                                id="lastName"
                                type="text" 
                                name="FirstName" 
                                defaultValue="last"
                            />
                        }
                    </div>
                    <hr style={{borderTop:'1px solid rgba(0,0,0,0.1)',width:'85%',marginTop:'33px',marginLeft:'0px'}}/>       
                </div>
                <div className="row">
                    <RaisedButton style={editstyle} primary={true} onClick={()=>{
                        console.log("hello"+this.state.edit);
                        if(!this.state.edit){
                            this.setState({...this.state,edit : true});
                        }
                        else{
                            var first_name = document.getElementById('firstName').value;
                            var last_name = document.getElementById('lastName').value;
                            var middle_name = document.getElementById('middleName').value;
                            var data = {
                                first_name,
                                last_name,
                                middle_name
                            }
                            console.log(data);
                            API.updateUserInfo(data)
                            .then((data)=>{
                                if(data.status===201)
                                {
                                    console.log("info changed");
                                }
                                else{

                                }
                            });
                            this.setState({edit:false});
                        }
                    }}>
                        {this.state.edit?"Update":"Edit"}
                    </RaisedButton>
                    {this.state.edit && <FlatButton label="Cancel" primary={true} onClick={()=>{this.setState({edit:false});}}/>}
                </div>
            </div>
        )
    }
}

const titlestyle={
    fontSize: '30px',
    fontWeight: '200',
    marginBottom:'20px'
}
const itemstyle={
    height: '20px',
    marginBottom:'35px'
}
const labelstyle={
    fontWeight:'bold',
    color: '#333',
    fontSize:'14px',
}
const editstyle={
    
}
export default Preferences;