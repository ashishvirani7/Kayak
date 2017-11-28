import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import HomePage from './components/HomePage';
import AccountPage from './components/AccountPage';
import {NotificationContainer} from 'react-notifications';
import AdminLogin from './components/AdminLogin';
import AdminHome from './components/AdminHome';

import AuthorizedRoute from './components/AuthorizedRoute';
import UnAuthorizedRoute from './components/UnAuthorizedRoute';

const  App = () => {
    return(
      <div>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/hotels" component={HomePage}/>
        <Route exact path="/cars" component={HomePage}/>
        <Route exact path="/flights" component={HomePage}/>
        <Route exact path="/account" component={AccountPage}/>
        <Route exact path="/history" component={AccountPage}/>
        <Route exact path="/payment-methods" component={AccountPage}/>
        <Route exact path="/adminLogin" component={AdminLogin}/>
        <Route exact path="/adminHome" component={AdminHome}/>
        <Route exact path="/adminHotels" component={AdminHome}/>
        <Route exact path="/adminFlights" component={AdminHome}/>
        <Route exact path="/adminCars" component={AdminHome}/>
        <Route exact path="/showHotels" component={AdminHome}/>
        <Route exact path="/showFLights" component={AdminHome}/>
        <Route exact path="/showCars" component={AdminHome}/>
        <NotificationContainer/>
      </div>);
}

export default App;

