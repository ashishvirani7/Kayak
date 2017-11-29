import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import IconArrow from '../icons/IconArrow';
import IconSort from '../icons/IconSort';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import * as API from '../api/API';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import img1 from '../images/price-alert_ad_white.png';
import img3 from '../images/explore_ad_white.png';
import img2 from '../images/kayak-app_ad_v1.jpg';

class CarResults extends Component
{
    state = {
        sort:0,
        small:false,
        Medium:false,
        Large:false,
        SUV:false,
        Luxury:false,
        PickupTruck:false,
        Van:false,
        Commercial:false,
    }
    render(){
        return(
            <div>
                <div className="row" style={rstyle}>
                    <div className="col-md-5" >
                        <div className="row" style={divstyle}>
                            <TextField style={istyle}
                                id="city"
                                hintText="Where"
                            />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row" style={divstyle}>
                            <DatePicker id="fromDate" style={istyle} hintText="From" container="inline" autoOk/>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row" style={divstyle}>
                            <DatePicker id="toDate" style={istyle} hintText="To" container="inline" autoOk/>
                        </div>
                    </div>
                    <div className="col-md-1">
                        <div className="row" style={divstyle}>
                            <button style={btnstyle}
                                id="destbtn"
                                hintText="Where"
                                onClick={()=>{
                                    var data ={
                                        city:     document.getElementById('city').value,
                                        toDate:     document.getElementById('toDate').value,
                                        fromDate:   document.getElementById('fromDate').value,
                                    }
                                    if(data.city && data.toDate && data.fromDate){
                                        console.log(data);
                                        API.doCarSearch(data)
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
                            <IconArrow color="white" style={arrowStyle}/> 
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row" style={{backgroundColor:'#eaebee',minHeight:'100vh',width:'100%',margin:'0px',paddingBottom:'50px'}}>
                    <div className="col-md-2">
                        <div className="row">
                            <div className="col-md-12" style={{margin:'10px',backgroundColor:'white'}}>
                                <div class="row" style={starttitle} onClick={()=>{
                                        //console.log('click');
                                        this.setState({...this.state,sort:!this.state.sort,type:'price'});
                                    }}>
                                    <span style={{float:'left',marginTop:'10px',fontWeight:'600',fontSize:'12px',color:(this.state.type==='price')?'#80abec':'black'}}>PRICE</span>
                                    <span style={{float:'right',marginTop:'5px',color:'#558fe6',fontWeight:'100',fontSize:'12px',width:'fit-content'}} hoverColor="white" >
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
                                    <span style={{float:'left'}}>Car Type</span>
                                    <span style={{float:'right',marginTop:'5px',color:'#558fe6',fontWeight:'100',fontSize:'12px',width:'fit-content'}} hoverColor="white" onClick={()=>{
                                        //console.log('click');
                                        this.setState({...this.state,valueStar:0});
                                    }}>RESET</span>
                                </div>
                                <div class="row" >
                                    <hr style={{borderTop:'1px solid rgba(0,0,0,0.1)',width:'83%',marginTop:'0px',marginLeft:'15px'}}/>
                                </div>
                                <div className="row" style={{fontSize:'13.5px',fontWeight:'100',marginLeft:'0px'}}>
                                    <Checkbox
                                        label="Small"
                                        checked={this.state.Small}
                                        onCheck={()=>{this.setState({...this.state,Small:!this.state.Small});}}
                                    />
                                </div>
                                <div className="row" style={{fontSize:'13.5px',fontWeight:'100',marginLeft:'0px'}}>
                                    <Checkbox
                                        label="Medium"
                                        checked={this.state.Medium}
                                        onCheck={()=>{this.setState({...this.state,Medium:!this.state.Medium});}}
                                    />
                                </div>
                                <div className="row" style={{fontSize:'13.5px',fontWeight:'100',marginLeft:'0px'}}>
                                    <Checkbox
                                        label="Large"
                                        checked={this.state.Large}
                                        onCheck={()=>{this.setState({...this.state,Large:!this.state.Large});}}
                                    />
                                </div>
                                <div className="row" style={{fontSize:'13.5px',fontWeight:'100',marginLeft:'0px'}}>
                                    <Checkbox
                                        label="SUV"
                                        checked={this.state.SUV}
                                        onCheck={()=>{this.setState({...this.state,SUV:!this.state.SUV});}}
                                    />
                                </div>
                                <div className="row" style={{fontSize:'13.5px',fontWeight:'100',marginLeft:'0px'}}>
                                    <Checkbox
                                        label="Luxury"
                                        checked={this.state.Luxury}
                                        onCheck={()=>{this.setState({...this.state,Luxury:!this.state.Luxury});}}
                                    />
                                </div>
                                <div className="row" style={{fontSize:'13.5px',fontWeight:'100',marginLeft:'0px'}}>
                                    <Checkbox
                                        label="Pickup Truck"
                                        checked={this.state.PickupTruck}
                                        onCheck={()=>{this.setState({...this.state,PickupTruck:!this.state.PickupTruck});}}
                                    />
                                </div>
                                <div className="row" style={{fontSize:'13.5px',fontWeight:'100',marginLeft:'0px'}}>
                                    <Checkbox
                                        label="Van"
                                        checked={this.state.Van}
                                        onCheck={()=>{this.setState({...this.state,Van:!this.state.Van});}}
                                    />
                                </div>
                                <div className="row" style={{fontSize:'13.5px',fontWeight:'100',marginLeft:'0px'}}>
                                    <Checkbox
                                        label="Commercial"
                                        checked={this.state.Commercial}
                                        onCheck={()=>{this.setState({...this.state,Commercial:!this.state.Commercial});}}
                                    />
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
const arrowStyle={
    marginLeft:'-5px'
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
export default CarResults;