import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading';
import useAxiosSecu from '../../Hooks/useAxiosSecu';

const AllUsers = () => {

    const axiosSecure = useAxiosSecu()
    const [search, setSearch] = useState('')

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data
        }
    })


    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <div className='max-w-7xl mx-auto px-4 py-6'>
            <h2 className="text-3xl font-bold text-[#1e3c72] mb-4">All Users</h2>


            <input type="text" placeholder='Search by name or email' value={search}
                onChange={e => setSearch(e.target.value)}
                className='input input-bordered w-full max-w-sm mb-4'
            />
            {isLoading ? (
                <div className="flex justify-center min-h-[200px] items-center">
                    <Loading />
                </div>
            ) : (
                <div className='overflow-x-auto'>
                    <table className='table w-full '>
                        <thead className="bg-gradient-to-r from-[#1e3c72] to-[#2a5298] text-white">
                            <tr>
                                <th className="p-3 border">#</th>
                                <th className="p-3 border">Name</th>
                                <th className="p-3 border">Email</th>
                                <th className="p-3 border">Role</th>
                                <th className="p-3 border">Created At</th>
                            </tr>
                        </thead>
                        <tbody className='text-center text-sm text-gray-700'>
                            {filteredUsers.map((user, idx) => (
                                <tr key={user._id}>
                                    <td className="p-2 border-b">{idx + 1}</td>
                                    <td className='p-2 border-b'>{user.name || 'N/A'}</td>
                                    <td className='p-2 border-b'>{user.email}</td>
                                    <td className='p-2 border-b capitalize'>{user.role}</td>
                                    <td className='p-2 border-b'>
                                        {new Date(user.created_at).toLocaleDateString()} <br />
                                        <span className="text-xs text-gray-500">
                                            {new Date(user.created_at).toLocaleTimeString()}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredUsers.length === 0 && (
                        <p className="text-center text-gray-500 mt-4">No users matched your search.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default AllUsers;