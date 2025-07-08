import React from 'react';
import Banner from '../../Components/Banner/Banner';
import AboutSM from '../../Components/AboutSM/AboutSM';
import Address from '../../Components/Address/Address';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AboutSM></AboutSM>
            <Address></Address>
        </div>
    );
};

export default Home;