import React,{Component} from 'react';
import logo from '../images/kayak.svg';
import ProfileItem from './ProfileItem';
import CustomItem from './CustomItem';
class CustomNavbar extends Component
{
    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-2">
                        <img src={logo} style={imgStyle}/>
                    </div>
                    <div className="col-md-1">
                        <CustomItem name="Hotels" />
                    </div>
                    <div className="col-md-1">
                        <CustomItem name="Flights" />
                    </div>
                    <div className="col-md-1">
                        <CustomItem name="Cars" />
                    </div>
                    <div className="col-md-3 col-md-offset-4">
                        <ProfileItem />
                    </div>
                </div>
                <div className="row" style={{marginTop:'-25px'}}>
                    <hr style={{borderTop:'2px solid rgba(255,255,255,0.3)',width:'100%'}}/>
                </div>
            </div>
        )
    }
}

const imgStyle={
    height:'25px',
    width:'130px',
    marginTop:'10px',
    marginBottom:'10px',
    background:'transparent'
}


export default CustomNavbar;