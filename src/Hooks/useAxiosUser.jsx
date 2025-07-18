import axios from 'axios';
import React from 'react';


const axiosUser = axios.create({
    baseURL: `https://assignment-12-server-ten-brown.vercel.app`
})

const useAxiosUser = () => {
    return axiosUser
};

export default useAxiosUser;