import axios from 'axios';
import React from 'react';


const axiosSecure = axios.create({
    baseURL: `http://localhost:3000`
})

const useAxiosSecu = () => {
    return axiosSecure;
};

export default useAxiosSecu;