import React, { useEffect, useState } from 'react';
import './App.css';
import Main from './components/main/Main';
import Auth from './components/auth/Auth';
import Header from './components/header-footer/Header';
import Footer from './components/header-footer/Footer';
import { BrowserRouter as Router } from "react-router-dom";
import firebaseApp, {fireMethods} from './config/firebase';
import {
 saveUser,
 authListerner 
} from './api/api';



const { auth } = fireMethods;


function App() {

  const [currentUser, setCurrentUser] = useState<any | null>({});
  let unsubscribeFromAuth = null

  useEffect(() => {
    // (async () => {
    //   unsubscribeFromAuth = auth.onAuthStateChanged(user => {
    //     setCurrentUser(user)
    //   })
    // })()
   authRes();
  }, [])

  const authRes = async () => {

    // const userObj :any =  await authListerner();
    // if(userObj){
    //   setCurrentUser(userObj)
    //   console.log('from the Auth State Change',userObj['uid']);
    // } else {
    //   setCurrentUser(null)
    // }

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
  const postUser = async (s: String) => {
    await saveUser(s);
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