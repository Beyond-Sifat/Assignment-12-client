import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecu from '../../../Hooks/useAxiosSecu';
import Loading from '../../../Components/Loading';

const ManageBookings = () => {
    const axiosSecure = useAxiosSecu();
    const [search, setSearch] = useState('');

    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['confirmedBookings'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/bookings/confirmed');
            return res.data;
        }
    });

    const filteredBookings = bookings.filter(booking =>
        booking.courtName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-[#1e3c72] mb-6">Manage Confirmed Bookings</h2>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by court name..."
                    className="input input-bordered w-full max-w-md"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {isLoading ? (
                <div className="min-h-[200px] flex justify-center items-center">
                    <Loading />
                </div>
            ) : filteredBookings.length === 0 ? (
                <p className="text-center text-gray-500">No confirmed bookings found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 rounded-lg">
                        <thead className="bg-gradient-to-r from-[#1e3c72] to-[#2a5298] text-white">
                            <tr>
                                {/* <th className="p-3">ID</th> */}
                                <th className="p-3">Court</th>
                                <th className="p-3">Type</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">User Email</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Payment Date</th>
                                <th className="p-3">Txn ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.map((booking) => (
                                <tr key={booking._id} className="text-center hover:bg-gray-50">
                                    {/* <td className="p-2">{booking._id}</td> */}
                                    <td className="p-2">{booking.courtName}</td>
                                    <td className="p-2">{booking.type}</td>
                                    <td className="p-2">{booking.date}</td>
                                    <td className="p-2">{booking.email}</td>
                                    <td className="p-2">${booking.price}</td>
                                    <td className="p-2">
                                        {new Date(booking.paymentDate).toLocaleString()}
                                    </td>
                                    <td className="p-2 text-xs break-all">{booking.transactionId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageBookings;
