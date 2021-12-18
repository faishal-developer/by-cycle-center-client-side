import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useHandleSearch from '../../Hooks/usehandleSearch';
import SkeletonComponent from '../../shared/Skeleton/Skeleton';
import SingleService from './SingleService';
import CustomizedDialogs from '../../Dialog/Dialog';
import ContinuousSlider from './Slider';

const Service = (props) => {
    const [cycles, setCycles] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const { value, handleSliderChange, finalCycles, setSearchedCycle, handleSearch } = useHandleSearch()
    const [isLoading, setIsLoading] = useState(true)
    const [open, setOpen] = React.useState([false, '']);

    const handleClose = () => {
        setOpen(false, '');
    };
    console.log(value);
    const handleChange = (e) => {
        let newSearchTerm = e.target.value
        setSearchTerm(newSearchTerm)
        console.log(searchTerm);
    }

    useEffect(() => {
        fetch('https://hidden-forest-46700.herokuapp.com/bycycles')
            .then(res => res.json())
            .then(data => {
                setCycles(data)
                setSearchedCycle(data)
                setIsLoading(false)
            })
            .catch(e => {
                setOpen([true, e.message])
            })
            .finally(() => {
                console.log('')
            })
    }, [])
    if (isLoading && cycles.length < 1) {
        return (
            <>
                <SkeletonComponent service={true} />
                {open && <CustomizedDialogs handleClose={handleClose} open={open[0]} heading="Error" description={open[1]} />}
            </>
        )
    }
    console.log(finalCycles);
    return (
        <Container sx={{ my: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', m: 3, textAlign: 'center' }}>By-Cycles</Typography>
            {
                !props.home && (
                    <div>
                        <form
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            onSubmit={(e) => handleSearch(e, cycles, searchTerm)}
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
                        <ContinuousSlider value={value} handleChange={handleSliderChange} />
                    </div>
                )
            }
            <Grid container spacing={2}>
                {finalCycles.map((cycle, i) => {
                    if (props.home) {
                        if (i <= 5) {
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
                })}
            </Grid>
        </Container>
    );
};

export default Service;