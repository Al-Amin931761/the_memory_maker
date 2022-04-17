import React from 'react';
import { Link } from 'react-router-dom';
import './Service.css';

const Service = ({ service }) => {
    const { name, price, picture, description } = service;
    return (
        <div className='service'>
            <img width={290} src={picture} alt="" />
            <h2>{name}</h2>
            <p>{price}</p>
            <p><small>{description}</small></p>
            <Link className='btn btn-success' to='/checkout'>Checkout</Link>
        </div>
    );
};

export default Service;