import React from 'react';
import useAxiosSecu from '../../Hooks/useAxiosSecu';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading';
import { FaClock } from 'react-icons/fa';

const ManageBookingsApproval = () => {

    const axiosSecure = useAxiosSecu();

    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['adminBookings'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/bookings');
            return res.data
        }
    })




    return (
        <div className='max-w-7xl mx-auto px-4 py-8'>
            <h2 className="text-3xl font-bold text-[#1e3c72] mb-6">Manage Booking Requests</h2>

            {isLoading ? (
                <div className="min-h-[300px] flex justify-center items-center">
                    <Loading />
                </div>
            ) : bookings.length === 0 ? (
                <p className="text-center text-gray-500">No Booking Request Found</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.map((booking) => (
                        <div className="rounded-xl p-4 bg-white shadow-md hover:shadow-lg transition"
                            key={booking._id}
                        >
                            <div className="mb-3">
                                <h3 className="text-xl font-semibold text-gray-800">{booking.courtName}</h3>
                                <p className="text-sm text-gray-500">Type: {booking.type}</p>
                            </div>

                            <div className="text-sm text-gray-600 space-y-1">
                                <p><span className="font-medium">User:</span> {booking.email}</p>
                                <p><span className="font-medium">Date:</span> {booking.date}</p>
                                <p><span className="font-medium">Slots:</span> {booking.slots.join(', ')}</p>
                                <p><span className="font-medium">Price:</span> ${booking.price}</p>
                            </div>

                            <div className='border border-dotted mt-4 flex items-center gap-2 bg-yellow-300 font-sm px-3 py-1 w-fit rounded-2xl'>
                                <FaClock></FaClock>
                                <span>{booking.status}</span>
                            </div>


                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageBookingsApproval;