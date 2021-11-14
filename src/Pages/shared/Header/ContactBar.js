import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import favicon from '../../../images/favicon.ico'
import { Typography } from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import './Header.css'

const ContactBar = () => {
    return (
        <Box sx={{ flexGrow: 1, p: 2, bgcolor: '#181A1B' }}>
            <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Grid item sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} xs={12} md={12} lg={4}>
                    <img width='80px' src={favicon} alt="favicon" />
                    <Typography
                        variant="caption"
                        display='inline'
                        sx={{
                            color: 'black',
                            fontWeight: 'bold',
                            fontSize: '22px',
                        }}>
                        BYCYCLE<span style={{ color: "#FF5938" }}>CENTER</span>
                    </Typography>
                </Grid>
                <Grid item sx={{ display: { xs: 'none', lg: 'flex' } }} sm={8}>
                    <div className="contact-bar-right-side">
                        <div className="abc">
                            <LocalPhoneIcon />
                        </div>
                        <div>
                            <span className="abc-span">+8801688-422699</span><br />
                            <span className="abc-span">+8801622-50000</span>
                        </div>
                    </div>
                    <div className="contact-bar-right-side">
                        <div className="abc">
                            <EmailTwoToneIcon />
                        </div>
                        <div>
                            <span className="abc-span">mdfaishal329@gmail.com</span><br />
                            <span className="abc-span">foysal.professional@gmail.com</span>
                        </div>
                    </div>
                    <div className="contact-bar-right-side">
                        <div className="abc">
                            <EmailTwoToneIcon />
                        </div>
                        <div>
                            <span className="abc-span">Gulistan, Dhaka</span><br />
                            <span className="abc-span">mirsorok,block-d,AB PLAZA</span>
                        </div>
                    </div>

                </Grid>
            </Grid>
        </Box>
    );
};

export default ContactBar;