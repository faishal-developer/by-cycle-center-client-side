import { Grid, Skeleton } from '@mui/material';
import React from 'react';

const SkeletonComponent = ( props ) => {
    return (
        <Grid sx={{ my: 5 }} container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
                {
                    props.service && (
                        <>
                            <Skeleton variant="rectangular" animation="wave" height={180} />
                            <Skeleton variant="text" animation="wave" />
                            <Skeleton variant="text" animation="wave" />
                        </>
                    )
                }
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Skeleton variant="rectangular" animation="wave" height={180} />
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" animation="wave" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                {
                    props.service && (
                        <>
                            <Skeleton variant="rectangular" animation="wave" height={180} />
                            <Skeleton variant="text" animation="wave" />
                            <Skeleton variant="text" animation="wave" />
                        </>
                    )
                }
            </Grid>
        </Grid>
    );
};

export default SkeletonComponent;