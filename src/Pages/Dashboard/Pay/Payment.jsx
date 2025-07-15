import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckOut from './CheckOut';


const stripePromise = loadStripe(import.meta.env.VITE_payment_key)
const Payment = ({booking, isLoading}) => {
    return (
        <Elements stripe={stripePromise}>
            <CheckOut booking={booking} isLoading={isLoading}></CheckOut>
        </Elements>
    );
};

export default Payment;