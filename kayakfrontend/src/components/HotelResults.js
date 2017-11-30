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
import {withRouter} from 'react-router-dom';

import * as API from '../api/API';

import img1 from '../images/price-alert_ad_white.png';
import img2 from '../images/price-alert_ad_v1.jpg';
import img3 from '../images/explore_ad_white.png';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeHotelListing} from '../actions/hotelListingAction';
import {changeHotelSearch} from '../actions/hotelSearchAction';

class HotelResults extends Component
{
    state = {
        valueRoom:1,
        valueGuest:1,
        valueStar:5,
        sort:0
    }

    componentDidMount(){
        this.getHotels();
    }

    getHotels = () =>{
        console.log("hello");
        var filter_props = {
            ratings: this.state.valueStar,
        }
        var data ={
            city:       document.getElementById('destination').value,
            checkIn:    document.getElementById('toDate').value,
            checkOut:   document.getElementById('fromDate').value,
            noOfRoom:   this.props.userData.hotelSearch.noOfRoom,
            noOfGuest:  this.props.userData.hotelSearch.noOfGuest,
            filter_props,
            order:      this.state.sort?'price_desc':'price_asc',
        }
        console.log(data);
        if(data.city && data.checkIn && data.checkOut){
            //console.log(data);
            this.props.changeHotelSearch(data);
            API.doHotelSearch(data)
            .then((res)=>{
                if(res.status===201){
                    res.json().then(items=>{
                        this.props.changeHotelListing(items.data);
                    });
                }
            });
        }
        else{
            //NotificationManager.warning('Enter Searh Details','Search Fields are Empty',2500);
        }
    }

    handleChangeRoom = (event, index, valueRoom) => this.setState({...this.state,valueRoom:valueRoom});
    handleChangeGuest = (event, index, valueGuest) => this.setState({...this.state,valueGuest:valueGuest});

    render(){
        return(
            <div>
                <div className="row" style={rstyle}>
                    <div className="col-md-3" >
                        <div className="row" style={divstyle}>
                            <TextField style={istyle}
                                id="destination"
                                hintText="Where"
                                value={this.props.userData.hotelSearch.city}
                                required="required"
                            />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="row" style={divstyle}>
                            <DatePicker id="fromDate" defaultDate={new Date(this.props.userData.hotelSearch.checkIn)} style={istyle} hintText="From" container="inline" autoOk />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="row" style={divstyle}>
                            <DatePicker id="toDate" defaultDate={new Date(this.props.userData.hotelSearch.checkOut)} style={istyle} hintText="To" container="inline" autoOk/>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="row" style={divstyle}>
                            <SelectField
                                value={this.props.userData.hotelSearch.noOfRoom}
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
                                value={this.props.userData.hotelSearch.noOfGuest}
                                onChange={this.handleChangeGuest}
                                style={istyle}
                                >
                                <MenuItem value={1} primaryText="1 guest" />
                                <MenuItem value={2} primaryText="2 guests" />
                                <MenuItem value={3} primaryText="3 guests" />
                                <MenuItem value={4} primaryText="4 guests" />
                                <MenuItem value={5} primaryText="5 guests" />
                                <MenuItem value={6} primaryText="6 guests" />
                                <MenuItem value={7} primaryText="7 guests" />
                                <MenuItem value={8} primaryText="8 guests" />
                                <MenuItem value={9} primaryText="9 guests" />
                                <MenuItem value={10} primaryText="10 guests" />
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
                                    this.getHotels();
                                }}
                            >
                            <IconArrow color="white" /> 
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row" style={{backgroundColor:'#eaebee',minHeight:'100vh',width:'100%',margin:'0px',paddingBottom:'50px'}}>
                    <div className="col-md-2">
                        <div className="row">
                            <div className="col-md-12" style={{margin:'10px',marginTop:'10px',backgroundColor:'white'}}>
                                <div class="row" style={starttitle} onClick={()=>{
                                        //console.log('click');
                                        this.setState({...this.state,sort:!this.state.sort,type:'price'});
                                        this.getHotels();
                                    }}>
                                    <span style={{float:'left',marginTop:'10px',fontWeight:'600',fontSize:'12px',color:(this.state.type==='price')?'#80abec':'black'}}>PRICE</span>
                                    <span style={{float:'right',marginTop:'5px',color:'#558fe6',fontWeight:'100',fontSize:'12px',width:'fit-content'}} hoverColor="white" onClick={()=>{
                                        //console.log('click');
                                        this.setState({...this.state,sort:!this.state.sort,type:'price'});
                                        this.getHotels();
                                    }}>
                                    {(this.state.type==='price') &&
                                    <IconSort width="24" height="24" color="#80abec" sort={this.state.sort}/>
                                    }
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12" style={{margin:'10px',marginTop:'0px',backgroundColor:'white'}}>
                                <div class="row" style={starttitle} >
                                    <span style={{float:'left'}}>Stars</span>
                                    <span style={{float:'right',marginTop:'5px',color:'#558fe6',fontWeight:'100',fontSize:'12px',width:'fit-content'}} hoverColor="white" onClick={()=>{
                                        //console.log('click');
                                        this.setState({...this.state,valueStar:0});
                                        this.getHotels();
                                    }}>RESET</span>
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
                                    <div className="col-md-3" style={{marginLeft:'-3px',marginRight:'-3px'}} onClick={()=>{this.setState({...this.state,valueStar:0});this.getHotels();}}>
                                    <IconButton tooltip="Any Stars 0+">
                                    {(this.state.valueStar<=0)
                                    ?<IconStar width="45" height='45' />
                                    :<IconStarOut width="45" height='45' >1</IconStarOut>}
                                    </IconButton>
                                    </div>
                                    <div className="col-md-3" style={{marginLeft:'-3px',marginRight:'-3px'}} onClick={()=>{console.log('click');this.setState({...this.state,valueStar:2});this.getHotels();}}>
                                    <IconButton tooltip="2 and up">
                                    {(this.state.valueStar<=2)
                                    ?<IconStar width="45" height='45' />
                                    :<IconStarOut width="45" height='45' >1</IconStarOut>}
                                    </IconButton>
                                    </div>
                                    <div className="col-md-3" style={{marginLeft:'-3px',marginRight:'-3px'}} onClick={()=>{console.log('click');this.setState({...this.state,valueStar:3});this.getHotels();}}>
                                    <IconButton tooltip="3 and up">
                                    {(this.state.valueStar<=3)
                                    ?<IconStar width="45" height='45' />
                                    :<IconStarOut width="45" height='45' >1</IconStarOut>}
                                    </IconButton>
                                    </div>
                                    <div className="col-md-3" style={{marginLeft:'-3px',marginRight:'-3px'}} onClick={()=>{console.log('click');this.setState({...this.state,valueStar:5});this.getHotels();}}>
                                    <IconButton tooltip="4 and up">
                                    {(this.state.valueStar<=5)
                                    ?<IconStar width="45" height='45' />
                                    :<IconStarOut width="45" height='45' >1</IconStarOut>}
                                    </IconButton>
                                    </div>
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
                        <div class="row">
                            <div className="col-md-12" style={{marginTop:'10px',marginLeft:'15px',marginRight:'20px'}}>    
                                <img src={img1} style={{width:'286px',cursor:'pointer'}}/>
                            </div>
                        </div>
                        <div class="row">
                            <div className="col-md-12" style={{marginTop:'10px',marginLeft:'15px',marginRight:'20px'}}>    
                                <img src={img2} style={{width:'286px',cursor:'pointer'}}/>
                            </div>
                        </div>
                        <div class="row">
                            <div className="col-md-12" style={{marginTop:'10px',marginLeft:'15px',marginRight:'20px'}}>    
                                <img src={img3} style={{width:'286px',cursor:'pointer'}}/>
                            </div>
                        </div>
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

function mapStateToProps(state){
    return{
        userData:state.userData,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeHotelListing,
            changeHotelSearch
        }
    ,dispatch);
}

export default withRouter(connect(mapStateToProps,matchDispatchToProps)(HotelResults));