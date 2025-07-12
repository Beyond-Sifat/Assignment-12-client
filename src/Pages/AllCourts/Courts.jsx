import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecu from '../../Hooks/useAxiosSecu';
import { useNavigate } from 'react-router';
import Loading from '../../Components/Loading';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';



const Courts = () => {
    const axiosSecu = useAxiosSecu();
    const [bookingInfo, setBookingInfo] = useState(null);
    const navigate = useNavigate();
    const { user } = useAuth();


    const { data: courts = [], isLoading } = useQuery({
        queryKey: ['courts'],
        queryFn: async () => {
            const res = await axiosSecu.get(`/courts`);
            return res.data
        }
    })

    const handleBook = (court) => {
        if (!user) {
            return navigate('/login')
        }
        setBookingInfo({
            court,
            slots: [],
            date: ''
        })
    }

    const handleSlotChange = (e) => {
        const { value, checked } = e.target;
        const updatedSlots = checked
            ? [...bookingInfo.slots, value]
            : bookingInfo.slots.filter(slot => slot !== value);

        setBookingInfo({ ...bookingInfo, slots: updatedSlots });
    };

    const handleConfirmBooking = async () => {
        const { court, slots, date } = bookingInfo;
        const totalPrice = court.price * slots.length;

        const bookingData = {
            courtId: court._id,
            courtName: court.name,
            type: court.type,
            slots,
            date,
            price: totalPrice,
            email: user.email,
            status: 'pending',
            bookingTime: new Date()
        };

        try {
            const res = await axiosSecu.post(`/bookings`, bookingData);
            if (res.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Booking Confirmed!',
                    text: 'Your booking has been submitted and is pending approval.'
                });
                setBookingInfo(null); // Close modal
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Booking Failed!',
                text: err?.response?.data?.message || 'Something went wrong. Please try again.'
            });
        }
    }




    return (
        <div className='max-w-7xl mx-auto px-4 py-8'>
            <h2 className='text-3xl font-bold text-center text-[#1e3c72] mb-8'>All Available Court</h2>

            {isLoading ? (
                <div className="flex justify-center items-center min-h-[300px]">
                    <Loading></Loading>
                </div>
            ) : (
                <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    {courts.map((court) => (
                        <div key={court._id} className="rounded-xl shadow-md border hover:shadow-lg transition duration-300 bg-white">
                            <img
                                src={court.image}
                                alt={court.name}
                                className="h-48 w-full object-cover rounded-t-xl"
                            />
                            <div className="p-4 space-y-3">
                                <h3 className="text-xl font-semibold text-gray-800">{court.name}</h3>
                                <p className="text-sm text-gray-600">Type: {court.type}</p>

                                <button
                                    onClick={() => handleBook(court)}
                                    className="btn btn-primary btn-block mt-4"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {bookingInfo && (
                <div className="fixed inset-0 backdrop-blur-2xl bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-3">{bookingInfo.court.name}</h2>
                        <p className="text-sm text-gray-600">Type: {bookingInfo.court.type}</p>

                        <label className="label">Select Date</label>
                        <input
                            type="date"
                            className="input input-bordered w-full mb-2"
                            value={bookingInfo.date}
                            onChange={(e) => setBookingInfo({ ...bookingInfo, date: e.target.value })}
                        />

                        <label className="label">Select Slots</label>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {bookingInfo.court.slots.map((slot, idx) => (
                                <label key={idx} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        value={slot}
                                        checked={bookingInfo.slots.includes(slot)}
                                        onChange={handleSlotChange}
                                        className="checkbox checkbox-sm checkbox-primary"
                                    />
                                    <span>{slot}</span>
                                </label>
                            ))}
                        </div>
                        <p className='text-green-600 font-semibold'>Total Price: ${bookingInfo.slots.length * bookingInfo.court.price}</p>

                        <div className="flex justify-end gap-2 mt-4">
                            <button className="btn" onClick={() => setBookingInfo(null)}>Cancel</button>
                            <button
                                className="btn btn-primary"
                                onClick={handleConfirmBooking}
                                disabled={!bookingInfo.date || bookingInfo.slots.length === 0}
                            >
                                Confirm Booking
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Courts;