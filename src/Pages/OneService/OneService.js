import { Button, Card, CardContent, CardMedia, Grid, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import CustomizedDialogs from '../Dialog/Dialog';
import { MyContext } from '../Hooks/AuthProvider';

const OneService = () => {
    const [product, setProduct] = useState({})
    const { productsId } = useParams()
    const [order, setOrder] = useState({})
    const { user } = useContext(MyContext)
    const history = useHistory()
    const [open, setOpen] = React.useState([false, '', '']);

    const handleClose = () => {
        setOpen(false, '');
    };

    const handleChange = (e) => {
        let newOrder = { ...order };
        newOrder[e.target.name] = e.target.value
        setOrder(newOrder)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let newOrder = { ...order };
        newOrder.userName = user.displayName;
        newOrder.email = user.email;
        newOrder.productName = product.productBrand;
        newOrder.productId = productsId;
        newOrder.image = product.image
        newOrder.price = product.price
        fetch(`https://hidden-forest-46700.herokuapp.com/orders`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newOrder)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.insertedId) {
                    setOpen([true, 'successfull', 'orderd successfully'])
                    history.push('/dashboard/payment')
                }
            })
            .catch(err => {
                setOpen([true, 'Error', err.message])
            })
            .finally(() => {
                e.target.reset()
            })
    }

    useEffect(() => {
        fetch(`https://hidden-forest-46700.herokuapp.com/bycycles/${productsId}`)
            .then(res => res.json())
            .then(data => setProduct(data))
            .catch(e => setOpen([true, 'Error', e.message]))
    }, [productsId])
    console.log(product);
    return (
        <Grid sx={{ my: 5 }} container spacing={2}>
            <Grid xs={1}></Grid>
            <Grid item xs={11} md={5}>
                <Card>
                    <CardMedia
                        component="img"
                        image={product.image}
                        width="100%"
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {product.productBrand}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {product.description}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item sx={{ ml: 5 }} xs={11} md={5}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        onChange={handleChange}
                        required
                        sx={{ width: '100%', my: 1 }}
                        id="filled-required"
                        label="district"
                        name="district"
                        variant="filled"
                    /><br />
                    <TextField
                        onChange={handleChange}
                        required
                        sx={{ width: '100%', my: 1 }}
                        id="filled-required"
                        label="upazilla"
                        name="upazilla"
                        variant="filled"
                    /><br />
                    <TextField
                        onChange={handleChange}
                        required
                        id="filled-required"
                        sx={{ width: '100%', my: 1 }}
                        label="village Or CityCode"
                        name="villageOrCityCode"
                        variant="filled"
                    />
                    <br />
                    <Button sx={{ width: '100%', my: 1 }} variant="contained" type="submit">Confirm Order</Button>
                </form>
            </Grid>
            <Grid item xs={1}>
                {open && <CustomizedDialogs handleClose={handleClose} open={open[0]} heading="Error" description={open[1]} />}
            </Grid>
        </Grid>
    );
};

export default OneService;