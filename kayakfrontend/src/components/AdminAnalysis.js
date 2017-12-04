import React, { Component } from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

import Chart from './AdminChart';
import * as API from '../api/API';
import axios from 'axios';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import {Doughnut} from 'react-chartjs-2';

var data;
class AdminAnalysis extends Component {
  constructor(){
    super();
    this.state = {
      chartHotelData:{},
      chartFlightData:{},
      chartCrData:{},
      current:"hotel"
    }
  }

	componentWillMount() {
    this.getHotelData();
    this.getFlightData();
    this.getCarData();
		setInterval(() => {
      this.getHotelData();
      this.getFlightData();
      this.getCarData();
		}, 2000);
	}


  getHotelData(){
    var self = this;
    console.log("ashish");
    axios.post('http://localhost:3001/getRevenue/tophotels',{
      "year":"2017"
    })
    .then(function (response) {
      console.log(response.data.data.label);
      self.setState({
        chartHotelData:{
          labels: response.data.data.label,
          //labels:response.data.data.label,
          datasets:[
            {
              label:'Revenue',
              data:response.data.data.values,
              backgroundColor:[
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)'
              ]
            }
          ]
        }
      });
    });
      
  }

  getFlightData(){
    var self = this;
    
    axios.post('http://localhost:3001/getRevenue/topflights',{
      "year":"2017"
    })
    .then(function (response) {
      console.log(response.data.data.label);
      self.setState({
        chartFlightData:{
          labels: response.data.data.label,
          //labels:response.data.data.label,
          datasets:[
            {
              label:'Revenue',
              data:response.data.data.values,
              backgroundColor:[
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)'
              ]
            }
          ]
        }
      });
    });
  }

    getCarData(){
      var self = this;
      
      axios.post('http://localhost:3001/getRevenue/topcars',{
        "year":"2017"
      })
      .then(function (response) {
        console.log(response.data.data.label);
        self.setState({
          chartCarData:{
            labels: response.data.data.label,
            //labels:response.data.data.label,
            datasets:[
              {
                label:'Revenue',
                data:response.data.data.values,
                backgroundColor:[
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(255, 99, 132, 0.6)'
                ]
              }
            ]
          }
        });
      });
      
  }

  handleHotelClick(){
    this.setState({...this.state,current:"hotel"})
  }
  handleFlightClick(){
    this.setState({...this.state,current:"flight"})
  }
  handleCarClick(){
    this.setState({...this.state,current:"car"})
  } 

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Graph</h2>
        </div>
        <div className="row">
          <div className="col-md-2 col-sm-2">
            <Drawer
              docked={true}
              width={200}
              open={true}
              onRequestChange={(open) => this.setState({open})}
              
              >
              <AppBar title="Analysis" />
              <MenuItem onClick={()=>this.handleHotelClick()}>Top 10 Hotel</MenuItem>
              <MenuItem onClick={()=>this.handleFlightClick()}>Top 10 Flight</MenuItem>
              <MenuItem onClick={()=>this.handleCarClick()}>Top 10 Car</MenuItem>
          </Drawer>

          </div>
          <div className="col-md-10 col-sm-2">
            {
              this.state.current === "hotel" &&
              <div>
                <Bar
                  data={this.state.chartHotelData}
                  options={{
                    title:{
                      display:this.props.displayTitle,
                      text:' '+this.props.location,
                      fontSize:25
                    },
                    legend:{
                      display:this.props.displayLegend,
                      position:this.props.legendPosition
                    }
                  }}
                />
              </div>
            }
            {
              this.state.current === "flight" &&
                <Pie
                data={this.state.chartFlightData}
                options={{
                  title:{
                    display:this.props.displayTitle,
                    text:'Largest Cities In '+this.props.location,
                    fontSize:25
                  },
                  legend:{
                    display:this.props.displayLegend,
                    position:this.props.legendPosition
                  }
                }}
              />
            }
            {
              this.state.current === "car" &&
              <div>
                
              <Doughnut
                
                data={this.state.chartCarData}
                options={{
                  title:{
                    display:this.props.displayTitle,
                    text:' '+this.props.location,
                    fontSize:25
                  },
                  legend:{
                    display:this.props.displayLegend,
                    position:this.props.legendPosition
                  }
                }}
              />
            </div>
            }
          </div>
        </div>
        
        

        {/* <div>
          <Bar
            data={this.state.chartHotelData}
            options={{
              title:{
                display:this.props.displayTitle,
                text:' '+this.props.location,
                fontSize:25
              },
              legend:{
                display:this.props.displayLegend,
                position:this.props.legendPosition
              }
            }}
          />
        </div>
        <div>
        <Pie
          data={this.state.chartFlightData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Largest Cities In '+this.props.location,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
        </div> */}
  </div>
    );
  }
}

export default AdminAnalysis;