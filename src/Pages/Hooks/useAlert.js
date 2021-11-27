import { Alert } from '@mui/material';
import React from 'react';

const useAlert = () => {


    const muiAlert = ( alertNow ) => {
        if ( alertNow?.isTrue ) {
            return <Alert severity="success">{alertNow?.message}</Alert>
        } else {
            return <Alert severity="error">{alertNow?.message}!</Alert>
        }
    }

    return {
        muiAlert
    }
};

export default useAlert;