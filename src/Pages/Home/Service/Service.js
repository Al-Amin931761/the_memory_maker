import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Service.css';
import { BsArrowRightSquare } from 'react-icons/bs';

const Service = ({ service }) => {
    const { name, price, picture, description } = service;
    return (
        <div className='service'>
            <img width={290} src={picture} alt="" />
            <h2>{name}</h2>
            <p>{price}</p>
            <p><small>{description}</small></p>
            <Link to='/checkout'><Button variant="outline-dark">Checkout <BsArrowRightSquare className='fs-3' /></Button></Link>
        </div>
    );
};

export default Service;