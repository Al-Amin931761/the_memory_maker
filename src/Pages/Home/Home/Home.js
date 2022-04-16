import React from 'react';
import Services from '../Services/Services';

const services = [
    {
        id: 1, name: 'abc', price: 1000, description: 'asdfghjkl'
    }
];

const Home = () => {
    return (
        <div>
            <h3>This is home</h3>
            <Services></Services>
        </div>
    );
};

export default Home;