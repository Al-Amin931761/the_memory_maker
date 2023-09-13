import React from 'react';
import Photography from '../Photography/Photography';
import PageTitle from '../../Shared/PageTitle/PageTitle';
import TravelDates from '../TravelDates/TravelDates';
import HeroSection from '../HeroSection/HeroSection';

const Home = () => {
    return (
        <div className='common-styles'>
            <PageTitle title="Home"></PageTitle>
            <HeroSection></HeroSection>
            <div className='text-center fs-2 my-5'>
                <p>I love capturing laughter, giggles, and lovely memories!​</p>
                <p>I offer fashion, personal, outdoor, birthday, kids, newborn & babies, commercial, product, e-commerce, and event photography, if you want anything else let's chat and we can come up with something to fit what you need!</p>
            </div>
            <Photography></Photography>
            <TravelDates></TravelDates>
        </div >
    );
};

export default Home;