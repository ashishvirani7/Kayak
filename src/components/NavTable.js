import React,{Component} from 'react';
import IconHotel from '../icons/IconHotel';
import IconFlight from '../icons/IconFlight';
import IconCar from '../icons/IconCar';

class NavTable extends Component{
    render() {
        return(
            <div>
                <div className="col-md-12">
                    <div className="row" style={navbar}>
                        <div className="col-md-4" >   
                            <div className="row" style={navitem1}>
                                <div className="col-md-3 col-md-offset-2" style={rstyle}>
                                    <IconHotel width="32" height="32"/>
                                </div>
                                <div className="col-md-3" style={rstyle}>
                                    HOTELS
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4" >
                            <div className="row" style={navitem2}>
                                <div className="col-md-3 col-md-offset-2" style={rstyle}>
                                    <IconFlight width="32" height="32"/>
                                </div>
                                <div className="col-md-3" style={rstyle}>
                                    FLIGHTS
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="row" style={navitem3}>
                                <div className="col-md-3 col-md-offset-2" style={rstyle}>
                                    <IconCar width="32" height="32"/>
                                </div>
                                <div className="col-md-3" style={rstyle}>
                                    CARS
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const navbar={
    marginLeft:'200px',
    marginRight:'200px',
    height:'50px'
}

const navitem1={
    marginLeft:'10px',
    backgroundColor:'white',
    width:'100%',
    height:'40px',
    color:'black',
    fontSize:'12px',
    fontFamily:'"HelveticaNeue-Bold",Helvetica,Arial,sans-serif',
    fontWeight: '600',
    letterSpacing:'.03em',
    lineHeight: 'inherit',
    marginTop:'8px',
    cursor:'pointer'
}

const navitem2={
    backgroundColor:'white',
    width:'100%',
    height:'40px',
    color:'black',
    fontSize:'12px',
    fontFamily:'"HelveticaNeue-Bold",Helvetica,Arial,sans-serif',
    fontWeight: '600',
    letterSpacing:'.03em',
    lineHeight: 'inherit',
    marginTop:'8px',
    cursor:'pointer'
}

const navitem3={
    marginLeft:'-40px',
    backgroundColor:'white',
    width:'100%',
    height:'40px',
    color:'black',
    fontSize:'12px',
    fontFamily:'"HelveticaNeue-Bold",Helvetica,Arial,sans-serif',
    fontWeight: '600',
    letterSpacing:'.03em',
    lineHeight: 'inherit',
    marginTop:'8px',
    cursor:'pointer'
}

const rstyle={
    marginTop:'12px'
}
export default (NavTable);