import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../shared/Footer/Footer';
import Header from '../shared/Header/Header';

const PageNotFound = () => {
    return (
        <Box>
            <Header />
            <Box sx={{ my: 5, mx: 'auto', textAlign: 'center' }}>
                <Typography variant="h5">!!ERROR 404!!</Typography>
                <Typography variant="h3">Page Not Found</Typography>
                <Link style={{ textDecoration: 'none', color: 'white' }} to='/home'>
                    <Button variant="contained">
                        Go Back Home
                    </Button>
                </Link>
            </Box>
            <Footer />
        </Box>
    );
};

export default PageNotFound;