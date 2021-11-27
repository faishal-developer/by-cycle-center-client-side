import React, { useContext, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from './Checkout';
import { Elements } from '@stripe/react-stripe-js'
import { MyContext } from '../../Hooks/AuthProvider';

const stripePromise = loadStripe( 'pk_test_51JxZvZHjAjK8AKCY0WxakAOckWzlWhFzsMgMwtsHEkO5jUYwI34ATJsjQAQE1iNRqwLnlxXpwTMORjNN6D2aKtY700thb87SPa' );

const Payment = () => {
    const [myOrders, setMyOrders] = useState( [] )
    const { user } = useContext( MyContext )

    const price = myOrders.reduce( ( t, c ) => t + Number( c.price ), 0 );
    useEffect( () => {
        fetch( 'http://localhost:5000/getOrders', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify( { email: user.email } )
        } )
            .then( res => res.json() )
            .then( data => setMyOrders( data ) )
    }, [user.email] )
    console.log( myOrders );
    return (
        <div>
            <h4 style={{ textAlign: 'center', color: 'tomato' }}>Testing Payment Implementation</h4>
            <Elements stripe={stripePromise}>
                <Checkout
                    price={price}
                    myOrders={myOrders}
                    user={user}
                />
            </Elements>
        </div>
    );
};

export default Payment;