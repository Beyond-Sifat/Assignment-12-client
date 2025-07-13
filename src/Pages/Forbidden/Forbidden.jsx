import React from 'react';
import { Link } from 'react-router';
import { FaLock } from 'react-icons/fa';

const Forbidden = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen px-4 bg-gradient-to-br from-red-100 to-red-300">
            <FaLock className="text-red-600 text-6xl mb-4" />
            <h1 className="text-4xl font-bold text-red-700 mb-2">403 - Forbidden</h1>
            <p className="text-gray-700 text-center mb-6">
                You don't have permission to access this page.
            </p>
            <Link to="/" className="btn btn-error text-white"> 
                Go Home
            </Link>
        </div>
    );
};

export default Forbidden;
