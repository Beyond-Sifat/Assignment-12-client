import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaCalendarAlt, FaClock, FaMoneyBillWave } from 'react-icons/fa';
import useAxiosSecu from '../../Hooks/useAxiosSecu';

const Courts = () => {
  const axiosSecure = useAxiosSecu();

  const { data: courts = [], isLoading } = useQuery({
    queryKey: ['courts'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/courts`);
      return res.data;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#1e3c72]">All Available Courts</h2>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <span className="loading loading-bars loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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

                <div className="text-sm text-gray-700 flex items-center gap-2">
                  <FaClock className="text-primary" />
                  <span>Available Slots:</span>
                </div>

                <select className="select select-bordered w-full text-sm">
                  <option disabled selected>Select a slot</option>
                  {court.slots.map((slot, i) => (
                    <option key={i}>{slot}</option>
                  ))}
                </select>

                <p className="text-sm flex items-center gap-2 mt-2 text-green-600 font-medium">
                  <FaMoneyBillWave /> Price per Session: ${court.price}
                </p>

                <button className="btn btn-primary btn-block mt-4">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courts;
