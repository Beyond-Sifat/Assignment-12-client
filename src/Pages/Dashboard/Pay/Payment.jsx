import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckOut from './CheckOut';


const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh')
const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckOut></CheckOut>
        </Elements>
    );
};

export default Payment;