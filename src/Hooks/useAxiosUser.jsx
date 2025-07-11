import axios from 'axios';
import React from 'react';


const axiosUser = axios.create({
    baseURL: `http://localhost:3000`
})

const useAxiosUser = () => {
    return axiosUser
};

export default useAxiosUser;