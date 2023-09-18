import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Package.css';
import { BsArrowRight } from 'react-icons/bs';

const Package = ({ data }) => {
    const { name, price, picture, description } = data;
    return (
        <div className='package shadow-lg common-hover-effect'>
            <div data-aos="zoom-in" data-aos-duration="3000">
                <img width={290} src={picture} alt="" />
            </div>
            <h2 className='second-font'>{name}</h2>
            <h4>{price}</h4>
            <p>{description}</p>
            <Link to='/contact'><Button variant="outline-dark text-uppercase second-font">Request a session <BsArrowRight style={{ marginBottom: '2px' }} /></Button></Link>
        </div>
    );
};

export default Package;