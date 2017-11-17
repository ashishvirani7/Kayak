import React,{Component} from 'react';
import CustomNavbar from './CustomNavbar';
import IconHotel from '../icons/IconHotel';
import IconFlight from '../icons/IconFlight';
import IconCar from '../icons/IconCar';

const Background = "https://a1.r9cdn.net/dimg/phoenix-images/v1/phoenix-flights-bg.jpg";
class HomePage extends Component {
    render() {
        return (
            <div className="App">
                <div className="row"  style={divStyle}>
                    <div className="col-md-12">
                        <div className="row" style={{marginLeft:'200px',marginRight:'200px'}}>
                            <CustomNavbar />
                        </div>
                        <div className="row" style={slogan}>
                            Search hundreds of travel sites at once.
                        </div>
                        <div className="row" >
                            <IconHotel width="32" height="32" color="white"/>
                            <IconFlight width="32" height="32" color="white"/>
                            <IconCar width="32" height="32" color="white"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const divStyle={
    width:'fit',
    height:'75vh',
    backgroundImage:'url('+Background+')',
    backgroundPositionX:'center',
    backgroundPositionY:'-40px'
}

const slogan={
    width: '100%',
    top: '50%',
    left: '0',
    marginTop: '40px',
    color:'white',
    textAlign: 'center',
    fontFamily: '"HelveticaNeue-Bold",Helvetica,Arial,sans-serif',
    fontWeight: '600',
    fontSize: '28px',
    marginBottom: '0'
}
export default HomePage;