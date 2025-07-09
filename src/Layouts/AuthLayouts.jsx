import React from 'react';
import { Outlet } from 'react-router';
import Auth from '../assets/Auth.jpg'
import Logo from '../Components/Logo/Logo';
import { ToastContainer } from 'react-toastify';

const AuthLayouts = () => {
    return (
        
        <div className="min-h-screen bg-base-200">
             <ToastContainer position='top-right' autoClose={2500}></ToastContainer>
            <div className="max-w-6xl mx-auto p-8">
                <Logo></Logo>
                <div className="flex flex-col lg:flex-row-reverse items-center gap-6 mt-8 bg-white shadow-md rounded-lg overflow-hidden">
                    <div className='flex-1'>
                        <img
                            src={Auth}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className='flex-1 p-6'>
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </div>
    );
};
//min-h-screen
export default AuthLayouts;