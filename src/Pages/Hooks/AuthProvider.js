import React from 'react';
import useFireBase from './useFireBase';


export const MyContext = React.createContext();


const AuthProvider = ( props ) => {
    const firebase = useFireBase()
    return (
        <MyContext.Provider value={firebase}>
            {props.children}
        </MyContext.Provider>
    );
};

export default AuthProvider;