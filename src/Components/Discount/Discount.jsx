import React from 'react';

const Discount = () => {
    return (
        <div className='text-center mx-auto max-w-4xl py-12 px-4'>
            <h2 className='text-3xl md:text-4xl font-bold text-[#1e3c72] mb-4'>Exclusive Promotions & Discount Coupons</h2>
            <p className="text-gray-700 text-base md:text-lg">
                Save more while staying active! We offer a variety of discount coupons you can apply during your court or session bookings.
                Use the right coupon code at checkout to get an instant discount on your booking price.
                <br className="hidden md:block" />
                Keep an eye on this section—new offers and seasonal deals are added regularly!
            </p>
        </div>
    );
};

export default Discount;