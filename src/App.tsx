import React, {useEffect, useState} from 'react';
import './App.css';
import Main from './components/main/Main';
import Auth from './components/auth/Auth';
import Header from './components/header-footer/Header';
import Footer from './components/header-footer/Footer';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import PrivateRoute from './PrivateRoute';





function App() {

  return (
    <div>
      <Router>
        <Header />
        <div style={{ minHeight: '90vh' }}>
          <Route path="/search" exact component={Main} />
          <Route path="/" exact component={Auth} />
        </div>
        <Footer />
      </Router>
    </div>

  );
}

export default App;