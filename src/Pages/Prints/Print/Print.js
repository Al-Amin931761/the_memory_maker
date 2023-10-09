import React from 'react';
import './Print.css';
import { useNavigate } from 'react-router-dom';

const Print = ({ data }) => {
    const { _id, image, name } = data;

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/prints/${_id}`);
    }

    return (
        <div className='print-container common-hover-effect border border-2 rounded-bottom' onClick={handleNavigate}>
            <div className='print-image' data-aos="zoom-in" data-aos-duration="3000">
                <img src={image} alt="" />
            </div>
            <div className='my-2'>
                <p className='m-0 text-center second-font fs-3'>{name}</p>
                <p className='m-0 text-center'>Starting at $150.00</p>
            </div>
        </div>
    );
};

export default Print;