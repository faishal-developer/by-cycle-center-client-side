import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Cart = ( props ) => {
    const { orders, price, tax, shipt } = props
    // const { isLoading, FetchOrder, existingOrders } = useFindOrder()

    // useEffect( () => {
    //     FetchOrder()
    // }, [isLoading] )

    return (
        <Paper variant="outlined" sx={{ height: '200px', width: '200px', mx: 'auto', mb: '10vh' }} square>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom component="div">
                    Orders Count: {orders?.length}
                </Typography>
                <Typography variant="subtitle1" gutterBottom component="div">
                    Amount: {price} $
                </Typography>
                <Typography variant="subtitle1" gutterBottom component="div">
                    Tax: {tax} $
                </Typography>
                <Typography variant="subtitle1" gutterBottom component="div">
                    Shipting Cost: {shipt} $
                </Typography>
                <hr />
                <Typography sx={{ color: 'primary.main' }} variant="subtitle1" gutterBottom component="div">
                    Total Amount: {price + tax + shipt} $
                </Typography>
            </Box>
        </Paper>
    );
};

export default Cart;