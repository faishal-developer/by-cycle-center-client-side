import { Button, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { MyContext } from '../Hooks/AuthProvider';
import Footer from '../shared/Footer/Footer';
import Header from '../shared/Header/Header';
import './login.css'


const Login = () => {
    const [newUser, setNewUser] = useState( {} )
    const { signInWithPassword } = useContext( MyContext )
    const history = useHistory();
    const location = useLocation()

    const handleChange = ( e ) => {
        let changedUser = { ...newUser };
        changedUser[e.target.name] = e.target.value
        setNewUser( changedUser )
    }

    const handleSubmit = ( e ) => {
        e.preventDefault()
        let url = location?.state?.from?.pathname || '/home'
        console.log( url );
        signInWithPassword( newUser.email, newUser.password, history, url )
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
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: "primary.main" }}>Please Login</Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                onChange={handleChange}
                                required
                                type='email'
                                sx={{ width: '100%', my: 1, color: 'brown' }}
                                label="email"
                                name="email"
                                variant="filled"
                            /><br />
                            <TextField
                                onChange={handleChange}
                                required
                                type="password"
                                name="password"
                                sx={{ width: '100%', my: 1 }}
                                label="password"
                                variant="filled"
                            />
                            <br />
                            <Button type="submit" sx={{ width: '100%', my: 1 }} variant="contained">Login</Button>
                        </form>
                        Not Registered Yet ? Go to <Link style={{ color: 'blue', textDecoration: 'underline' }} to='/register'>Register Page</Link> .
                    </Grid>
                    <Grid item xs={1}>
                    </Grid>
                </Grid>
            </Box>
            <Footer />
        </div>
    );
};

export default Login;