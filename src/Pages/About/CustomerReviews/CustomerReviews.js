import React, { useEffect, useState } from 'react';
import './CustomerReviews.css';
import { BsPeopleFill } from 'react-icons/bs';
import CustomerReview from './CustomerReview/CustomerReview';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

const CustomerReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        fetch('https://the-memory-maker-server.vercel.app/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [reviews])

    return (
        <div>
            <h1 className='text-center fw-bold second-font mb-3'><BsPeopleFill className='mb-1' /> Love from customers! <BsPeopleFill className='mb-1' /></h1>

            <div className='reviews'>
                {
                    reviews.map(data => <CustomerReview key={data._id} data={data}></CustomerReview>)
                }
            </div>

            {/* add review button */}
            {
                (user?.email === 'alamin931761@gmail.com') ? '' : <div className='d-flex justify-content-center'>
                    <Link to='/dashboard/addReview' className='text-center common-link btn btn-outline-dark'>Add Review</Link>
                </div>
            }
        </div>
    );
};

export default CustomerReviews;