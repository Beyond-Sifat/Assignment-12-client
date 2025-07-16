import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecu from '../../../Hooks/useAxiosSecu';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const MakeAnnouncement = () => {
    const axiosSecure = useAxiosSecu();
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const mutation = useMutation({
        mutationFn: async (data) => {
            const res = await axiosSecure.post('/announcements', data);
            return res.data
        },
        onSuccess: () => {
            Swal.fire('Success', 'Announcement posted successfully', 'success');
            queryClient.invalidateQueries(['announcements']);
            reset()
        },
        onError: () => {
            Swal.fire('Error', 'Failed to post announcement ', 'error');
        }
    })
    const onSubmit = (data) => {
        // console.log(data)
        mutation.mutate(data)
    }
    return (
        <div className='max-w-4xl mx-auto py-10 px-4'>
            <h2 className="text-3xl font-bold text-center text-[#1e3c72] mb-8">Post Announcement</h2>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 bg-white p-6 rounded-md-shadow'>
                <div>
                    <label className='block mb-1 font-semibold'>Title</label>
                    <input type="text" placeholder='Enter title' className='input w-full'
                        {...register('title', { required: true })} />
                    {errors.title && <p className='text-red-500'>Title is required</p>}
                </div>


                <div>
                    <label className='block mb-1 font-semibold'>Message</label>
                    <textarea
                        placeholder='Enter your message'
                        className='textarea w-full' rows={4}
                        {...register('message', { required: true })}></textarea>
                    {errors.message && <p className='text-red-500'>Message is required</p>}
                </div>
                <button type="submit" className="btn btn-primary">Post Announcement</button>
            </form>

            <h3 className='text-2xl font-semibold mt-10 mb-4 text-[#1e3c72]'>Announcements</h3>
        </div>
    );
};

export default MakeAnnouncement;