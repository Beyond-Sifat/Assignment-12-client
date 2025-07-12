import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecu from '../../Hooks/useAxiosSecu';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../../Components/Loading';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { FaTrash } from 'react-icons/fa';

const PendingBookings = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecu();
    const queryClient = useQueryClient();

    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['pendingBookings', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${user.email}`);
            return res.data
        }
    })


    const mutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/bookings/${id}`)
            return res.data
        },
        onSuccess: () => {
            toast.success('Booking cancelled');
            queryClient.invalidateQueries(['pendingBookings', user?.email]);
        },
        onError: () => {
            toast.error('Failed to cancel booking');
        },
    })

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to cancel this booking?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, cancel it!',
        }).then((result) => {
            if (result.isConfirmed) {
                mutation.mutate(id)
            }
        })
    }


    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#1e3c72]">My Pending Bookings</h2>

            {isLoading ? (
                <div className="min-h-[300px] flex justify-center items-center">
                    <Loading />
                </div>
            ) : bookings.length === 0 ? (
                <p className="text-gray-500 text-center">No Pending Booking Found</p>
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
                                <th className="p-3 border">Status</th>
                                <th className="p-3 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking._id} className="hover:bg-gray-50 text-center">
                                    <td className="p-2 border">{booking.courtName}</td>
                                    <td className="p-2 border">{booking.type}</td>
                                    <td className="p-2 border">{booking.date}</td>
                                    <td className="p-2 border">
                                        <ul className="list-disc list-inside text-left">
                                            {booking.slots.map((slot, idx) => (
                                                <li key={idx}>{slot}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="p-2 border">${booking.price}</td>
                                    <td className="p-2 border text-yellow-500 font-semibold capitalize">{booking.status}</td>
                                    <td className='p-2 border'>
                                        <button
                                            onClick={() => handleDelete(booking._id)}
                                            className="text-red-600 hover:text-red-800 text-xl">
                                            <FaTrash></FaTrash>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
            }
        </div>
    );
};

export default PendingBookings;