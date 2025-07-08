import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cube';

const Banner = () => {
    return (
        <div className="max-w-6xl mx-auto my-10 px-4 ">
            <div className="text-center mb-6">
                <h2 className='text-3xl md:text-4xl font-bold text-[#1e3c72]'>Welcome to Our Sports Master</h2>
                <p className='mt-2 text-base md:text-lg text-gray-600 max-w-2xl mx-auto'> Discover world-class courts, exciting activities, and a thriving community of sports enthusiasts. Whether you're a beginner or a pro, our club offers the perfect environment to train, play, and connect.</p>
            </div>


            <div className='rounded-xl overflow-hidden shadow-lg'>
                <Swiper
                    modules={[EffectCube, Autoplay]}
                    effect="cube"
                    grabCursor={true}
                    autoplay={{ delay: 1500 }}
                    cubeEffect={{
                        shadow: true,
                        slideShadows: true,
                        shadowOffset: 20,
                        shadowScale: 0.94,
                    }}
                    className="h-[400px] w-full"
                >
                    <SwiperSlide>
                        <img src="/images/Lobby.jpg" alt="Club" className="h-full w-full object-cover" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/images/TannisCourt2.jpg" alt="Courts" className="h-full w-full object-cover" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/images/Basketball Activity.jpg" alt="Activities" className="h-full w-full object-cover" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/images/BasketBall.jpg" alt="Activities" className="h-full w-full object-cover" />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};
export default Banner;