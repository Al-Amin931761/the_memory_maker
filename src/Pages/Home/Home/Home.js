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
            <Photography></Photography>
            <Services></Services>
            <CustomerReviews></CustomerReviews>
        </div>
    );
};

export default Home;