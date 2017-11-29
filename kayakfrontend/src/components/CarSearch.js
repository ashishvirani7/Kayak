import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import IconArrow from '../icons/IconArrow';
import * as API from '../api/API';
import {NotificationContainer, NotificationManager} from 'react-notifications';
class CarSearch extends Component{

    render() {
        return(
            <div className="col-md-12">
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
            </div>
        )
    }
}

const rstyle={
    marginTop:'50px',
    marginRight:'15px',
    marginLeft:'15px'
}

const arrowStyle={
    marginLeft:'-5px'
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
export default CarSearch;