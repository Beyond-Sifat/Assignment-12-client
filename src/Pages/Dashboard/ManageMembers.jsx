import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecu from '../../Hooks/useAxiosSecu';
import Loading from '../../Components/Loading';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ManageMembers = () => {
    const [search, setSearch] = useState('');
    const axiosSecure = useAxiosSecu();
    const queryClient = useQueryClient();


    const { data: members = [], isLoading } = useQuery({
        queryKey: ['members', search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/members?search=${search}`)
            return res.data
        }
    })

    const mutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/members/${id}`);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire('Deleted!', 'Member has been deleted.', 'success');
            queryClient.invalidateQueries(['members', search]);
        },
        onError: () => {
            Swal.fire('Error!', 'Failed to delete member.', 'error');
        }
    })


    const handleDelete = (id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: 'This will remove the member permanently.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result)=>{
            if(result.isConfirmed){
                mutation.mutate(id)
            }
        })
    }
    return (
        <div className='max-w-6xl mx-auto px-4 py-8'>
            <h2 className="text-3xl font-bold text-center text-[#1e3c72]">Manage Member</h2>

            <div>
                <input type="text" placeholder='Search by name' value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='input input-bordered w-full max-w-sm' />

                {isLoading ? (
                    <div className="min-h-[300px] flex justify-center items-center">
                        <Loading />
                    </div>
                ) : members.length === 0 ? (
                    <p className="text-center text-gray-500">No members found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-gradient-to-r from-[#1e3c72] to-[#2a5298] text-white">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map(member => (
                                    <tr key={member._id} className='text-center'>
                                        <td>{member.name || 'N/A'}</td>
                                        <td>{member.email}</td>
                                        <td>
                                            <button onClick={()=>handleDelete(member._id)}
                                            className='btn btn-error text-white'><FaTrash /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageMembers;