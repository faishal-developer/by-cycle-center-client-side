import { Button, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import useAlert from '../../Hooks/useAlert';

const MakeAdmin = () => {
    let [user, setUser] = useState()
    const [alertNow, setAlertNow] = useState( {} )
    const { muiAlert } = useAlert()

    const handleChange = ( e ) => {
        let changedUser = { ...user };
        changedUser[e.target.name] = e.target.value
        setUser( changedUser )
    }



    const handleSubmit = ( e ) => {
        e.preventDefault()
        console.log( user )
        fetch( `https://by-cycle-center-faishal-developer.vercel.app/users`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { email: user.email } )
        } )
            .then( res => res.json() )
            .then( data => {
                console.log( data );
                if ( data.modifiedCount === 1 ) {
                    let alertObject = { isTrue: true, message: 'admin added' }
                    setAlertNow( alertObject )
                } else {
                    let alertObject = { isTrue: false, message: 'user not exist or admin added already' }
                    setAlertNow( alertObject )
                }
            } )
            .catch( e => {
                let alertObject = { isTrue: false, message: e.message }
                setAlertNow( alertObject )
            } )
        e.target.reset()
    }
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={2} >
                </Grid>
                <Grid item sx={{ marginTop: "10%", px: 5 }} xs={9} lg={6}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: "primary.main" }}>Make User to Admin</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            required
                            onChange={handleChange}
                            sx={{ width: '100%', my: 1 }}
                            label="Name"
                            name="name"
                            variant="filled"
                        /><br />
                        <TextField
                            required
                            onChange={handleChange}
                            sx={{ width: '100%', my: 1 }}
                            name="email"
                            label="Email"
                            variant="filled"
                        />
                        <br />
                        <Button sx={{ width: '100%', my: 1 }} variant="contained" type="submit">Make An Admin</Button>
                    </form>
                    {
                        alertNow?.message && muiAlert( alertNow )
                    }
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MakeAdmin;