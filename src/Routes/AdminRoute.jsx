import React from 'react';
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';
import { Navigate } from 'react-router';
import Loading from '../Components/Loading';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const { role, isLoading } = useUserRole()

    if (loading || isLoading) {
        return <Loading></Loading>
    }
    if (!user || role !== 'admin') {
        return <Navigate state={{ from: location.state }} to='/forbidden'></Navigate>
    }
    return children
};

export default AdminRoute;
