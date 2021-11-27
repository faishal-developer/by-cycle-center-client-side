import { Grid, Skeleton } from '@mui/material';
import React from 'react';

const SkeletonOrders = () => {
    return (
        <div>
            <Grid container sx={{ my: 3 }} spacing={2}>
                <Grid item xs={7}>
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                </Grid>
                <Grid item xs={5}>
                    <Skeleton variant="rectangular" animation="wave" height={180} />
                </Grid>
            </Grid>
            <Grid container sx={{ my: 3 }} spacing={2}>
                <Grid item xs={7}>
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                </Grid>
                <Grid item xs={5}>
                    <Skeleton variant="rectangular" animation="wave" height={180} />
                </Grid>
            </Grid>
            <Grid container sx={{ my: 3 }} spacing={2}>
                <Grid item xs={7}>
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                </Grid>
                <Grid item xs={5}>
                    <Skeleton variant="rectangular" animation="wave" height={180} />
                </Grid>
            </Grid>
        </div>
    );
};

export default SkeletonOrders;