import firebase from "firebase";
import 'firebase/auth'

const config = {
   
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket:process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_API_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

const FirebaseApp = firebase.initializeApp(config);
let nextApi = firebase.initializeApp(config, 'nextapi-67649');

export const fireMethods = {
    dataBase: nextApi.firestore(),
    auth: nextApi.auth(),
}



// export const authRes = async () => {
//     await firebase.auth().onAuthStateChanged((user) => {
//     return user
//     //   if (user) {
//     //     setCurrentUser(user)
//     //     console.log('from the Auth State Change',user['uid']);
//     //     postUser(user['uid']);
//     //   } else {
//     //     setCurrentUser(null)
//     //   }
//     })
//   }

export default FirebaseApp;