import { Button, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

const AddProduct = () => {
    const [cycle, setCycle] = useState( {} )
    const history = useHistory()

    const handleChange = ( e ) => {
        let changedCycle = { ...cycle };
        changedCycle[e.target.name] = e.target.value
        setCycle( changedCycle )
    }

    const handleSubmit = ( e ) => {
        e.preventDefault()
        let newCycle = { ...cycle }
        newCycle.currency = '$'
        setCycle( newCycle )
        fetch( 'https://hidden-forest-46700.herokuapp.com/bycycles', {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify( newCycle )
        } )
            .then( res => res.json() )
            .then( data => {
                alert( 'added product successfully' )
                history.push( '/products' )
            } )
            .catch( e => alert( e.message ) )
        e.target.reset()
    }
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                </Grid>
                <Grid item sx={{ marginTop: "5%", px: 5 }} xs={9} lg={5}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: "primary.main" }}>Add An Product</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            onChange={handleChange}
                            required
                            sx={{ width: '100%', my: 1 }}
                            label="Product Name"
                            name="productBrand"
                            variant="filled"
                        /><br />
                        <TextField
                            onChange={handleChange}
                            required
                            sx={{ width: '100%', my: 1 }}
                            label="Product Price"
                            name='price'
                            variant="filled"
                        />
                        <TextField
                            onChange={handleChange}
                            required
                            sx={{ width: '100%', my: 1 }}
                            label="Product Image Link"
                            name="image"
                            variant="filled"
                        />
                        <TextareaAutosize
                            onChange={handleChange}
                            required
                            maxRows={4}
                            aria-label="maximum height"
                            placeholder="Give an description"
                            name="description"
                            style={{ width: '100%', height: '80px' }}
                        />
                        <br />
                        <Button sx={{ width: '100%', my: 1 }} variant="contained" type="submit">Add An Product</Button>
                    </form>
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AddProduct;