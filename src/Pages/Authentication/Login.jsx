import React from 'react';
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router';
import SocialLogin from './SocialLogin';

const Login = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();


    const onSubmit = data => {
        console.log(data)
    }
    return (
        <div >
            <Toaster />
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