import React, {useEffect, useState} from 'react';
// import FirebaseApp from './config/firebase';


// interface AppContextInterface {
//     currentUser: string
//   }
// export const AuthContext = React.createContext<AppContextInterface | null>(null);

// export const AuthProvider =({children}: any) => {
//     const [currentUser, setCurrentUser] = useState<any>(null);

//     useEffect(() => {
//         FirebaseApp.auth().onAuthStateChanged(setCurrentUser);
//     }, []);

//     return(
//         <AuthContext.Provider
//         value={{currentUser }}
//         >
//             {children}
//         </AuthContext.Provider>
//     )
// }