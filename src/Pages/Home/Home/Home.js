import React from 'react';
import Banner from '../Banner/Banner';
import Photography from '../Photography/Photography';
import Services from '../Services/Services';
import './home.css';

const Home = () => {
    return (
        <div >
            <Banner></Banner>
            <Photography></Photography>
            <Services></Services>
        </div>
    );
};

export default Home;