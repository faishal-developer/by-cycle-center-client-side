import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function ActionAreaCard( props ) {
    const { productBrand, description, image, price, imgb24, currency, _id } = props.cycle
    let picture = imgb24 ? `data:image/png;base64,${image}` : image
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image={picture}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {productBrand}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {props.shortdes ? description.substring( 1, 50 ) : description}...
                        </Typography>
                        <Typography sx={{ color: "primary.main" }} gutterBottom variant="h6" component="div">
                            {currency}{price} only
                        </Typography>
                    </CardContent>
                    <CardActions>

                        <NavLink to={`/products/${_id}`}><Button variant="contained" size="small">Purchase</Button></NavLink>
                    </CardActions>
                </CardActionArea>
            </Card>
        </Grid>

    );
}

//error in 32 line button