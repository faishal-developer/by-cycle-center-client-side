import { CircularProgress } from '@mui/material';
import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { MyContext } from './AuthProvider';

function PrivateRoute( { children, ...rest } ) {
    let { user, isLoading } = useContext( MyContext );
    if ( isLoading ) {
        return <CircularProgress sx={{ px: '40%', py: '20%' }} />
    }
    return (
        <Route
            {...rest}
            render={( { location } ) =>
                user?.displayName ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute