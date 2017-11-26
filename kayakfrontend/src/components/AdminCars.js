import React,{Component} from 'react';
import Divider from 'material-ui/Divider'
import CryptoJS from 'crypto-js';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeValueAdmin} from '../actions/adminLoginAction';

import {withRouter} from 'react-router-dom';

import * as API from '../api/API';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import IconArrow from '../icons/IconArrow';
import SelectField from 'material-ui/SelectField';


const Car_Types=[
    {
        "name":"Hatchback"
    },
    {
        "name":"Sedan"
    },
    {
        "name":"MPV"
    },
    {
        "name":"SUV"
    },
    {
        "name":"Crossover"
    },
    {
        "name":"Coupe"
    },
    {
        "name":"Convertible"
    }
];

const carTypes=[];
Car_Types.map(type=>{
    carTypes.push(<MenuItem value={type.name} key={type.name} primaryText={type.name} />);
})

class AdminCars extends Component{
    constructor(props) {
        super(props);
        this.state = {
            carName:"",
            carType:"",
            modelName:"",
            carRentalPrice:""
        };
      }

      handleNameChange = (event, index, value) => {
        this.setState({...this.state,carName:event.target.value});
      };
      handleTypeChange = (event, index, value) => {
        this.setState({...this.state,carType:value});
      };
      handleModalNameChange = (event, index, value) => {
        this.setState({...this.state,modelName:event.target.value});
      };
      handleRentalPriceChange = (event, index, value) => {
        this.setState({...this.state,carRentalPrice:event.target.value});
      };
      submitCar(){

      }

    render(){
        return(
            <div>
                <h1 style={{color:"skyblue"}}>Cars Live Here </h1>
                <div className="row" style={divstyle}>
                    <TextField style={istyle}
                        id="car_name"
                        hintText="Car Name"
                        onChange={this.handleNameChange}
                    />
                </div>
                <div className="row" style={divstyle}>
                    <SelectField
                        value={this.state.carType}
                        onChange={this.handleTypeChange}
                        floatingLabelText="Car Type"
                        maxHeight={200}  
                    >
                        {carTypes}
                    </SelectField>
                </div>
                <div className="row" style={divstyle}>
                    <TextField style={istyle}
                        id="model_name"
                        hintText="Model Name"
                        onChange={this.handleModalNameChange}
                    />
                </div>
                <div className="row" style={divstyle}>
                    <TextField style={istyle}
                        id="rental_price"
                        hintText="CarRental Price"
                        onChange={this.handleRentalPriceChange}
                    />
                </div>
                <br/>
                <div className="row" style={divstyle}>
                    <button style={btnstyle}
                        id="destbtn"
                        onClick={()=>{this.submitCar()}}
                    >
                    Submit
                    </button>
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
    height:'50px',
    width:'100%',
    backgroundColor:'white',
    marginRight:'5px',
    barderSize:'1px',
    borderColor:'black',
    
}

const roomStyle={
    fontSize:'16px',
    height:'50px',
    width:'100%',
    backgroundColor:'white',
    marginRight:'5px',
    barderSize:'1px',
    borderColor:'black',
    marginTop:"20px"
}

const btnstyle={
    border:'none',
    color:"white",
    fontSize:'16px',
    height:'50px',
    width:'100%',
    backgroundColor:'green',
    marginLeft:'5px',
    marginRight:'5px'
}
const divstyle={
    marginLeft:'7px',
    marginRight:'-2px',
    width:"300px"
}


function mapStateToProps(state){
    return{
        adminLoginData:state.adminLoginData
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeValueAdmin
        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(AdminCars));
