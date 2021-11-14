import { Grid } from '@mui/material';
import React from 'react';

const Footer = () => {
    return (
        <Grid container sx={{ p: 3, bgcolor: "#141616", borderTop: '1px solid' }} spacing={2}>
            <Grid item xs={6}>
                <span style={{ color: 'grey' }}>Copyright &copy; 2021</span>
            </Grid>
            <Grid item xs={6}>
                <span style={{ color: 'grey' }}>All Right Reserved-by mohammed faishal</span>
            </Grid>
        </Grid>
    );
};

export default Footer;