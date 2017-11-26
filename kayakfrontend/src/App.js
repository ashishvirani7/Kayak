import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import HomePage from './components/HomePage';
import AccountPage from './components/AccountPage';


const  App = () => {
    return(
      <div>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/hotels" component={HomePage}/>
        <Route exact path="/cars" component={HomePage}/>
        <Route exact path="/flights" component={HomePage}/>
        <Route exact path="/adminLogin" component={HomePage}/>
        <Route exact path="/account" component={AccountPage}/>
        <Route exact path="/history" component={AccountPage}/>
        <Route exact path="/payment-methods" component={AccountPage}/>
      </div>);
}

export default App;

