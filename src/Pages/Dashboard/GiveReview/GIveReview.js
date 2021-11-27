import { Button, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useContext } from 'react';
import { MyContext } from '../../Hooks/AuthProvider';

const GIveReview = () => {
    const [userReview, setUserReview] = useState()
    const { user } = useContext( MyContext )

    const handleChange = ( e ) => {
        let changedReview = { ...userReview };
        changedReview[e.target.name] = e.target.value
        setUserReview( changedReview )
    }

    const handleSubmit = ( e ) => {
        e.preventDefault()
        if ( Number( userReview.rating ) >= 6 || Number( userReview.rating ) <= 0 ) {
            alert( 'Give Number between 1 to 5' )
            return
        }
        let newReview = { ...userReview }
        newReview.name = user?.displayName
        console.log( newReview )
        fetch( 'http://localhost:5000/reviews', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify( newReview )
        } )
            .then( res => res.json() )
            .then( data => alert( 'review added' ) )
            .catch( e => alert( e.message ) )
        e.target.reset()
    }
    return (
        <Box >
            <Grid container spacing={2}>
                <Grid item xs={2} >
                </Grid>
                <Grid item sx={{ marginTop: "5%" }} xs={6}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: "primary.main", py: 3 }}>Say Something About Ours</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            onChange={handleChange}
                            required
                            sx={{ width: '100%', my: 1 }}
                            label="Say Something"
                            name='says'
                            variant="filled"
                        /><br />
                        <TextField
                            onChange={handleChange}
                            required
                            type="number"
                            sx={{ width: '100%', my: 1 }}
                            label="rating"
                            name="Review"
                            variant="filled"
                        />
                        <TextField
                            onChange={handleChange}
                            required
                            sx={{ width: '100%', my: 1 }}
                            label="image link"
                            name='image'
                            variant="filled"
                        />
                        <br />
                        <Button sx={{ width: '100%', my: 1 }} variant="contained" type="submit">Submit Your Review</Button>
                    </form>
                </Grid>
                <Grid item xs={3}>
                </Grid>
            </Grid>
        </Box>
    );
};

export default GIveReview;