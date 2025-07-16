import React, { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecu from '../../Hooks/useAxiosSecu';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading';
import { useForm } from 'react-hook-form';
import Payment from './Pay/Payment';
import Swal from 'sweetalert2';

const PaymentForm = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecu();
    const [couponCode, setCouponCode] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [discountData, setDiscountData] = useState(null);
    const {
        register,
        handleSubmit
    } = useForm();

    const { data: booking, isLoading, isError } = useQuery({
        queryKey: ['bookings', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/${id}`);
            return res.data
        },
        enabled: !!id,
    })



    const handleCoupon = async () => {
        try {
            const res = await axiosSecure.get(`/coupons/validate/${couponCode}`);
            if (res.data.valid) {
                setDiscountData(res.data.coupon)
                Swal.fire('Success', `Coupon applied: ${res.data.coupon.discount}% off`, 'success');
            }
        } catch (err) {
            setDiscountData(null);
            Swal.fire('Invalid Coupon', err.response?.data?.message || 'Failed to apply coupon', 'error');
        }
    }
    const onSubmit = (data) => {
        console.log(data)
        setShowModal(true)
    }

    if (isLoading) return <Loading />;
    if (isError) return <div>Error loading booking info.</div>;

    const finalPrice = discountData ? booking.price - (booking.price * discountData.discount) / 100 : booking.price
    return (
        <div className="max-w-xl mx-auto bg-white shadow p-6 rounded">
            <h2 className="text-2xl font-bold text-center mb-6 text-[#1e3c72]">Payment Form</h2>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div className='flex gap-2 items-end'>
                    <div className='w-full'>
                        <label className="block font-semibold mb-1">Coupon Code</label>
                        <input
                            type="text"
                            placeholder="Enter coupon code (optional)"
                            className="input input-bordered w-full"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                        />
                    </div>
                    <button type='button' onClick={handleCoupon} className='btn btn-success'>Apply</button>
                </div>

                <div>
                    <label className='font-semibold'>Court Name</label>
                    <input type="text" readOnly defaultValue={booking.courtName}
                        className='input input-bordered w-full'
                        {...register('courtName')}
                    />
                </div>


                <div>
                    <label className='font-semibold'>Slot</label>
                    <input type="text" readOnly defaultValue={booking.slots.join(', ')}
                        className='input input-bordered w-full'
                        {...register('slots')}
                    />
                </div>

                <div>
                    <label className='font-semibold'>Date</label>
                    <input type="text" readOnly defaultValue={booking.date}
                        className='input input-bordered w-full'
                        {...register('date')}
                    />
                </div>

                <div>
                    <label className='font-semibold'>Original Price</label>
                    <input type="text" readOnly value={`${booking.price} ৳`}
                        className='input input-bordered w-full'
                        {...register('price')}
                    />
                </div>

                {discountData && (
                    <div className="text-green-600 font-medium">
                        Discount Applied: {discountData.discount}% off — New Price: {finalPrice.toFixed(2)}
                    </div>
                )}


                <div>
                    <button type='submit' className='btn btn-primary w-full'>Pay</button>
                </div>
            </form>


            {showModal && (
                <div className="fixed inset-0 backdrop-blur-2xl bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-2xl mx-auto p-6 rounded-lg shadow-lg relative">
                        <h2 className="text-xl font-bold mb-4 text-center text-[#1e3c72]">Enter Card Details</h2>
                        <Payment booking={booking} isLoading={isLoading} onClose={() => setShowModal(false)} discount={discountData}></Payment>
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
                        >
                            &times;
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentForm;