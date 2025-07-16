import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecu from '../../../Hooks/useAxiosSecu';
import Swal from 'sweetalert2';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../../../Components/Loading';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ManageCoupons = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [editId, setEditId] = useState(null);


    const axiosSecure = useAxiosSecu();

    const { handleSubmit, register, reset, formState: { errors } } = useForm();
    const queryClient = useQueryClient();


    const onSubmit = async (data) => {
        data.discount = parseFloat(data.discount);
        try {
            if (isEditMode) {
                const res = await axiosSecure.patch(`/coupons/${editId}`, data);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Updated!',
                        text: 'Coupon updated successfully.'
                    });
                    reset({
                        code: '',
                        discount: '',
                        expireDate: '',
                        description: ''
                    });
                    setIsEditMode(false);
                    setEditId(null);
                    refetch();
                }
            } else {
                const res = await axiosSecure.post('/coupons', data);
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Coupon Added!',
                        text: 'Coupon added successfully.'
                    });
                    reset();
                    refetch();
                }
            }

        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.response?.data?.message || 'Operation failed'
            });
        }
    };


    const { data: coupons = [], isLoading, refetch } = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
            const res = await axiosSecure.get('/coupons')
            return res.data
        }
    })








    const mutationDelete = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/coupons/${id}`);
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['coupons'])
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Coupon deleted successfully.'
            });
        },
        onError: () => {
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Failed to delete coupon.'
            });
        }
    })


    const handleEdit = (coupon) => {
        setIsEditMode(true);
        setEditId(coupon._id);
        // Prefill form fields
        reset({
            code: coupon.code,
            discount: coupon.discount,
            expireDate: coupon.expireDate,
            description: coupon.description || ''
        });
    };

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


    return (
        <div className='max-w-7xl mx-auto px-4 py-8'>
            <h1 className='text-3xl font-bold text-center text-[#1e3c72] mb-6'>Manage Coupons</h1>
            <div className='max-w-3xl mx-auto p-4 md:p-8 bg-white shadow-md rounded-lg mt-6'>
                <h2 className='text-xl font-bold text-[#1e3c72] mb-6'>Add New Coupons</h2>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                    <div>
                        <label className='block font-medium mb-1'>Coupon Code</label>
                        <input type="text"
                            placeholder='e.g. SUMMER10'
                            {...register('code', { required: true })}
                            className='w-full border border-gray-300 px-4 py-2 rounded-md'
                        />
                        {errors.code && <p className="text-red-500 text-sm">Code is required</p>}
                    </div>
                    <div>
                        <label className='block font-medium mb-1'>Discount (%)</label>
                        <input type="number"
                            step="0.01"
                            placeholder="e.g. 10"
                            {...register('discount', { required: true, min: 1 })}
                            className='w-full border border-gray-300 px-4 py-2 rounded-md'
                        />
                        {errors.discount && <p className='text-red-500 text-sm'>Valid discount</p>}
                    </div>
                    <div>
                        <label className='block font-medium mb-1'>Expire Date</label>
                        <input type="date"
                            {...register('expireDate', { required: true })}
                            className='w-full border border-gray-300 px-4 py-2 rounded-md'
                        />
                        {errors.expireDate && <p className="text-red-500 text-sm">Expire date is required</p>}
                    </div>
                    <div>
                        <label className='block font-medium mb-1'>Description</label>
                        <textarea
                            placeholder='Short note or description'
                            {...register("description")}
                            className='w-full border border-gray-300 px-4 py-2 rounded-md resize-none'
                        />
                    </div>

                    <div>
                        <button type="submit" className="btn btn-primary w-full md:w-auto">Add Coupons</button>
                    </div>
                </form>
            </div>

            {isLoading ? (
                <Loading></Loading>
            ) : (
                <div className="overflow-x-auto mt-10">
                    <table className='w-full border border-gray-200 text-sm md:text-base'>
                        <thead className="bg-gradient-to-r from-[#1e3c72] to-[#2a5298] text-white">
                            <tr>
                                <th className="p-3 border">Code</th>
                                <th className="p-3 border">Discount (%)</th>
                                <th className="p-3 border">Expires On</th>
                                <th className="p-3 border">Description</th>
                                <th className="p-3 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons.map((coupon) => (
                                <tr key={coupon._id} className="text-center">
                                    <td className='p-2'>{coupon.code}</td>
                                    <td className='p-2'>{coupon.discount}</td>
                                    <td className='p-2'>{coupon.expireDate}</td>
                                    <td className='p-2'>{coupon.description || '---'}</td>
                                    <td className='p-2 flex justify-center gap-10'>
                                        <button onClick={() => handleEdit(coupon)} className="text-blue-500 hover:text-blue-700">
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(coupon._id)}
                                            className="">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageCoupons;