import React, { useEffect, useState } from 'react';
import './App.css';
import Main from './components/main/Main';
import Auth from './components/auth/Auth';
import Header from './components/header-footer/Header';
import Footer from './components/header-footer/Footer';
import { BrowserRouter as Router } from "react-router-dom";
import firebaseApp from './config/firebase';



function App() {

  const [currentUser, setCurrentUser] = useState<any | null>({});
  

  useEffect(() => {
   authRes();
  }, [])

  const authRes = async () => {

    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user)
        console.log('from the Auth State Change',user['uid']);
        // postUser(user['uid']);
      } else {
        setCurrentUser(null)
      }
    })
  }

  return (
    <div>
      <Router >
        <Header user={currentUser} />
        <div style={{ minHeight: '90vh' }}>
          {currentUser ? (<Main  user={currentUser} />) :<Auth />}
        </div>
        <Footer />
      </Router>
    </div>

  );
}

export default App;