import React, { useRef, useState } from 'react';
import './AddReview.css';
import PageTitle from '../../Shared/PageTitle/PageTitle';
import Sidebar from '../Sidebar/Sidebar';
import { StarPicker } from 'react-star-picker';
import reviewImage from '../../../images/review.png';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddReview = () => {
    const [rating, setRating] = useState(null);
    const [user] = useAuthState(auth);

    // ratings 
    const onChange = (value) => {
        setRating(value);
    };

    const navigate = useNavigate('')
    const reviewRef = useRef('');
    const handleReview = event => {
        event.preventDefault();

        // date 
        const today = new Date();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August ", "September", "October", "November", "December"];
        const month = months[today.getMonth()];
        const year = today.getFullYear();
        const date = today.getDate();

        const review = {
            name: user?.displayName,
            email: user?.email,
            rating: rating,
            review: reviewRef.current.value,
            today: `${date} ${month}${year}`
        }

        fetch('http://localhost:5000/review', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(review)
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    signOut(auth);
                    localStorage.removeItem("accessToken");
                }
                return res.json();
            })
            .then(data => {
                if (data.acknowledged) {
                    toast.success("Review submitted successfully");
                    setTimeout(() => {
                        navigate('/about');
                    }, 5000);
                } else {
                    toast.error("Review was not successfully submitted");
                }
            })
        setRating(null);
        event.target.reset();
    };

    return (
        <div className='common-styles'>
            <PageTitle title='Add Review'></PageTitle>
            <div className='d-flex align-items-center'>
                <Sidebar />
                <h1 className='title-margin second-font fw-bold mb-3'>Leave a Review</h1>
            </div>

            <div className='review-container'>
                {/* image */}
                <div data-aos="fade-right" data-aos-offset="300" data-aos-duration="1500" data-aos-easing="ease-in-sine">
                    <img className='img-fluid' src={reviewImage} alt="" />
                </div>

                {/* review and ratings */}
                <div className='review-and-ratings' data-aos="fade-left" data-aos-offset="300" data-aos-duration="1500" data-aos-easing="ease-in-sine">
                    {/* ratings */}
                    <div className='my-3 d-flex flex-column align-items-center mt-3'>
                        <p className='mb-0'>Click stars to rate</p>
                        <StarPicker onChange={onChange} value={rating} halfStars doubleTapResets={true} numberStars={5} size={60} />
                    </div>

                    {/* review */}
                    <form onSubmit={handleReview} className='review w-100 px-3'>
                        <div className="form-floating w-100">
                            <textarea ref={reviewRef} className="form-control w-100" placeholder="Leave a comment here" id="review" required />
                            <label htmlFor="review">Review content</label>
                        </div>
                        <div className='my-3 d-flex justify-content-center'>
                            <button className={`py-2 ${!rating ? "btn btn-dark" : "btn btn-outline-dark"}`} disabled={!rating} type="submit">Submit Your Review</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddReview;