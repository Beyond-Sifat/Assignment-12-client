import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecu from '../../../Hooks/useAxiosSecu';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Loading from '../../../Components/Loading';

const MakeAnnouncement = () => {
    const axiosSecure = useAxiosSecu();
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const [isEditMode, setIsEditMode] = useState(false);
    const [editId, setEditId] = useState(null);


    const mutation = useMutation({
        mutationFn: async (data) => {
            if (isEditMode) {
                const res = await axiosSecure.patch(`/announcements/${editId}`, data);
                return res.data;
            } else {
                const res = await axiosSecure.post('/announcements', data);
                return res.data
            }

        },
        onSuccess: () => {
            Swal.fire('Success', `Announcement ${isEditMode ? 'updated' : 'posted'} successfully`, 'success');
            queryClient.invalidateQueries(['announcements']);
            reset()
            setIsEditMode(false);
            setEditId(null);
        },
        onError: () => {
            Swal.fire('Error', 'Failed to post announcement ', 'error');
        }
    })



    const { data: announcements = [], isLoading } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosSecure.get('/announcements')
            return res.data;
        }
    })


    const onSubmit = (data) => {
        data.createdAt = new Date().toLocaleString();
        mutation.mutate(data)
    }



    const mutationDelete = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/announcements/${id}`)
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['announcements'])
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Deleted successfully.'
            });
        },
        onError: () => {
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Failed to delete.'
            });
        }
    })

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this court?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(result => {
            if (result.isConfirmed) {
                mutationDelete.mutate(id)
            }
        })
    }

    const handleEdit = (announcement) => {
        setIsEditMode(true);
        setEditId(announcement._id);
        setValue('title', announcement.title);
        setValue('message', announcement.message);
    };
    return (
        <div className='max-w-4xl mx-auto py-10 px-4'>
            <h2 className="text-3xl font-bold text-center text-[#1e3c72] mb-8"> {isEditMode ? 'Edit Announcement' : 'Post Announcement'}</h2>

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
                <button type="submit" className="btn btn-primary">  {isEditMode ? 'Update Announcement' : 'Post Announcement'}</button>
            </form>

            <h3 className='text-2xl font-semibold mt-10 mb-4 text-[#1e3c72]'>Announcements</h3>

            {isLoading ? (
                <Loading></Loading>
            ) : announcements.length === 0 ? (
                <p>No announcements yet.</p>
            ) : (
                announcements.map(announcement => (
                    <div key={announcement._id} className='my-5 bg-white border-l-4 border-blue-600 border-r-4  p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
                        <div className='flex items-start gap-3'>
                            <div className='flex-1'>
                                <h4 className="text-xl font-semibold text-gray-800">{announcement.title}</h4>
                                <p className="text-gray-700 mt-1">{announcement.message}</p>
                                <p className="text-sm text-gray-500 mt-2 italic">{new Date(announcement.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                        <div className='flex gap-3 mt-3'>
                            <button onClick={() => handleEdit(announcement)} className='btn btn-sm btn-warning'>Edit</button>
                            <button onClick={() => handleDelete(announcement._id)} className='btn btn-sm btn-error'>Delete</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default MakeAnnouncement;
  