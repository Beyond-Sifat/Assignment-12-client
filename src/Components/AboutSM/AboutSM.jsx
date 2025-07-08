import React from 'react';
import { FaHistory, FaBullseye } from 'react-icons/fa';

const AboutSM = () => {
    return (
        <section className="bg-gradient-to-br from-[#e8eef6] to-[#f0f4ff] py-12 px-4">
            <div className="max-w-6xl mx-auto text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e3c72] mb-2">
                    About Our Club
                </h2>
                <div className="w-24 h-1 bg-[#2a5298] mx-auto mb-4 rounded"></div>
                <p className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto">
                    We are more than just a sports club – we are a community built around passion, performance, and progress.
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                {/* History */}
                <div data-aos="fade-down-right" className="relative bg-white rounded-xl shadow-md border-l-4 border-blue-500 p-6 transition transform hover:scale-105 hover:shadow-xl duration-300">
                    <FaHistory className="absolute -top-5 left-5 text-blue-500 text-3xl bg-white p-1 rounded-full shadow-md" />
                    <h3 className="text-2xl font-semibold text-blue-700 mb-3 pl-8">Our History</h3>
                    <p className="text-gray-700 pl-2">
                        Founded in 2010, our club began with just two courts and a vision to promote healthy living through sports. Over the years, we've grown into a premier destination for athletes of all levels, offering state-of-the-art facilities and expert coaching.
                    </p>
                </div>

                {/* Mission */}
                <div data-aos="fade-up-left" className=" relative bg-white rounded-xl shadow-md border-l-4 border-orange-400 p-6 transition transform hover:scale-105 hover:shadow-xl duration-300">
                    <FaBullseye className="absolute -top-5 left-5 text-orange-400 text-3xl bg-white p-1 rounded-full shadow-md" />
                    <h3 className="text-2xl font-semibold text-orange-600 mb-3 pl-8">Our Mission</h3>
                    <p className="text-gray-700 pl-2">
                        Our mission is to inspire and empower individuals through inclusive sports programs, fostering teamwork, discipline, and excellence. We aim to be a hub of community wellness, where members grow not just as athletes but as people.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutSM;
