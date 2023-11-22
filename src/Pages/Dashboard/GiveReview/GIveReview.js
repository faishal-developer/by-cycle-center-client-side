import { Button, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useContext } from 'react';
import CustomizedDialogs from '../../Dialog/Dialog';
import { MyContext } from '../../Hooks/AuthProvider';

const GIveReview = () => {
    const [userReview, setUserReview] = useState()
    const { user } = useContext(MyContext)
    const [open, setOpen] = React.useState([false, '', '']);

    const handleClose = () => {
        setOpen(false, '');
    };

    const handleChange = (e) => {
        let changedReview = { ...userReview };
        changedReview[e.target.name] = e.target.value
        setUserReview(changedReview)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (Number(userReview.Review) >= 6 || Number(userReview.Review) <= 0) {
            setOpen([true, 'Error', 'Give Number between 1 to 5'])

            return
        }
        let newReview = { ...userReview }
        newReview.name = user?.displayName
        console.log(newReview)
        fetch('https://by-cycle-center-faishal-developer.vercel.app/reviews', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newReview)
        })
            .then(res => res.json())
            .then(data => setOpen([true, 'successfull', 'review added']))
            .catch(e => setOpen([true, 'Error', e.message]))
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
            {open && <CustomizedDialogs handleClose={handleClose} open={open[0]} heading={open[1]} description={open[2]} />}

        </Box>
    );
};

export default GIveReview;