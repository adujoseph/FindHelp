 import React, { useEffect , useState, Component} from 'react';
// import Auth from './components/auth/Auth';
// import firebaseApp from './config/firebase'
// import { Redirect } from 'react-router-dom';
// import Main from './components/main/Main';

// const PrivateRoute = (props:Component) => {

//     const [currentUser, setCurrentUser] = useState< any | null >({});

//     useEffect(()=>{
//         authListerner();
//     }, [])

//     const authListerner = () => {
//         firebaseApp.auth().onAuthStateChanged((user) => {
//             if(user){
//                 setCurrentUser(user)
//             }else {
//                 setCurrentUser(null)
//             }
//         })
//     }

//     return(   
//             <div>
//                 {currentUser ? (<Main />) : (<Auth />)}
//             </div>
//     )
// }




// firebaseApp.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       // User is signed in.
//       console.log(user)
//       setCurrentUser(user)
//       // var displayName = user.displayName;
//       // var email = user.email;
//       // var emailVerified = user.emailVerified;
//       // var photoURL = user.photoURL;
//       // var isAnonymous = user.isAnonymous;
//       // var uid = user.uid;
//       // var providerData = user.providerData;
//       // ...
//     } else {
//       // User is signed out.
//       // ...
//       setCurrentUser(null)
//     }
//   });
// :
//             <Redirect to='/' />
    
// import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
// import { AuthContext } from './Context';

// const PrivateRoute = ({ component<RouteComponentProps>, ...rest }) => {
//     const { currentUser } = useContext(AuthContext);
//     return (
//         <Route
//             {...rest}
//             render={routeProps =>
//                 !!currentUser ? (
//                     <RouteComponent />
//                 ) : (
//                         <Redirect to={'/login'} />
//                     )
//             }
//         />

//     )
// }
// export default PrivateRoute;