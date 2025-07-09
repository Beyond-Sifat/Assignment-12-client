import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { ToastContainer } from 'react-toastify';

const MainLayout = () => {
    return (
        <div>
             <ToastContainer position='top-right' autoClose={2500}></ToastContainer>
            <Navbar></Navbar>
            <div className=' min-h-[calc(100vh-325px)]'> 
                <Outlet></Outlet>    
            </div> 
            <Footer></Footer>  
           
        </div>
    );
};

export default MainLayout;