import React, { useContext, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from './Checkout';
import { Elements } from '@stripe/react-stripe-js'
import { MyContext } from '../../Hooks/AuthProvider';
import Cart from './Cart';

const stripePromise = loadStripe('pk_test_51JxZvZHjAjK8AKCY0WxakAOckWzlWhFzsMgMwtsHEkO5jUYwI34ATJsjQAQE1iNRqwLnlxXpwTMORjNN6D2aKtY700thb87SPa');

const Payment = () => {
    const [myOrders, setMyOrders] = useState([])
    const { user } = useContext(MyContext)

    const price = myOrders.reduce((t, c) => t + Number(c.price), 0);
    const tax = price * 5 / 100;
    const shipt = myOrders?.length * 2
    useEffect(() => {
        fetch('https://by-cycle-center-faishal-developer.vercel.app/getOrders', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: user.email })
        })
            .then(res => res.json())
            .then(data => setMyOrders(data))
    }, [user.email])
    console.log(myOrders);
    return (
        <div>
            <h4 style={{ textAlign: 'center', color: 'tomato' }}>Testing Payment Implementation</h4>
            <div>
                <Cart sx={{ my: 5 }} orders={myOrders} tax={tax} shipt={shipt} price={price} />
            </div>
            <div style={{ maxWidth: '500px' }}>
                <Elements stripe={stripePromise}>
                    <Checkout
                        price={price + tax + shipt}
                        myOrders={myOrders}
                        user={user}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;