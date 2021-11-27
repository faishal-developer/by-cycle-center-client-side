import { useState } from "react";

const useDelete = () => {
    let [existingOrders, setExistingOrders] = useState( [] )
    const handleDelete = ( orderId ) => {

        fetch( 'http://localhost:5000/orders', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { id: orderId } )
        } )
            .then( res => res.json() )
            .then( data => {
                if ( data.deletedCount === 1 ) {
                    let orders = existingOrders.filter( order => {
                        return order?._id !== orderId
                    } )
                    setExistingOrders( orders )
                    alert( 'deleted successfully' )
                } else {
                    alert( 'error occured' )
                }
            } )
            .catch( e => alert( e.message ) )
    }

    return {
        existingOrders,
        setExistingOrders,
        handleDelete
    }
};

export default useDelete;