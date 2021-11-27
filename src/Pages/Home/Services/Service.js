import { Button, Container, Grid, Skeleton, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useHandleSearch from '../../Hooks/usehandleSearch';
import SkeletonComponent from '../../shared/Skeleton/Skeleton';
import SingleService from './SingleService';

const Service = ( props ) => {
    const [cycles, setCycles] = useState( [] )
    const [searchTerm, setSearchTerm] = useState( '' )
    const { searchedCycle, setSearchedCycle, handleSearch } = useHandleSearch()
    const [isLoading, setIsLoading] = useState( true )

    const handleChange = ( e ) => {
        let newSearchTerm = e.target.value
        setSearchTerm( newSearchTerm )
        console.log( searchTerm );
    }



    useEffect( () => {
        fetch( 'http://localhost:5000/bycycles' )
            .then( res => res.json() )
            .then( data => {
                setCycles( data )
                setSearchedCycle( data )
                setIsLoading( false )
            } )
            .catch( e => alert( e.message ) )
            .finally( () => {
                console.log( 'working' )

            } )
    }, [] )
    if ( isLoading && cycles.length < 1 ) {
        return <SkeletonComponent service={true} />
    }

    return (
        <Container sx={{ my: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', m: 3, textAlign: 'center' }}>By-Cycles</Typography>
            {
                !props.home && (
                    <form
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        onSubmit={( e ) => handleSearch( e, cycles, searchTerm )}
                    >
                        <TextField
                            required
                            onChange={handleChange}
                            sx={{ width: '50%', my: 1 }}
                            label="Search"
                            name="name"
                            variant="filled"
                        />
                        <Button type="submit" sx={{ py: 2, px: 3 }} variant="contained">Search</Button>
                    </form>
                )
            }
            <Grid container spacing={2}>
                {searchedCycle.map( ( cycle, i ) => {
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