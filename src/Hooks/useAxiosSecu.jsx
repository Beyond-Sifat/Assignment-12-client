import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';


const axiosSecure = axios.create({
    baseURL: `http://localhost:3000`
})

const useAxiosSecu = () => {
    const {user, logOutUser} = useAuth()
    const navigate = useNavigate();


    axiosSecure.interceptors.request.use(config=>{
        if(user?.accessToken){
            config.headers.Authorization = `Bearer ${user?.accessToken}`
        }
        return config
    }, error=>{
        return Promise.reject(error)
    })


    axiosSecure.interceptors.response.use(res => {
        return res
    }, error => {
        const status = error.response?.status
        console.log(status)
        if (status === 403) {
           setTimeout(()=>{
             navigate('/forbidden')
           }, 0)
        }
        else if (status === 401) {
            logOutUser()
                .then(() => {
                    navigate('login')
                })
                .catch(() => { })
        }
        return Promise.reject(error)
    })


    return axiosSecure;
};

export default useAxiosSecu;