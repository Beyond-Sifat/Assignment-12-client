import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecu from '../../../Hooks/useAxiosSecu';
import { useQuery } from '@tanstack/react-query';

const AdminDashBoard = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecu();

    const { data: roleCountsData = [], isLoading: loadingRoles } = useQuery({
        queryKey: ['userRoleCount'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/user-role-counts');
            return res.data;
        }
    })


    const { data: courtCountsData = [], isLoading: loadingCourts } = useQuery({
        queryKey: ['courtCount'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/court-count');
            return res.data;
        }
    })


    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">Admin Profile</h2>

            <div className="flex flex-col items-center text-center">
                <img
                    src={user?.photoURL}
                    alt="Admin Avatar"
                    className="w-24 h-24 rounded-full border-4 border-blue-500 mb-4"
                />
                <h3 className="text-xl font-bold">{user?.displayName}</h3>
                <p className="text-gray-600">{user?.email}</p>
            </div>

            <div className='flex flex-col md:flex-row justify-between gap-6'>
                <div className='flex-1 bg-gray-200 p-4 rounded-lg shadow text-center'>
                    <h4 className="text-lg font-semibold mb-2">User Roles</h4>
                    {loadingRoles ? (<p>Loading Roles...</p>) : (
                        roleCountsData.map((roleCounts, idx) => (
                            <p key={idx}>
                                <strong className="capitalize">{roleCounts.role}</strong>: <span className="font-bold text-blue-600">{roleCounts.count}</span>
                            </p>
                        ))
                    )}
                </div>

                <div className='flex-1 bg-gray-200 p-4 rounded-lg drop-shadow-xl text-center'>
                    <h4 className='text-lg font-semibold mb-2'>Court Count</h4>

                    {loadingCourts ? (
                        <p>Loading Courts...</p>
                    ) : (
                        <p className='text-blue-600 font-bold text-lg'>{courtCountsData.courtCount}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashBoard;