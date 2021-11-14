import { Button, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useState } from 'react';
import { MyContext } from '../Hooks/AuthProvider';
import './login.css'
import Header from '../shared/Header/Header'
import Footer from '../shared/Footer/Footer'
import { Link, useHistory } from 'react-router-dom';


const Register = () => {
    const [newUser, setNewUser] = useState( {} )
    const { createUserWithPassword } = useContext( MyContext )
    const history = useHistory()

    const handleChange = ( e ) => {
        let changedUser = { ...newUser };
        changedUser[e.target.name] = e.target.value
        setNewUser( changedUser )
    }

    const handleSubmit = ( e ) => {
        e.preventDefault()
        createUserWithPassword( newUser.email, newUser.password, newUser.name, history )
        e.target.reset()
    }

    return (
        <div>
            <Header />
            <Box className='login-background'>
                <Grid container spacing={2}>
                    <Grid item xs={3} md={6} lg={7}>
                    </Grid>
                    <Grid item sx={{ marginTop: "15%", px: 5 }} xs={7} md={5} lg={4}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: "primary.main" }}>Please Register</Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                onChange={handleChange}
                                required
                                sx={{ width: '100%', my: 1 }}
                                id="filled-required"
                                label="Name"
                                name="name"
                                variant="filled"
                            /><br />
                            <TextField
                                onChange={handleChange}
                                required
                                type='email'
                                sx={{ width: '100%', my: 1 }}
                                id="filled-required"
                                label="email"
                                name="email"
                                variant="filled"
                            /><br />
                            <TextField
                                onChange={handleChange}
                                required
                                id="filled-required"
                                sx={{ width: '100%', my: 1 }}
                                label="Password"
                                name="password"
                                type="password"
                                variant="filled"
                            />
                            <TextField
                                onChange={handleChange}
                                required
                                id="filled-required"
                                sx={{ width: '100%', my: 1 }}
                                label="Re-type Password"
                                name='password2'
                                type='password'
                                variant="filled"
                            />
                            <br />
                            <Button sx={{ width: '100%', my: 1 }} variant="contained" type="submit">Register</Button>
                        </form>
                        Already Registered ? Go To <Link style={{ color: 'blue', textDecoration: 'underline' }} to='/login'>Login Page</Link> .
                    </Grid>
                    <Grid item xs={1}>
                    </Grid>
                </Grid>
            </Box>
            <Footer />
        </div>
    );
};

export default Register;