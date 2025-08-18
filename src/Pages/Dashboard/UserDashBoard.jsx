import React from 'react';
import useAuth from '../../Hooks/useAuth';

const UserDashboard = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-md mx-auto p-8 rounded-2xl shadow-2xl bg-gradient-to-br from-blue-50 via-white to-blue-100 border border-gray-200">
            <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-600">
                User Profile
            </h2>

            <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative group">
                    <img
                        src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                        alt="User Avatar"
                        className="w-28 h-28 rounded-full border-4 border-blue-400 shadow-md group-hover:scale-105 transform transition duration-300"
                    />
                    <span className="absolute bottom-2 right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></span>
                </div>

                <h3 className="text-2xl font-bold text-gray-800">
                    {user?.displayName || "Unnamed User"}
                </h3>
                <p className="text-gray-600">{user?.email}</p>

                {/* Email Verification Badge */}
                {user?.emailVerified ? (
                    <span className="px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                        ✅ Email Verified
                    </span>
                ) : (
                    <span className="px-3 py-1 text-sm font-semibold text-red-700 bg-red-100 rounded-full">
                        ❌ Not Verified
                    </span>
                )}
            </div>

            {/* Extra Buttons */}
            {/* <div className="mt-6 flex justify-center space-x-4">
                <button className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
                    Edit Profile
                </button>
                <button className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition">
                    Log Out
                </button>
            </div> */}
        </div>
    );
};

export default UserDashboard;
