import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import HomePage from './components/HomePage';


const  App = () => {
    return(
      <div>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/hotels" component={HomePage}/>
        <Route exact path="/cars" component={HomePage}/>
        <Route exact path="/flights" component={HomePage}/>
        
      </div>);
}

export default App;

