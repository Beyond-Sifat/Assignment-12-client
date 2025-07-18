import React from 'react';
import { Link, NavLink } from 'react-router';
import Logo from './Logo/Logo';
import useAuth from '../Hooks/useAuth';

const Navbar = () => {
  const { user, logOutUser } = useAuth();

  const links = <>
    <li><NavLink to='/'>Home</NavLink></li>
    <li><NavLink to='/courts'>Courts</NavLink></li>
    <li><NavLink to='/register'>Register</NavLink></li>
  </>


  const handleLogOut = () => {
    logOutUser()
      .then(() => {
      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <div className="navbar bg-base-100 bg-gradient-to-r from-[#1e3c72] to-[#2a5298] text-black px-4 py-3 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow ">
            {links}
          </ul>
        </div>
        <Logo></Logo>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring ring-white ring-offset-2">
                <img src={user.photoURL || '/images/default-user.png'} alt="profile" />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-20 p-2 shadow bg-white text-black rounded-box w-52">
              <li className="px-4 py-2 font-semibold text-sm pointer-events-none">
                {user.displayName || user.email}
              </li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><button onClick={handleLogOut}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-sm bg-white text-[#1e3c72] hover:bg-gray-100">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;