import React, { useEffect, useState } from 'react';
import useDelete from '../../Hooks/useDelete';
import SkeletonOrders from '../../shared/Skeleton/SkeletonOrders';
import SingleOrders from './SingleOrders';

const ManageAllOrders = () => {
    const { existingOrders, setExistingOrders, handleDelete } = useDelete()
    const [modified, setModified] = useState( false )
    const [orderLoading, setOrderLoading] = useState( true )


    useEffect( () => {
        console.log( 'manage', 'calling' );
        fetch( 'http://localhost:5000/orders' )
            .then( res => res.json() )
            .then( data => {
                setExistingOrders( data )
                setModified( false )
                setOrderLoading( false )
            } )
            .catch( e => alert( e.message ) )
    }, [modified] )

    const handleUpdateStatus = ( id ) => {

        fetch( 'http://localhost:5000/orders', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { status: 'shipted', id: id } )
        } )
            .then( res => res.json() )
            .then( data => {
                if ( data.modifiedCount ) {
                    setModified( true )
                }
            } )
            .catch( e => alert( e.message ) )
    }
    if ( orderLoading && existingOrders.length < 1 ) {
        return <SkeletonOrders />
    }
    return (
        <div>
            {
                existingOrders?.map( ( order, i ) => <SingleOrders admin={true} handleDelete={handleDelete} handleUpdateStatus={handleUpdateStatus} order={order} key={i} /> )
            }
        </div>
    );
};

export default ManageAllOrders;