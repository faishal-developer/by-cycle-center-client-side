import { Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SingleService from './SingleService';

const Service = ( props ) => {
    const [cycles, setCycles] = useState( [] )

    useEffect( () => {
        fetch( 'https://hidden-forest-46700.herokuapp.com/bycycles' )
            .then( res => res.json() )
            .then( data => setCycles( data ) )
            .catch( e => alert( e.message ) )
    }, [] )
    console.log( cycles );
    return (
        <Container sx={{ my: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', m: 3, textAlign: 'center' }}>By-Cycles</Typography>

            <Grid container spacing={2}>
                {cycles.map( ( cycle, i ) => {
                    if ( props.home ) {
                        if ( i <= 5 ) {
                            return <SingleService
                                key={i}
                                cycle={cycle}
                                shortdes={props.home}
                            />
                        }
                    } else {
                        return <SingleService
                            key={i}
                            cycle={cycle}
                            shortdes={false}
                        />
                    }
                } )}
            </Grid>
        </Container>
    );
};

export default Service;