import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecu from '../../../Hooks/useAxiosSecu';

const MemberDashboard = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecu()

    const { data: memberShip = [] } = useQuery({
        queryKey: ['membershipDate', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/member/membership-date?email=${user.email}`)
            return res.data
        }
    })

    const formattedDate = memberShip?.membershipDate
        ? new Date(memberShip.membershipDate).toLocaleDateString()
        : 'Loading...';
    return (
        <div className='max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200'>
            <h2 className="text-3xl font-bold mb-4 text-center">Member Profile</h2>

            <div className="flex flex-col items-center text-center">
                <img
                    src={user?.photoURL}
                    alt="Admin Avatar"
                    className="w-24 h-24 rounded-full border-4 border-blue-500 mb-4"
                />
                <h3 className="text-xl font-bold">{user?.displayName}</h3>
                <p className="text-gray-600">{user?.email}</p>
            </div>
            <div className='bg-blue-100 px-4 py-3 rounded-lg text-center'>
                <p className='text-sm text-gray-600'>Membership Started On:</p>
                <p className='text-lg font-medium text-green-700 italic'>{formattedDate}</p>
            </div>
        </div>
    );
};

export default MemberDashboard;