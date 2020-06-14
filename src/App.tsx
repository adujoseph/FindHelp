import React, { useEffect, useState } from 'react';
import './App.css';
import Main from './components/main/Main';
import Auth from './components/auth/Auth';
import Header from './components/header-footer/Header';
import Footer from './components/header-footer/Footer';
import { BrowserRouter as Router } from "react-router-dom";
import firebaseApp from './config/firebase'
// import PrivateRoute from './PrivateRoute';





function App() {

  const [currentUser, setCurrentUser] = useState<any | null>({});

  useEffect(() => {
    authListerner();
  }, [])

  const authListerner = () => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user)
      } else {
        setCurrentUser(null)
      }
    })
  }
  return (
    <div>
      <Router >
        <Header />
        <div style={{ minHeight: '90vh' }}>
          {currentUser ? (<Main />) : (<Auth />)}
        </div>
        <Footer />
      </Router>
    </div>

  );
}

export default App;