import React, { useRef, useState } from 'react';
import './CustomerReview.css';
import { StarPicker } from 'react-star-picker';
import { BiSolidEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import auth from '../../../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button, Modal } from 'react-bootstrap';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CustomerReview = ({ data }) => {
    const [user] = useAuthState(auth);
    const { name, rating, review, today, email, _id } = data;
    const [reviewId, setReviewId] = useState('');
    const navigate = useNavigate('');
    // update modal 
    const [updateModalShow, setUpdateModalShow] = useState(false);
    // delete modal 
    const [showReviewDeleteModal, setShowReviewDeleteModal] = useState(false);
    const deleteReviewModalClose = () => setShowReviewDeleteModal(false);
    const deleteModalShow = () => setShowReviewDeleteModal(true);



    // edit and delete icon 
    let updateReviewIcon;
    let deleteReviewIcon;
    if (email === user?.email) {
        updateReviewIcon = <span className='me-2' onClick={() => setUpdateModalShow(true)}><button onClick={() => setReviewId(_id)} className='btn btn-outline-dark'><BiSolidEdit className='fs-3' /></button></span>

        deleteReviewIcon = <span onClick={() => deleteModalShow(true)}><button onClick={() => setReviewId(_id)} className='btn btn-outline-danger'><AiFillDelete className='fs-3' /></button></span>
    };

    // edit review 
    const reviewRef = useRef("");
    const handleUpdateReview = event => {
        event.preventDefault();
        const review = reviewRef.current.value;
        if (reviewId) {
            fetch(`https://the-memory-maker-server.vercel.app/review/${reviewId}`, {
                method: "PATCH",
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }, body: JSON.stringify({ review })
            }).then(res => {
                if (res.status === 401 || res.status === 403) {
                    signOut(auth);
                    localStorage.removeItem('accessToken');
                    navigate('/login');
                }
                return res.json();
            })
                .then(data => {
                    if (data?.modifiedCount > 0) {
                        toast.success('Review updated successfully');
                    }
                })
        }
    }

    // delete review 
    const handleDeleteReview = () => {
        fetch(`https://the-memory-maker-server.vercel.app/review/${reviewId}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    signOut(auth);
                    localStorage.removeItem('accessToken');
                    navigate('/login');
                }
                return res.json();
            })
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success(`Your review has been successfully deleted`)
                }
            })
    }

    return (
        <div data-aos="fade-down" data-aos-duration="2000">
            <div className='border border-2 rounded p-2 review common-hover-effect customer-review-container'>
                <p className='second-font fs-3 text-center m-0'>{name}</p>

                <StarPicker value={rating} halfStars size={40} className='text-center' />
                <p className='m-0'>{review}</p>
                <p className='text-end m-0'>{today}</p>
                <div className='update-review-button'>
                    {updateReviewIcon}
                    {deleteReviewIcon}
                </div>
            </div >

            {/* update review modal */}
            <div>
                <Modal size="lg" backdrop="static" keyboard={false} show={updateModalShow} onHide={() => setUpdateModalShow(false)} aria-labelledby="update-review-modal">
                    <Modal.Header closeButton>
                        <Modal.Title data-aos="fade-down" data-aos-duration="1000" className='second-font' id="update-review-modal">
                            Update Review
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body data-aos="fade-down" data-aos-duration="1000">
                        <form onSubmit={handleUpdateReview}>
                            <div className="form-floating w-100 edit-review">
                                <textarea ref={reviewRef} className="form-control w-100" placeholder="Leave a comment here" id="review" required />
                                <label htmlFor="review">Review content</label>
                            </div>

                            <Button className='my-3' variant="outline-dark" type="submit">
                                Update
                            </Button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>

            {/* delete review modal */}
            <div>
                <Modal show={showReviewDeleteModal} onHide={deleteReviewModalClose} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title className='second-font' data-aos="fade-down" data-aos-duration="1000">Delete Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='fs-5' data-aos="fade-down" data-aos-duration="1000">Are you sure to delete your review?</Modal.Body>
                    <Modal.Footer data-aos="fade-down" data-aos-duration="1000">
                        <Button variant="outline-dark" onClick={deleteReviewModalClose}>Close</Button>
                        <Button variant="outline-danger" onClick={handleDeleteReview}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default CustomerReview;