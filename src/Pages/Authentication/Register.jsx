import React, { useState } from 'react';
import SocialLogin from './SocialLogin';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import axios from 'axios';
import useAxiosUser from '../../Hooks/useAxiosUser';

const Register = () => {
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const [profilePic, setProfilePic] = useState('')
    const axiosUser = useAxiosUser()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = data => {
        createUser(data.email, data.password, data.name)
            .then(async (result) => {
                console.log(result.user)
                navigate('/')
                toast.success("Successfully Register!")



                const userInfo = {
                    name: data.name,
                    email: data.email,
                    role: 'user',
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                };

                const res = await axiosUser.post('/users', userInfo)
                console.log(res.data)


                const userProfile = {
                    displayName: data.name,
                    photoURL: profilePic
                }
                updateUserProfile(userProfile)
                    .then(() => {
                        console.log('updated')
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })

            .catch(error => {
                console.error(error)
            })
    }



    const handleImgUp = async (e) => {
        const image = e.target.files[0]
        console.log(image)
        const formData = new FormData()
        formData.append('image', image)
        const uploadURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`
        try {
            const res = await axios.post(uploadURL, formData);
            const imageUrl = res.data?.data?.url; // ✅ Extract just the URL
            setProfilePic(imageUrl); // ✅ Save only the URL string
        } catch (err) {
            console.error("Image upload failed", err);
        }
    }

    return (
        <div>
            <Toaster />
            <div className="card shadow-md bg-base-100 w-full">
                <div className="card-body">
                    <h1 className="text-3xl font-bold mb-4">Create an account</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="label">Name</label>
                            <input type="text" {...register('name', { required: true })} className="input input-bordered w-full" />
                            {errors.name && <p className="text-red-600 text-sm mt-1">Please enter your name</p>}
                        </div>

                        <div>
                            <label className="label">Email</label>
                            <input type="email" {...register('email', { required: true })} className="input input-bordered w-full" />
                            {errors.email && <p className="text-red-600 text-sm mt-1">Email is required</p>}
                        </div>

                        <div>
                            <label className="label">Photo</label>
                            <input type="file" onChange={handleImgUp} className="file-input file-input-bordered w-full" />
                        </div>

                        <div>
                            <label className="label">Password</label>
                            <input type="password" {...register('password', { required: true, minLength: 6 })} className="input input-bordered w-full" />
                            {errors.password?.type === 'required' && <p className="text-red-600 text-sm mt-1">Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className="text-red-600 text-sm mt-1">Password must be 6 characters or longer</p>}
                        </div>

                        <button className="btn btn-primary w-full mt-4">Register</button>
                        <p className="mt-2">
                            <small>Already have an account? </small>
                            <Link to="/login" className="text-blue-700 font-bold">Login</Link>
                        </p>
                    </form>

                    <div className="divider">OR</div>
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Register;