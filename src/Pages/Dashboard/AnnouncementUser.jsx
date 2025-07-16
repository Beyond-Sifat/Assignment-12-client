import React from 'react';
import useAxiosSecu from '../../Hooks/useAxiosSecu';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading';
import { FaRegCalendarAlt } from 'react-icons/fa';

const AnnouncementUser = () => {
    const axiosSecure = useAxiosSecu();
    const { data: announcements = [], isLoading } = useQuery({
        queryKey: ['announcement'],
        queryFn: async () => {
            const res = await axiosSecure.get('/user/announcements')
            return res.data
        }
    })
    return (
        <div className='max-w-6xl mx-auto  py-10 px-4'>
            <h2 className="text-4xl font-bold text-center text-[#1e3c72] mb-8">Announcements</h2>

            {isLoading ? (
                <Loading></Loading>
            ) : announcements.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">No announcements yet.</p>
            ) : (
                announcements.map(announcement => (
                    <div key={announcement._id} className='my-5 bg-white border-l-4 border-blue-600 border-r-4  p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
                        <div className='flex items-start gap-3'>
                            <div className='flex-1'>
                                <h4 className="text-2xl font-semibold text-gray-800">{announcement.title}</h4>
                                <p className="text-gray-700">{announcement.message}</p>
                                <div className='text-sm text-gray-500 mt-3 flex items-center gap-2'>
                                    <FaRegCalendarAlt className="text-blue-500" />
                                    <span>{new Date(announcement.createdAt).toLocaleString()}</span>

                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default AnnouncementUser;