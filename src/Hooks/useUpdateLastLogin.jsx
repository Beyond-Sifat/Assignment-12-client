import React from 'react';
import useAxiosUser from './useAxiosUser';

const useUpdateLastLogin = () => {
    const axiosUser = useAxiosUser();

     const updateLogin = async (email) => {
    try {
      const res = await axiosUser.put(`/users/${email}`);
      console.log('Last login updated:', res.data);
    } catch (err) {
      console.error('Failed to update last login:', err);
    }
  };
    return updateLogin
};

export default useUpdateLastLogin;