import React from 'react';
import Banner from '../Banner/Banner';
import Photography from '../Photography/Photography';
import Services from '../Services/Services';
import PageTitle from '../../Shared/PageTitle/PageTitle';
import CustomerReviews from './CustomerReviews/CustomerReviews';

const Home = () => {
    return (
        <div>
            <PageTitle title="Home"></PageTitle>
            <Banner></Banner>
            <div className='text-center fs-2 border border-2 border-primary'>
                <p>I love capturing laughter, giggles, and lovely memories!​</p>
                <p>I offer fashion, personal, outdoor, birthday, kids, newborn & babies, commercial, product, e-commerce, and event photography, if you want anything else let's chat and we can come up with something to fit what you need!</p>
            </div>
            <Photography></Photography>
            <Services></Services>
            <CustomerReviews></CustomerReviews>
        </div>
    );
};

export default Home;