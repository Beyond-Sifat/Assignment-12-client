import React from 'react';
import useAuth from '../../Hooks/useAuth';

const MemberDashboard = () => {
    const { user } = useAuth();


    return (
        <div className='max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200'>
            <h2 className="text-3xl font-bold mb-4 text-center">User Profile</h2>

            <div className="flex flex-col items-center text-center">
                <img
                    src={user?.photoURL}
                    alt="Admin Avatar"
                    className="w-24 h-24 rounded-full border-4 border-blue-500 mb-4"
                />
                <h3 className="text-xl font-bold">{user?.displayName}</h3>
                <p className="text-gray-600">{user?.email}</p>
            </div>
        </div>
    );
};

export default MemberDashboard;