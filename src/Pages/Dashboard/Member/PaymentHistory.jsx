import React, { useState } from 'react';
import useAxiosSecu from '../../../Hooks/useAxiosSecu';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loading';

const PaymentHistory = () => {

    const axiosSecure = useAxiosSecu();
    const { user } = useAuth();
    const [view, setView] = useState('table')

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['paymentHistory', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment/history?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    })

    if (isLoading) return <Loading />;
    // if (isError) return <div className='text-red-500 text-center'>Failed to load payment history</div>
    return (
        <div className='max-w-7xl mx-auto px-4 py-8'>
            <h2 className="text-3xl text-center font-bold mb-6 text-[#1e3c72]">Payment History</h2>

            <div className='text-center mb-4'>
                <button onClick={() => setView(view === 'table' ? 'card' : 'table')}
                    className='btn btn-sm btn-outline btn-primary'>
                    Switch to {view === 'table' ? 'Card' : 'Table'}
                </button>
            </div>

            {payments.length === 0 ? (
                <p className="text-center text-gray-500">No Payment History Found</p>
            ) : view === 'table' ? (
                <div className='overflow-x-auto'>
                    <table className='w-full text-sm md:text-base'>
                        <thead className="bg-gradient-to-r from-[#1e3c72] to-[#2a5298] text-white">
                            <tr>
                                <th className="p-3 border">#</th>
                                <th className="p-3 border">Transaction ID</th>
                                <th className="p-3 border">Amount Paid</th>
                                <th className="p-3 border">Original Price</th>
                                <th className="p-3 border">Discount (%)</th>
                                <th className="p-3 border">Discount Code</th>
                                <th className="p-3 border">Method</th>
                                <th className="p-3 border">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, idx) => (
                                <tr key={payment._id} className='text-center border-b'>
                                    <td className='p-2'>{idx + 1}</td>
                                    <td className='p-2'>{payment.transactionId}</td>
                                    <td className='p-2  text-green-600 font-semibold'>{payment.price}</td>
                                    <td className='p-2  text-gray-500 line-through'>{payment.originalPrice}</td>
                                    <td className='p-2'>{payment.discount || 0}%</td>
                                    <td className='p-2'>{payment.discountCode || 'N/A'}</td>
                                    <td className='p-2'>{payment.method?.join(', ')}</td>
                                    <td className='p-2'>
                                        {new Date(payment.date).toLocaleString('en-GB', {
                                            dateStyle: 'medium',
                                            timeStyle: 'short',
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {payments.map((payment, idx) => (
                        <div key={payment._id} className="card border p-4 shadow-md">
                            <h3 className='text-lg font-semibold mb-1 text-[#1e3c72]'>
                                #{idx + 1} - {payment.transactionId}</h3>

                            <p><span className='font-medium'>Amount Paid:</span><span className='text-green-600 font-semibold'>{payment.price}</span></p>
                            <p><span className='font-medium'>Original Price:</span><span className='line-through text-gray-500'>{payment.originalPrice}</span></p>
                            <p><span className='font-medium'>Discount</span>{payment.discount || 0}%</p>
                            <p><span className='font-medium'>Discount Code</span> {payment.discountCode || 'N/A'}</p>
                            <p><span className='font-medium'>Method</span> {payment.method?.join(', ')}</p>
                            <p><span className='font-medium'>Date</span>
                                {new Date(payment.date).toLocaleString('en-GB', {
                                    dateStyle: 'medium',
                                    timeStyle: 'short',
                                })}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;