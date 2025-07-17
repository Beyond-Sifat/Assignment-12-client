import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaTags } from 'react-icons/fa';
import axios from 'axios';

const Discount = () => {

    const { data: coupons = [], isLoading } = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/coupons/home')
            return res.data
        }
    })
    return (
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-12 px-6 sm:px-10 rounded-lg shadow-xl max-w-6xl mx-auto my-10">
            <h2 className="text-4xl font-bold text-white text-center mb-8 flex justify-center items-center gap-3">
                <FaTags className="text-yellow-300" />
                Exclusive Promotions & Coupons
            </h2>
            <p className="text-gray-700 text-base md:text-lg">
                Save more while staying active! We offer a variety of discount coupons you can apply during your court or session bookings.
                Use the right coupon code at checkout to get an instant discount on your booking price.
                <br className="hidden md:block" />
                Keep an eye on this section—new offers and seasonal deals are added regularly! 
            </p>
            {isLoading ? (
                <p className="text-white text-center">Loading coupons...</p>
            ) : coupons.length === 0 ? (
                <p className="text-white text-center">No coupons available right now.</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coupons.map(coupon => (
                        <div key={coupon._id} className='bg-white border-2 border-dashed border-yellow-400 rounded-xl p-5 text-center shadow-md hover:scale-105 transition-transform duration-300'>
                            <h3 className='text-xl font-bold text-gray-800 mb-2'>
                                Use Code: <span className="text-purple-600">{coupon.code}</span>
                            </h3>
                            <p className='text-gray-700 text-lg'>
                                Get <span className="text-pink-600 font-semibold">{coupon.discount}% OFF</span> on your booking!
                            </p>
                        </div>
                    ))}
                </div>
            )
            }
        </div>
    );
};

export default Discount;