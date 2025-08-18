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
    const [currentPage, setCurrentPage] = useState(1);



    const navigate = useNavigate();
    const { user } = useAuth();


    const { data: courts = [], isLoading } = useQuery({
        queryKey: ['courts'],
        queryFn: async () => {
            const res = await axiosSecu.get(`/courts`);
            return res.data
        }
    })



    //pagination
    const { data: courtCountData = {} } = useQuery({
        queryKey: ['courtCount'],
        queryFn: async () => {
            const res = await axiosSecu.get(`/courts/count`);
            return res.data;
        }
    })

    const itemsPerPage = 6;

    const totalCourts = courtCountData?.total || 0;
    const totalPages = Math.ceil(totalCourts / itemsPerPage)


    const paginatedCourts = courts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    // console.log(paginatedCourts)

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };




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
        <div className="min-h-screen text-[#1e3c72] py-12">
            <div className="max-w-7xl mx-auto px-4">
                <h2
                    className="text-4xl font-extrabold text-center mb-10 drop-shadow-lg"
                    data-aos="fade-up"
                >
                    All Available Courts
                </h2>

                {isLoading ? (
                    <div className="flex justify-center items-center min-h-[300px]">
                        <Loading />
                    </div>
                ) : (
                    <>
                        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {paginatedCourts.map((court) => (
                                <div
                                    key={court._id}
                                    className="rounded-2xl overflow-hidden shadow-lg hover:shadow-gray-800 bg-white text-gray-900"
                                    data-aos="zoom-in"
                                >
                                    <img
                                        src={court.image}
                                        alt={court.name}
                                        className="h-52 w-full object-cover"
                                    />
                                    <div className="p-5 space-y-3">
                                        <h3 className="text-2xl font-bold text-[#1e3c72]">
                                            {court.name}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Type: {court.type}
                                        </p>
                                        <p className="text-lg font-semibold text-green-600">
                                            ${court.price} / slot
                                        </p>
                                        <button
                                            onClick={() => handleBook(court)}
                                            className="btn btn-primary w-full bg-gradient-to-r from-[#1e3c72] to-[#2a5298] text-white border-none hover:opacity-90"
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="mt-10 flex justify-center gap-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className="btn btn-sm"
                                    disabled={currentPage === 1}
                                >
                                    Prev
                                </button>

                                {[...Array(totalPages).keys()].map((num) => (
                                    <button
                                        key={num + 1}
                                        onClick={() => handlePageChange(num + 1)}
                                        className={`btn btn-sm ${currentPage === num + 1
                                            ? 'bg-[#1e3c72] text-white'
                                            : 'btn-ghost'
                                            }`}
                                    >
                                        {num + 1}
                                    </button>
                                ))}

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className="btn btn-sm"
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}

                {/* Booking Modal */}
                {bookingInfo && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">
                            <h2 className="text-xl font-bold mb-3 text-[#1e3c72]">
                                {bookingInfo.court.name}
                            </h2>
                            <p className="text-sm text-gray-600 mb-2">
                                Type: {bookingInfo.court.type}
                            </p>

                            <label className="label font-medium text-gray-800">
                                Select Date
                            </label>
                            <input
                                type="date"
                                className="input input-bordered w-full mb-3"
                                value={bookingInfo.date}
                                onChange={(e) =>
                                    setBookingInfo({ ...bookingInfo, date: e.target.value })
                                }
                            />

                            <label className="label font-medium text-gray-800">
                                Select Slots
                            </label>
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
                            <p className="text-green-600 font-semibold">
                                Total Price: $
                                {bookingInfo.slots.length * bookingInfo.court.price}
                            </p>

                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    className="btn"
                                    onClick={() => setBookingInfo(null)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn bg-gradient-to-r from-[#1e3c72] to-[#2a5298] text-white border-none hover:opacity-90"
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
        </div>
    );
};

export default Courts;