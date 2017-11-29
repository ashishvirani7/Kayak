import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import IconArrow from '../icons/IconArrow';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import * as API from '../api/API';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class FlightSearch extends Component{
    state = {
        valueClass: 'Economy',
        valueTraveler: 1
    }

    handleChangeClass = (event, index, valueClass) => this.setState({...this.state,valueClass});
    handleChangeTraveler = (event, index, valueTraveler) => this.setState({...this.state,valueTraveler});
    render() {
        return(
            <div className="col-md-12">
                <div className="row" style={rstyle}>
                    <div className="col-md-2" >
                        <div className="row" style={divstyle}>
                            <TextField style={istyle}
                                id="source"
                                hintText="From Where?"
                            />
                        </div>
                    </div>
                    <div className="col-md-2" >
                        <div className="row" style={divstyle}>
                            <TextField style={istyle}
                                id="destination"
                                hintText="To Where?"
                            />
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="row">
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
                            <div className="col-md-3">
                                <div className="row" style={divstyle}>
                                    <SelectField
                                        value={this.state.valueClass}
                                        onChange={this.handleChangeClass}
                                        style={istyle}
                                        >
                                        <MenuItem value={'Economy'} primaryText="Economy" />
                                        <MenuItem value={'Business'} primaryText="Business" />
                                        <MenuItem value={'First'} primaryText="First" />
                                    </SelectField>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="row" style={divstyle}>
                                    <SelectField
                                        value={this.state.valueTraveler}
                                        onChange={this.handleChangeTraveler}
                                        style={istyle}
                                        >
                                        <MenuItem value={1} primaryText="1 traveler" />
                                        <MenuItem value={2} primaryText="2 travelers" />
                                        <MenuItem value={3} primaryText="3 travelers" />
                                        <MenuItem value={2} primaryText="4 travelers" />
                                        <MenuItem value={3} primaryText="5 travelers" />
                                        <MenuItem value={2} primaryText="6 travelers" />
                                        <MenuItem value={3} primaryText="7 travelers" />
                                        <MenuItem value={2} primaryText="8 travelers" />
                                        <MenuItem value={3} primaryText="9 travelers" />
                                        <MenuItem value={2} primaryText="10 travelers" />
                                    </SelectField>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1">
                        <div className="row" style={divstyle}>
                            <button style={btnstyle}
                                id="destbtn"
                                hintText="Where"
                                onClick={()=>{
                                    var data ={
                                        origin:     document.getElementById('source').value,
                                        destination:document.getElementById('destination').value,
                                        arrival_date:     document.getElementById('toDate').value,
                                        departure_date:   document.getElementById('fromDate').value,
                                        class:      this.state.valueClass,
                                        no_of_traveler:this.state.valueTraveler,
                                    }
                                    if(data.origin && data.destination && data.arrival_date && data.departure_date){
                                        console.log(data);
                                        API.doFlightSearch(data)
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
                            <IconArrow color="white"/> 
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

const rstyle={
    marginTop:'50px',
    marginRight:'15px',
    marginLeft:'15px'
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
    borderColor:'black'
}

const btnstyle={
    border:'none',
    fontSize:'16px',
    height:'50px',
    width:'80%',
    marginLeft:'5px',
    marginRight:'5px',
    backgroundImage: 'linear-gradient(135deg,#ff690f 0%,#ff4f3a 100%)',
}
const divstyle={
    marginLeft:'-20px',
    marginRight:'-2px'
}
export default FlightSearch;