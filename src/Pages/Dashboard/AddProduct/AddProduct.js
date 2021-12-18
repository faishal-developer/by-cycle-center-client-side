import { Button, Input, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import React, { useState } from 'react';
// import { useHistory } from 'react-router';
import useAlert from '../../Hooks/useAlert';
import CustomizedDialogs from '../../Dialog/Dialog';

const AddProduct = () => {
    const [cycle, setCycle] = useState({})
    // const history = useHistory()
    const { muiAlert } = useAlert()
    const [alertNow, setAlertNow] = useState({})
    const [open, setOpen] = React.useState([false, '', '']);

    const handleClose = () => {
        setOpen(false, '');
    };

    const handleChange = (e, isFile) => {
        let changedCycle = { ...cycle };
        if (isFile) {
            changedCycle[e.target.name] = e.target.files[0]
            setCycle(changedCycle)
            return
        }
        changedCycle[e.target.name] = e.target.value
        setCycle(changedCycle)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!cycle.image) {
            setOpen([true, 'Error', 'Please Add An Image'])
            return
        }
        const formData = new FormData();
        formData.append('currency', '$')
        formData.append('imgb24', true)
        for (let x in cycle) {
            formData.append(x, cycle[x])
        }
        fetch('https://hidden-forest-46700.herokuapp.com/bycycles', {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    let alertObject = { isTrue: true, message: 'Product added' }
                    setAlertNow(alertObject)
                } else {
                    let alertObject = { isTrue: false, message: 'product not added' }
                    setAlertNow(alertObject)
                }
                //history.push( '/products' )
            })
            .catch(e => {
                let alertObject = { isTrue: false, message: e.message }
                setAlertNow(alertObject)
            })
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
                        <Input
                            accept="image/*"
                            id="contained-button-file"
                            type="file"
                            name='image'
                            onChange={(e) => handleChange(e, true)}
                        />
                        <br />
                        <Button sx={{ width: '100%', my: 1 }} variant="contained" type="submit">Add An Product</Button>
                    </form>
                    {
                        alertNow?.message && muiAlert(alertNow)
                    }
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
            {open && <CustomizedDialogs handleClose={handleClose} open={open[0]} heading={open[1]} description={open[2]} />}

        </Box>
    );
};

export default AddProduct;