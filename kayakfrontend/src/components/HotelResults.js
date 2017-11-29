import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import IconArrow from '../icons/IconArrow';
import IconStar from '../icons/IconStar';
import IconStarOut from '../icons/IconStarOut';
import IconSort from '../icons/IconSort';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

import * as API from '../api/API';

class HotelResults extends Component
{
    state = {
        valueRoom:1,
        valueGuest:1,
        valueStar:5,
        priceFilter:false
    }

    handleChangeRoom = (event, index, valueRoom) => this.setState({...this.state,valueRoom});
    handleChangeGuest = (event, index, valueGuest) => this.setState({...this.state,valueGuest});

    render(){
        return(
            <div>
                <div className="row" style={rstyle}>
                    <div className="col-md-3" >
                        <div className="row" style={divstyle}>
                            <TextField style={istyle}
                                id="destination"
                                hintText="Where"
                                required="required"
                            />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="row" style={divstyle}>
                            <DatePicker id="fromDate" style={istyle} hintText="From" container="inline" autoOk />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="row" style={divstyle}>
                            <DatePicker id="toDate" style={istyle} hintText="To" container="inline" autoOk/>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="row" style={divstyle}>
                            <SelectField
                                value={this.state.valueRoom}
                                onChange={this.handleChangeRoom}
                                style={istyle}
                                >
                                <MenuItem value={1} primaryText="1 Room" />
                                <MenuItem value={2} primaryText="2 Rooms" />
                                <MenuItem value={3} primaryText="3 Rooms" />
                                <MenuItem value={4} primaryText="4 Rooms" />
                                <MenuItem value={5} primaryText="5 Rooms" />
                                <MenuItem value={6} primaryText="6 Rooms" />
                            </SelectField>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="row" style={divstyle}>
                            <SelectField
                                value={this.state.valueGuest}
                                onChange={this.handleChangeGuest}
                                style={istyle}
                                >
                                <MenuItem value={1} primaryText="1 guest" />
                                <MenuItem value={2} primaryText="2 guests" />
                                <MenuItem value={3} primaryText="3 guests" />
                                <MenuItem value={2} primaryText="4 guests" />
                                <MenuItem value={3} primaryText="5 guests" />
                                <MenuItem value={2} primaryText="6 guests" />
                                <MenuItem value={3} primaryText="7 guests" />
                                <MenuItem value={2} primaryText="8 guests" />
                                <MenuItem value={3} primaryText="9 guests" />
                                <MenuItem value={2} primaryText="10 guests" />
                            </SelectField>
                        </div>
                    </div>
                    <div className="col-md-1">
                        <div className="row" style={divstyle}>
                            <button style={btnstyle}
                                id="destbtn"
                                hintText="Where"
                                type="submit"
                                onClick={()=>{
                                    var data ={
                                        city:document.getElementById('destination').value,
                                        checkIn:     document.getElementById('toDate').value,
                                        checkOut:   document.getElementById('fromDate').value,
                                        noOfRoom:   this.state.valueRoom,
                                        noOfGuest:  this.state.valueGuest,
                                    }
                                    if(data.city && data.checkIn && data.checkOut){
                                        console.log(data);
                                        API.doHotelSearch(data)
                                        .then((res)=>{
                                            if(res.status===201){

                                            }
                                        });
                                    }
                                    else{
                                        NotificationManager.warning('Enter Searh Details','Search Fields are Empty',2500);
                                    }
                                    
                                }}
                            >
                            <IconArrow color="white" /> 
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row" style={{backgroundColor:'#eaebee',minHeight:'100vh',width:'100%',margin:'0px'}}>
                    <div className="col-md-2">
                        <div className="row">
                            <div className="col-md-12" style={{margin:'10px',backgroundColor:'white'}}>
                                <div class="row" style={starttitle} >
                                    <span style={{float:'left'}}>Stars</span>
                                    <span style={{float:'right',marginTop:'5px',color:'#558fe6',fontWeight:'100',fontSize:'12px',width:'fit-content'}} hoverColor="white" onClick={()=>{
                                        //console.log('click');
                                        this.setState({...this.state,valueStar:0});
                                    }}>Reset</span>
                                </div>
                                <div class="row" >
                                    <hr style={{borderTop:'1px solid rgba(0,0,0,0.1)',width:'83%',marginTop:'0px',marginLeft:'15px'}}/>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">0+</div>
                                    <div className="col-md-3">2</div>
                                    <div className="col-md-3">3</div>
                                    <div className="col-md-3">4</div>
                                </div>
                                <div className="row" style={{marginLeft:'-30px'}}>
                                    <div className="col-md-3" style={{marginLeft:'-3px',marginRight:'-3px'}} onClick={()=>{this.setState({...this.state,valueStar:0});}}>
                                    <IconButton tooltip="Any Stars 0+">
                                    {(this.state.valueStar<=0)
                                    ?<IconStar width="45" height='45' />
                                    :<IconStarOut width="45" height='45' >1</IconStarOut>}
                                    </IconButton>
                                    </div>
                                    <div className="col-md-3" style={{marginLeft:'-3px',marginRight:'-3px'}} onClick={()=>{console.log('click');this.setState({...this.state,valueStar:2});}}>
                                    <IconButton tooltip="2 and up">
                                    {(this.state.valueStar<=2)
                                    ?<IconStar width="45" height='45' />
                                    :<IconStarOut width="45" height='45' >1</IconStarOut>}
                                    </IconButton>
                                    </div>
                                    <div className="col-md-3" style={{marginLeft:'-3px',marginRight:'-3px'}} onClick={()=>{console.log('click');this.setState({...this.state,valueStar:3});}}>
                                    <IconButton tooltip="3 and up">
                                    {(this.state.valueStar<=3)
                                    ?<IconStar width="45" height='45' />
                                    :<IconStarOut width="45" height='45' >1</IconStarOut>}
                                    </IconButton>
                                    </div>
                                    <div className="col-md-3" style={{marginLeft:'-3px',marginRight:'-3px'}} onClick={()=>{console.log('click');this.setState({...this.state,valueStar:5});}}>
                                    <IconButton tooltip="4 and up">
                                    {(this.state.valueStar<=5)
                                    ?<IconStar width="45" height='45' />
                                    :<IconStarOut width="45" height='45' >1</IconStarOut>}
                                    </IconButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12" style={{margin:'10px',marginTop:'0px',backgroundColor:'white'}}>
                                <div class="row" style={starttitle} onClick={()=>{
                                        //console.log('click');
                                        this.setState({...this.state,sort:!this.state.sort});
                                    }}>
                                    <span style={{float:'left',marginTop:'10px',fontWeight:'600',fontSize:'12px'}}>PRICE</span>
                                    <span style={{float:'right',marginTop:'5px',color:'#558fe6',fontWeight:'100',fontSize:'12px',width:'fit-content'}} hoverColor="white" onClick={()=>{
                                        //console.log('click');
                                        this.setState({...this.state,sort:!this.state.sort});
                                    }}>
                                    <IconSort width="24" height="24" color="#80abec" sort={this.state.sort}/>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div class="row">
                            <div className="col-md-12" style={{margin:'10px',marginLeft:'20px',height:'100px',backgroundColor:'white'}}>
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">

                    </div>
                </div>
            </div>
        )
    }
}

const starttitle={
    margin:'10px',
    color:'#0f0f0f',
    fontFamily:'"HelveticaNeue-Bold",Helvetica,Arial,sans-serif',
    fontWeight:'600',
    fontSize:'1.2em',
    cursor:'pointer',
    marginLeft:'0px'
}
const rstyle={
    marginTop:'19px',
    marginRight:'15px',
    marginLeft:'15px',
    height:'71px',
    width:'100%'
}
const btnstyle={
    border:'none',
    fontSize:'16px',
    height:'50px',
    width:'60%',
    marginLeft:'5px',
    marginRight:'5px',
    backgroundImage: 'linear-gradient(135deg,#ff690f 0%,#ff4f3a 100%)',
    boxShadow:'5px 5px 5px 1px #eaebee'
}
const istyle={
    fontSize:'16px',
    fontWeight:'600',
    height:'50px',
    width:'100%',
    backgroundColor:'white',
    marginLeft:'5px',
    marginRight:'5px',
    barderSize:'1px',
    borderColor:'black',
    textAlign:'center',
    boxShadow:'5px 5px 5px 1px #eaebee'
}
const divstyle={
    marginLeft:'-20px',
    marginRight:'-2px',
}
export default HotelResults;