import { Grid } from '@mui/material';
import React from 'react';

const Footer = () => {
    return (
        <Grid container sx={{ display: 'flex', justifyContent: 'space-between', p: 3, bgcolor: "#141616", borderTop: '1px solid' }} spacing={2}>
            <div >
                <span style={{ color: 'grey' }}>Copyright &copy; 2021</span>
            </div>
            <div >
                <span style={{ color: 'grey' }}>All Right Reserved-by mohammed faishal</span>
            </div>
        </Grid>
    );
};

export default Footer;