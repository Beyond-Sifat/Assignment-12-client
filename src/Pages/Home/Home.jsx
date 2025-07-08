import React from 'react';
import Banner from '../../Components/Banner/Banner';
import AboutSM from '../../Components/AboutSM/AboutSM';
import Address from '../../Components/Address/Address';
import Discount from '../../Components/Discount/Discount';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AboutSM></AboutSM>
            <Address></Address>
            <Discount></Discount>
        </div>
    );
};

export default Home;