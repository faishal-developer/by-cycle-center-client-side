import { Button, Typography } from '@mui/material';
import React from 'react';
import './Banner.css'
import { Link } from 'react-router-dom'

const Banner = () => {
    return (
        <div className="banner-background-image">
            <div style={{ textAlign: 'center' }}>
                <Typography sx={{ color: 'white', fontWeight: 'bold', textAlign: "center" }} variant="h5"><i>Already Have An By-cycle ?</i></Typography>
                <Typography sx={{ color: 'white', fontWeight: 'bold', textAlign: "center", mb: 1 }} variant="h3">Repair It Or Buy New One</Typography>
                <Link to='/products'><Button variant="contained" sx={{ px: 2, py: 1 }}>BUY AN PRODUCTS</Button></Link>
            </div>
        </div>
    );
};

export default Banner;