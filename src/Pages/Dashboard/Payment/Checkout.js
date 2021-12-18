import { Button } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import useAlert from '../../Hooks/useAlert';


const Checkout = (props) => {
    const stripe = useStripe()
    const elements = useElements()
    const [error, setError] = useState({})
    const { muiAlert } = useAlert()
    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        console.log(error);

        if (error) {
            let er = { message: error.message, isTrue: false }
            setError(er);
        } else {
            let er = { message: 'Payment Successfull', isTrue: true }
            setError(er);
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div style={{ margin: 'auto', width: '30%' }}>
                    <Button sx={{ px: 3 }} variant='contained' type="submit" disabled={!stripe}>
                        Pay ${props.price}
                    </Button>
                </div>
            </form>
            {
                error.message && muiAlert(error)
            }
        </div>
    );
};

export default Checkout;