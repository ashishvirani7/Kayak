import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import HomePage from './components/HomePage';
import AdminLogin from './components/AdminLogin';
import AdminHome from './components/AdminHome';

const  App = () => {
    return(
      <div>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/hotels" component={HomePage}/>
        <Route exact path="/cars" component={HomePage}/>
        <Route exact path="/flights" component={HomePage}/>
        <Route exact path="/adminLogin" component={AdminLogin}/>
        <Route exact path="/adminHome" component={AdminHome}/>
        <Route exact path="/adminHotels" component={AdminHome}/>
        <Route exact path="/adminFlights" component={AdminHome}/>
        <Route exact path="/adminCars" component={AdminHome}/>
      </div>);
}

export default App;

