import React from 'react';
import useAxiosSecu from '../../Hooks/useAxiosSecu';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../../Components/Loading';
import { FaCheck, FaClock, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ManageBookingsApproval = () => {

    const axiosSecure = useAxiosSecu();
    const queryClient = useQueryClient();


    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['adminBookings'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/bookings');
            return res.data
        }
    })

    const mutationRej = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/admin/bookings/${id}`, { status: 'rejected' })
            return res.data
        },
        onSuccess: () => {
            Swal.fire('Rejected!', 'Booking has been rejected.', 'success');
            queryClient.invalidateQueries(['adminBookings']);
        },
        onError: () => {
            Swal.fire('Error!', 'Failed to reject booking.', 'error');
        }
    })


    const mutationAccept = useMutation({
        mutationFn: async ({ id, email }) => {
            const res = await axiosSecure.patch(`/admin/bookings/${id}`, { status: 'approved', email });
            return res.data;
        },
        onSuccess: () => {
            Swal.fire('Accepted!', 'Booking has been accepted.', 'success');
            queryClient.invalidateQueries(['adminBookings']);
        },
        onError: () => {
            Swal.fire('Error!', 'Failed to accept booking.', 'error');
        }
    })







    const handleReject = (id) => {
        mutationRej.mutate(id)
    }

    const handleAccept = (id, email) => {
        mutationAccept.mutate({ id, email })
    }



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
                    {bookings
                        .filter((booking) => booking.status === 'pending')
                        .map((booking) => (
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

                                <div className="flex gap-3 mt-4 justify-end">
                                    <button className='btn btn-sm btn-success text-white'
                                        onClick={() => handleAccept(booking._id, booking.email)}
                                    >
                                        <FaCheck className="mr-1" /> Accept
                                    </button>

                                    <button
                                        className="btn btn-sm btn-error text-white"
                                        onClick={() => handleReject(booking._id)}
                                    >
                                        <FaTimes className="mr-1" /> Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default ManageBookingsApproval;