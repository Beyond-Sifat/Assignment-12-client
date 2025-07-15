import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';
import useAxiosSecu from '../../../Hooks/useAxiosSecu';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';

const CheckOut = ({ booking, isLoading }) => {
    const stripe = useStripe();
    const elements = useElements();

    const { user } = useAuth();
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecu();


    if (isLoading) {
        return '...Loading'
    }
    const amount = booking.price;
    const amountInCents = amount * 100;
    console.log(amountInCents)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }


        const card = elements.getElement(CardElement);
        if (!card) {
            return;
        }


        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            setError(error.message)
        }
        else {
            setError('');
            console.log('method', paymentMethod)


            // intent
            const res = await axiosSecure.post('/create-payment-intent', {
                amountInCents,
                bookingId: booking._id,
            })
            const clientSecret = res.data.clientSecret;
            // console.log('dj iadia',res)

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.displayName,
                        email: user.email
                    },
                },
            });



            if (result.error) {
                setError(result.error.message);
            } else {
                setError('');
                if (result.paymentIntent.status === 'succeeded') {
                    console.log('Payment succeeded!');
                    console.log(result)

                    const paymentData = {
                        bookingId: booking._id,
                        email: user.email,
                        transactionId: result.paymentIntent.id,
                        price: booking.price,
                        method: result.paymentIntent.payment_method_types,
                        date: new Date(),
                    };
                    const res = await axiosSecure.post(`/payment`, paymentData)
                    if (res.data.insertedId) {
                        await Swal.fire({
                            icon: 'success',
                            title: 'Payment Successful',
                            html: `<strong>Transaction ID</strong> <code>${result.paymentIntent.id}</code>`,
                            confirmButtonText: 'go to My Parcel'
                        })
                    }

                }
            }
        }






    }
    return (
        <div>
            <form onSubmit={handleSubmit} className='space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto'>
                <CardElement />
                <button type='submit' disabled={!stripe} className='btn btn-primary w-full'>Pay <FaBangladeshiTakaSign />{amount}</button>
                {
                    error && <p className='text-red-500'>{error}</p>
                }
            </form>
        </div>
    );
};

export default CheckOut;