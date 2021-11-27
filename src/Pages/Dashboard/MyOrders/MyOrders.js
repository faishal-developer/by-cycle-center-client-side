import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../Hooks/AuthProvider';
import useDelete from '../../Hooks/useDelete';
import SkeletonOrders from '../../shared/Skeleton/SkeletonOrders';
import SingleOrders from '../ManageAllOrders/SingleOrders';

const MyOrders = () => {
    const { existingOrders, setExistingOrders, handleDelete } = useDelete()
    const { user, isLoading } = useContext( MyContext )
    const [orderLoading, setOrderLoading] = useState( true )

    useEffect( () => {
        fetch( 'http://localhost:5000/getOrders', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify( { email: user.email } )
        } )
            .then( res => res.json() )
            .then( data => {
                setExistingOrders( data )
                setOrderLoading( false )
            } )
            .catch( e => alert( e.messge ) )
    }, [isLoading, user] )
    if ( orderLoading && existingOrders.length < 1 ) {
        return <SkeletonOrders />
    }
    return (
        <div>
            {
                existingOrders.map( ( order, id ) => <SingleOrders handleDelete={handleDelete} order={order} admin={false} key={id} /> )
            }
        </div>
    );
};

export default MyOrders;