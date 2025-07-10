import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { FaEdit, FaPlus, FaSpinner, FaTrash } from 'react-icons/fa';
import useAxiosSecu from '../../Hooks/useAxiosSecu';
import { useMutation, useQuery, useQueryClient, } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ManageCourts = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [openModal, setOpenModal] = useState(false)
    const axiosSecure = useAxiosSecu();
    const queryClient = useQueryClient();


    const { data: courts = [], isLoading } = useQuery({
        queryKey: ['courts'],
        queryFn: async () => {
            const res = await axiosSecure.get('/courts')
            return res.data
        }
    });

    const mutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/courts/${id}`)
            return res.data;
        },
        onSuccess: () => {
            toast.success('Court deleted')
            queryClient.invalidateQueries(['courts'])
        },
        onError: () => {
            toast.error("Failed to delete court")
        }
    })




    const handleDelete = (_id) => {
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
                mutation.mutate(_id)
            }
        })
    }



    const onSubmit = async (data) => {
        console.log(data)

        const slotArray = data.slots.split(',').map(slot => slot.trim()).filter(slot => slot !== '');

        const newCourts = {
            name: data.name,
            type: data.type,
            price: parseFloat(data.price),
            image: data.image,
            slots: slotArray
        }


        try {
            const res = await axiosSecure.post('/courts', newCourts);
            if (res.data.insertedId) {
                toast.success('Court added successfully')
                reset();
                setOpenModal(false);
            }
        } catch (error) {
            console.error(error)
            toast.error('Failed to add court')
        }
    }
    return (
        <div>
            <Toaster position='top-right' />

            <h2 className='text-center text-3xl md:text-4xl font-bold text-[#1e3c72]'>Manage Courts</h2>

            <button
                className="btn btn-success mb-4 "
                onClick={() => setOpenModal(true)}
            >
                <FaPlus className="mr-2" /> Add Court
            </button>

            {!isLoading ? (
                <div>
                    <table className="table w-full">
                        <thead className="bg-gradient-to-r from-[#1e3c72] to-[#2a5298] text-white">
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Price</th>
                                <th>Slots</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-gray-600'>
                            {courts.map((court, index) => (
                                <tr key={court._id}>
                                    <td>{index + 1}</td>
                                    <td><img src={court.image} alt={court.name} className="w-16 h-12 object-cover rounded" /></td>
                                    <td>{court.name}</td>
                                    <td>{court.type}</td>
                                    <td>{court.price}</td>
                                    <td>
                                        <ul className="list-disc pl-4 text-sm">
                                            {court.slots.map((slot, idx) => (
                                                <li key={idx}>{slot}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="flex justify-center gap-2">
                                        <button className="btn btn-sm btn-error" onClick={() => handleDelete(court._id)}>
                                            <FaTrash />
                                        </button>
                                        <button className="btn btn-sm btn-info">
                                            <FaEdit />
                                        </button>
                                    </td>
                                </tr>
                            ))

                            }
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-[300px] w-full text-center">
                    <FaSpinner className="animate-spin text-primary text-4xl mb-4" />
                    <p className="text-lg font-medium text-gray-600">Loading Courts</p>
                </div>
            )
            }


            {
                openModal && (
                    <dialog id="addCourtModal" className="modal modal-open">
                        <div className='modal-box max-w-md'>
                            <h3 className="font-bold text-lg mb-4">Add New Court</h3>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <label className="label">Court Name</label>
                                    <input
                                        type="text"
                                        placeholder='Court Name'
                                        className='input input-bordered w-full'
                                        {...register('name', { required: true })} />
                                </div>

                                <div>
                                    <label className="label">Court Type</label>
                                    <input
                                        type="type"
                                        placeholder='e.g., Tennis, Football'
                                        className='input input-bordered w-full'
                                        {...register('type', { required: true })} />
                                </div>

                                <div>
                                    <label className="label">Price per Session</label>
                                    <input
                                        type="number"
                                        placeholder='Enter price'
                                        className='input input-bordered w-full'
                                        {...register('price', { required: true })} />
                                </div>

                                <div>
                                    <label className="label">Court Image URL</label>
                                    <input
                                        type="text"
                                        placeholder='Image URL'
                                        className='input input-bordered w-full'
                                        {...register('image', { required: true })} />
                                </div>

                                <div>
                                    <label className="label">Court Slot Times</label>
                                    <textarea
                                        {...register('slots', {
                                            required: 'Slot times are required',
                                            validate: value => {
                                                const allValid = value.split(',').every(slot =>
                                                    /am|pm/i.test(slot.trim())
                                                );
                                                return allValid || 'Each time slot must include AM or PM';
                                            }
                                        })}
                                        placeholder="e.g. 10:00 AM, 4:00 PM, 7:00 PM"
                                        className="textarea textarea-bordered w-full"
                                    ></textarea>
                                    {errors.slots && (
                                        <p className="text-red-500 text-sm mt-1">{errors.slots.message}</p>
                                    )}
                                </div>

                                <div className="flex justify-end gap-2 pt-4">
                                    <button
                                        type="button"
                                        className="btn"
                                        onClick={() => setOpenModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>


                        <form method="dialog" className="modal-backdrop">
                            <button onClick={() => setOpenModal(false)}>close</button>
                        </form>
                    </dialog>
                )
            }
        </div >
    );
};

export default ManageCourts;