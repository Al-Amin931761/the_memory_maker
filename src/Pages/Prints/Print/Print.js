import React from 'react';
import './Print.css';
import { useNavigate } from 'react-router-dom';

const Print = ({ data }) => {
    const { _id, image, name } = data;

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/printDetails/${_id}`);
    }

    return (
        <div className='print-container common-hover-effect border border-2 rounded-bottom' onClick={handleNavigate}>
            <div className='print-image'>
                <img src={image} alt="" />
            </div>
            <div className='mt-2'>
                <p className='m-0 text-center second-font fs-3'>{name}</p>
                <p className='m-0 text-center pb-2'>Starting at $150.00</p>
            </div>
        </div>
    );
};

export default Print;