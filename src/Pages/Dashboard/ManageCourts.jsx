import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';

const ManageCourts = () => {
    const { register, handleSubmit, reset } = useForm();

    const [openModal, setOpenModal] = useState(false)

    const onSubmit = (data) => {
        console.log(data)
        reset();
        setOpenModal(false);
    }
    return (
        <div>
            <h2>Manage Courts</h2>

            <button
                className="btn btn-success mb-4"
                onClick={() => setOpenModal(true)}
            >
                <FaPlus className="mr-2" /> Add Court
            </button>


            {openModal && (
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
            )}
        </div>
    );
};

export default ManageCourts;