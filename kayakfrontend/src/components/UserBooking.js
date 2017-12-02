import React,{Component} from 'react';
import CustomNavbar from './CustomNavbar';
import {Route} from 'react-router-dom';
import HomeFooter from './HomeFooter';

class UserBooking extends Component{
    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-12" style={{backgroundColor:'black',height:'46px'}}>
                        <div className="row" style={navstyle}>
                            <CustomNavbar />
                        </div>
                    </div>
                </div>
                <div className="row" style={{marginRight:'-30px',height:'110vh'}}>
                    
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

export default UserBooking;