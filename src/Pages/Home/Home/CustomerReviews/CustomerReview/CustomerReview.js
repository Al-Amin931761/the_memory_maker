import React from 'react';

const CustomerReview = ({ data }) => {
    const { email, image, name, rating, review, today } = data;
    return (
        <div className='border border-2 border primary shadow'>
            <img className='w-50' src={image} alt="" />
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Rating: {rating}</p>
            <p>Review: {review}</p>
            <p>Date: {today}</p>
        </div>
    );
};

export default CustomerReview;