import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../Hooks/AuthProvider';
import SingleOrders from '../ManageAllOrders/SingleOrders';

const MyOrders = () => {
    const [myOrders, setMyOrders] = useState( [] )
    const { user, isLoading } = useContext( MyContext )

    useEffect( () => {
        fetch( 'https://hidden-forest-46700.herokuapp.com/getOrders', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify( { email: user.email } )
        } )
            .then( res => res.json() )
            .then( data => setMyOrders( data ) )
            .catch( e => alert( e.messge ) )
    }, [isLoading, user] )
    return (
        <div>
            {
                myOrders.map( ( order, id ) => <SingleOrders order={order} admin={false} key={id} /> )
            }
        </div>
    );
};

export default MyOrders;