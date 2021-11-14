import { Button, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

const MakeAdmin = () => {
    let [user, setUser] = useState()


    const handleChange = ( e ) => {
        let changedUser = { ...user };
        changedUser[e.target.name] = e.target.value
        setUser( changedUser )
    }

    const handleSubmit = ( e ) => {
        e.preventDefault()
        e.target.reset()
        fetch( `https://hidden-forest-46700.herokuapp.com/users`, {
            method: "PUT",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify( { email: user.email } )
        } )
            .then( res => res.json() )
            .then( data => alert( 'admin added successfully' ) )
            .catch( e => alert( e.message ) )
    }
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={2} >
                </Grid>
                <Grid item sx={{ marginTop: "10%", px: 5 }} xs={9} lg={6}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: "primary.main" }}>Make Another One Admin</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            required
                            onClick={handleChange}
                            sx={{ width: '100%', my: 1 }}
                            label="Name"
                            name="name"
                            variant="filled"
                        /><br />
                        <TextField
                            required
                            onClick={handleChange}
                            sx={{ width: '100%', my: 1 }}
                            name="email"
                            label="Email"
                            variant="filled"
                        />
                        <br />
                        <Button sx={{ width: '100%', my: 1 }} variant="contained" type="submit">Make An Admin</Button>
                    </form>
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MakeAdmin;