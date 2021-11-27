import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

export default function SingleOrders( props ) {



    // if ( user?.role !== 'admin' ) {
    //     return
    // }
    return (
        <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        Product Name : {props?.order?.productName}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Product Id : {props?.order?.productId}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Ordered person : {props?.order?.userName}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Product person email : {props?.order?.email}
                    </Typography>
                    {props.admin && <Button
                        onClick={() => props.handleUpdateStatus( props?.order?._id )}
                    >
                        {props?.order?.status ? <span style={{ color: 'green' }}>Shipted</span> : 'pending'}
                    </Button>}
                    <Button onClick={() => props.handleDelete( props?.order?._id )}>Delete Order</Button>
                </CardContent>
            </Box>
            <CardMedia
                component="img"
                sx={{ px: 3, width: 200, height: 150 }}
                image={props?.order?.image}
                alt="Live from space album cover"
            />
        </Card>
    );
}
