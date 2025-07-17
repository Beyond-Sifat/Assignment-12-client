import React from 'react';
import useUserRole from '../../../Hooks/useUserRole';
import Loading from '../../../Components/Loading';
import UserDashBoard from '../UserDashBoard';
import MemberDashboard from '../Member/MemberDashboard';
import AdminDashBoard from '../Admin/AdminDashBoard';
import Forbidden from '../../Forbidden/Forbidden';

const DashboardHome = () => {
    const { role, isLoading } = useUserRole();
    if (isLoading) return <Loading />

    if (role === 'user') {
        return <UserDashBoard></UserDashBoard>
    }
    else if (role === 'member') {
        return <MemberDashboard></MemberDashboard>
    }
    else if (role === 'admin') {
        return <AdminDashBoard></AdminDashBoard>
    }
    else {
        return <Forbidden></Forbidden>
    }
};

export default DashboardHome;