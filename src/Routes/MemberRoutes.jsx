import React from 'react';
import useUserRole from '../Hooks/useUserRole';
import useAuth from '../Hooks/useAuth';
import Loading from '../Components/Loading';

const MemberRoutes =({ children }) => {
    const { user, loading } = useAuth()
    const { role, isLoading } = useUserRole()

    if (loading || isLoading) {
        return <Loading></Loading>
    }
    if (!user || role !== 'member') {
        return <Navigate state={{ from: location.state }} to='/forbidden'></Navigate>
    }
    return children
};

export default MemberRoutes;