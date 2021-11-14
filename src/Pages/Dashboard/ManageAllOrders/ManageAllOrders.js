import React, { useEffect, useState } from 'react';
import SingleOrders from './SingleOrders';

const ManageAllOrders = () => {
    const [orders, setOrders] = useState( [] )

    useEffect( () => {
        fetch( 'https://hidden-forest-46700.herokuapp.com/orders' )
            .then( res => res.json() )
            .then( data => setOrders( data ) )
            .catch( e => alert( e.message ) )
    }, [] )
    return (
        <div>
            {
                orders?.map( ( order, i ) => <SingleOrders admin={true} order={order} key={i} /> )
            }
        </div>
    );
};

export default ManageAllOrders;