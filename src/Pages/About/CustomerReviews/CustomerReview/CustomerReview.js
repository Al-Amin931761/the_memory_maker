import React from 'react';
import { StarPicker } from 'react-star-picker';

const CustomerReview = ({ data }) => {
    const { name, rating, review, today } = data;

    return (
        <div className='border border-2 rounded p-2 review common-hover-effect' data-aos="fade-down" data-aos-duration="2000">
            <p className='second-font fs-3 text-center m-0'>{name}</p>

            <StarPicker value={rating} halfStars size={40} className='text-center' />
            <p className='m-0'>{review}</p>
            <p className='text-end m-0'>{today}</p>
        </div >
    );
};

export default CustomerReview;