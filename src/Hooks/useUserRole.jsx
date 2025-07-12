import React from 'react';
import useAuth from './useAuth';
import useAxiosSecu from './useAxiosSecu';
import { useQuery } from '@tanstack/react-query';

const useUserRole = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecu();

    const { data: roleData = {}, isLoading, refetch } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            return res.data; // { role: 'admin' } etc.
        },
    })
    return { role: roleData?.role, isLoading, refetch }
};

export default useUserRole;