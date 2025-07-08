import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaLocationDot } from 'react-icons/fa6';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { IoMdMail } from 'react-icons/io';

const Address = () => {
    return (

        <div className="max-w-6xl mx-auto mt-10">
            <div className='text-center'>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1e3c72] mb-4">Our Location</h2>
                <p className="text-gray-700 text-base md:text-lg space-y-2">
                    <span className="flex items-center justify-center gap-2">
                        <FaLocationDot className="text-[#1e3c72]" />
                        Sports Master, Gulshan, Dhaka, Bangladesh
                    </span>
                    <span className="flex items-center justify-center gap-2">
                        <BsFillTelephoneFill className="text-[#1e3c72]" />
                        +880 123 456 789
                    </span>
                    <span className="flex items-center justify-center gap-2">
                        <IoMdMail className="text-[#1e3c72]" />
                        contact@sportsclubbd.com
                    </span>
                </p>
            </div>
            <div className="my-8 rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto">
                <MapContainer center={[23.7895, 90.4173]} zoom={16}
                    scrollWheelZoom={true}
                    className="h-[400px] w-full rounded-lg shadow-md"
                    style={{ height: '400px' }}>
                    <TileLayer
                        attribution='&copy; OpenStreetMap'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[23.7895, 90.4173]}>
                        <Popup>
                            Sports Master SM, Gulshan
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>

    );
};

export default Address;