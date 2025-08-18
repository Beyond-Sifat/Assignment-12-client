import React from 'react';
import { useForm } from 'react-hook-form';

import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';
import useAuth from '../../Hooks/useAuth';
import { toast, ToastContainer } from 'react-toastify';
import useUpdateLastLogin from '../../Hooks/useUpdateLastLogin';


const Login = () => {
    const { loginUser } = useAuth();
    const navigate = useNavigate()
    const location = useLocation()
    const updateLogin = useUpdateLastLogin();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();


    const onSubmit = data => {
        console.log(data)

        loginUser(data.email, data.password)
            .then(async (result) => {
                // console.log(result)
                // const user = result.user
                // if (!user.emailVerified) {
                //     toast.error('Please verify your email before logging in.');
                //     return;
                // }


                await updateLogin(result.user.email)

                toast('Login successful')
                navigate(location?.state || '/')
            })
            .catch(error => {
                console.log(error)
                toast.error('Something went wrong')
            })

    }
    return (
        <div >
            <div className="card shadow-md bg-base-100 w-full">
                <div className="card-body">
                    <h1 className="text-3xl font-bold">Please Login</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>


                        <div>
                            <label className="label">Email</label>
                            <input type="email" {...register('email')} className="input input-bordered w-full" placeholder="Email" />
                        </div>


                        <div>
                            <label className="label">Password</label>
                            <input type="password" {...register('password', { required: true, minLength: 6 })} className="input input-bordered w-full" placeholder="Password" />
                            {
                                errors.password?.type === 'required' && <p className='text-red-600' role='alert'>Password is required</p>
                            }
                            {
                                errors.password?.type === 'minLength' && <p className='text-red-600' role='alert'>Password must be 6 character or longer</p>
                            }
                        </div>


                        <button className="btn btn-primary mt-4">Login</button>
                        <p><small>New in this Site? Register First</small> <Link className='text-blue-700 font-bold' to='/register'>Register</Link></p>
                    </form>
                    <div className="divider">OR</div>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;