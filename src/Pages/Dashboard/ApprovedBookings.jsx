import React from 'react';
import useAxiosSecu from '../../Hooks/useAxiosSecu';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading';
import { FaCreditCard, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const ApprovedBookings = () => {

    const axiosSecure = useAxiosSecu();
    const { user } = useAuth();
    const navigate = useNavigate()

    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['approved-bookings', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/approved-bookings?email=${user.email}`);
            return res.data;
        }
    })


    const handlePay = (id) => {
        navigate(`/dashBoard/paymentForm/${id}`)
    }

    return (
        <div className='max-w-6xl mx-auto p-4'>
            <h2 className='font-bold text-3xl text-center text-[#1e3c72]'>My Approved Bookings</h2>
            {isLoading ? (
                <div className="min-h-[300px] flex justify-center items-center">
                    <Loading></Loading>
                </div>
            ) : bookings.length === 0 ? (
                <p className="text-center text-gray-500">No Approved Bookings Found</p>
            ) : (
                <div className='overflow-x-auto'>
                    <table className='w-full border border-gray-300 rounded-lg overflow-hidden'>
                        <thead className="bg-gradient-to-r from-[#1e3c72] to-[#2a5298] text-white">
                            <tr>
                                <th className="p-3 border">Court</th>
                                <th className="p-3 border">Type</th>
                                <th className="p-3 border">Date</th>
                                <th className="p-3 border">Slots</th>
                                <th className="p-3 border">Price</th>
                                {/* <th className="p-3 border">Status</th> */}
                                <th className="p-3 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking._id} className="hover:bg-gray-50 text-center">
                                    <td className='p-2 '>{booking.courtName}</td>
                                    <td className='p-2 '>{booking.type}</td>
                                    <td className='p-2 '>{booking.date}</td>
                                    <td className='p-2 '>
                                        <ul className='list-disc list-inside text-left'>
                                            {booking.slots.map((slot, idx) => (
                                                <li key={idx}>{slot}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="p-2 border">${booking.price}</td>
                                    {/* <td className='p-2 '></td> */}
                                    <td className='p-2 flex justify-center gap-2'>
                                        <button className='btn btn-sm btn-primary'
                                            onClick={() => handlePay(booking._id)}>
                                            <FaCreditCard className="mr-1" /> Pay
                                        </button>
                                        <button className='btn btn-sm btn-error'>
                                            <FaTrash className="mr-1" /> Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
};

export default ApprovedBookings;