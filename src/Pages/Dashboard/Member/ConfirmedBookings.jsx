import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecu from '../../../Hooks/useAxiosSecu';
import Loading from '../../../Components/Loading';

const ConfirmedBookings = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecu();
    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['confirmedBookings', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/member/bookings/confirmed?email=${user.email}`);
            return res.data;
        }
    })

    const { data: courts = [] } = useQuery({
        queryKey: ['allCourts'],
        queryFn: async () => {
            const res = await axiosSecure.get('/courts');
            return res.data;
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    if (bookings.length === 0) {
        return <p className="text-center text-gray-500 mt-10">No confirmed bookings found.</p>;
    }
    return (
        <div className='max-w-7xl mx-auto px-4 py-8'>
            <h2 className='text-3xl font-bold mb-6  text-[#1e3c72] text-center'>My Confirmed Bookings</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {bookings.map((booking) => {
                    const court = courts.find(c => c._id === booking.courtId);
                    const image = court?.image || 'https://via.placeholder.com/300x200?text=Court';

                    return (
                        <div key={booking._id} className='bg-white rounded-lg hover:shadow-lg transition-all p-4 shadow-2xl'>
                            <div className="h-32 bg-gray rounded mb-3 overflow-hidden">
                                <img src={image} alt={booking.courtName} className='h-full w-full object-cover' />
                            </div>

                            <h3 className='text-lg font-bold text-gray-800'>{booking.courtName}</h3>
                            <p className='text-sm text-gray-500 mb-2'>{booking.type}</p>

                            <div>
                                <p><span className='font-semibold'>Date:</span>{booking.date}</p>
                                <p><span className='font-semibold'>Slots:</span>{booking.slots.join(', ')}</p>
                                <p><span className='font-semibold'>Price:</span>{booking.price}</p>
                                <p><span className='font-semibold'>Tnx ID:</span><span className='text-[11px] break-words'>{booking.transactionId}</span></p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default ConfirmedBookings;