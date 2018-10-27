import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';

import Registration from './components/authorization/Registration';
import Login from './components/authorization/Login';
import Splash from './components/layout/Splash';
import SuccessReg from './components/layout/SuccessReg';
import Feed from './components/layout/Feed';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  const decoded = jwt_decode(localStorage.jwtToken);

  store.dispatch(setCurrentUser(decoded));


}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
        <div className="App">
          <Route exact path="/" component = {Splash}/>
          <Route exact path="/register" component = {Registration}/>
          <Route exact path="/successreg" component = {SuccessReg}/>
          <Route exact path="/feed" component = {Feed}/>
          <Route exact path="/login" component = {Login}/>
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
