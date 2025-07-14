import React from 'react';
import { NavLink, Outlet } from 'react-router';
import Logo from '../Components/Logo/Logo';
import { FaCreditCard, FaHome, FaUsers } from 'react-icons/fa';
import { MdAssignmentTurnedIn, MdCheckCircle, MdPendingActions, MdRememberMe, MdSportsTennis } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { RiCoupon2Fill } from "react-icons/ri";
import { TfiAnnouncement } from "react-icons/tfi";
import useUserRole from '../Hooks/useUserRole';

const DashboardLayout = () => {
    const { role, isLoading } = useUserRole();
    console.log(role)

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">

                {/* Navbar */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none ">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 lg:hidden"><Logo></Logo></div>
                </div>
                {/* Page content here */}
                <div className='min-h-[calc(100vw-320px)]'>
                    <Outlet></Outlet>
                </div>
                {/* Page content here */}
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    <Logo></Logo>


                    <li>
                        <NavLink to='/dashBoard' className="flex items-center gap-2">
                            <FaHome /> Home
                        </NavLink>
                    </li>

                    {/* admin links */}
                    {!isLoading && role === 'admin' &&
                        <>
                            <li>
                                <NavLink to='/dashBoard/manageCourts' className="flex items-center gap-2">       
                                    <MdSportsTennis /> Manage Courts   {/* complete */}
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to='/dashBoard/manageBookingsApproval' className="flex items-center gap-2">
                                    <MdAssignmentTurnedIn /> Manage Booking approvals    {/* half-complete */}
                                </NavLink>
                            </li>


                            {/* <li>
                                <NavLink to='/dashBoard/manageMembers' className="flex items-center gap-2">
                                    <MdRememberMe /> Manage Members
                                </NavLink>
                            </li> */}


                            {/* <li>
                                <NavLink to='/dashBoard/manageBookings' className="flex items-center gap-2">
                                    <GiConfirmed /> Manage Bookings
                                </NavLink>
                            </li> */}


                            <li>
                                <NavLink to='/dashBoard/allUsers' className="flex items-center gap-2">
                                    <FaUsers /> All users     {/* complete */}
                                </NavLink>
                            </li>
                            {/* <li>
                                <NavLink to='/dashBoard/manageCoupons' className="flex items-center gap-2">
                                    <RiCoupon2Fill /> Manage Coupons
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashBoard/ announcement' className="flex items-center gap-2">
                                    <TfiAnnouncement /> Announcement
                                </NavLink>
                            </li> */}


                        </>
                    }

                    




                    {/* Member links */}
                    {!isLoading && role === 'member' &&
                        <>
                            <li>
                                <NavLink to='/dashBoard/pendingBookings' className="flex items-center gap-2">
                                    <MdPendingActions /> Pending Bookings   
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to='/dashBoard/approvedBookings' className="flex items-center gap-2">
                                  <MdCheckCircle/> Approved Bookings   
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to='/dashBoard/paymentForm' className="flex items-center gap-2">
                                  <FaCreditCard/> Payment  
                                </NavLink>
                            </li>

                        </>
                    }





                    {/* User Links */}
                    {!isLoading && role === 'user' &&
                        <>
                            <li>
                                <NavLink to='/dashBoard/pendingBookings' className="flex items-center gap-2">
                                    <MdPendingActions /> Pending Bookings
                                </NavLink>
                            </li>

                        </>
                    }

                </ul>
            </div>
        </div >
    );
};

export default DashboardLayout;