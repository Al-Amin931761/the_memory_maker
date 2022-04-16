import React from 'react';
import './Service.css';

const Service = ({ service }) => {
    const { name, price, picture, description } = service;
    return (
        <div className='service'>
            <img width={290} src={picture} alt="" />
            <h2>{name}</h2>
            <p>{price}</p>
            <p><small>{description}</small></p>
            <button className='checkout'>Checkout</button>
        </div>
    );
};

export default Service;