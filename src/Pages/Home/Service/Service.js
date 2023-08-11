import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Service.css';
import { BsArrowRight } from 'react-icons/bs';

const Service = ({ service }) => {
    const { name, price, picture, description } = service;
    return (
        <div className='service shadow-lg'>
            <img width={290} src={picture} alt="" />
            <h2>{name}</h2>
            <h4>{price}</h4>
            <p>{description}</p>
            <Link to='/checkout'><Button variant="outline-dark">Checkout <BsArrowRight style={{ marginBottom: '2px' }} /></Button></Link>
        </div>
    );
};

export default Service;