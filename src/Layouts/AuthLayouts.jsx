import React from 'react';
import { Outlet } from 'react-router';
import Auth from '../assets/Auth.jpg'
import Logo from '../Components/Logo/Logo';

const AuthLayouts = () => {
    return (
        <div className="p-12 bg-base-200">
            <Logo></Logo>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='flex-1 bg-[#FAFDF0]'>
                    <img
                        src={Auth}
                        className="max-w-full rounded-lg"
                    />
                </div>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};
//min-h-screen
export default AuthLayouts;