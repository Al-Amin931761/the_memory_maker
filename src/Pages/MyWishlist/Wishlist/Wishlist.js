import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import useWishlist from '../../../hooks/useWishlist';
import { toast } from 'react-toastify';

const Wishlist = ({ data }) => {
    const [user] = useAuthState(auth);
    const { _id, image, name } = data;
    const { userInfo } = useWishlist();

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/printDetails/${_id}`);
    };

    const handleRemove = (id) => {
        if (userInfo.arrayOfWishlistIds) {
            const arrayOfWishlistIds = userInfo.arrayOfWishlistIds.filter(wishlistId => wishlistId !== id);

            fetch(`http://localhost:5000/myWishlist/${user?.email}`, {
                method: "PATCH",
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({ arrayOfWishlistIds })
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
                    if (data?.modifiedCount) {
                        toast.success(`${name} - has been removed successfully`);
                    }
                })
        }



    }

    return (
        <div className='print-container common-hover-effect border border-2 rounded-bottom'>
            <div onClick={handleNavigate}>
                <div className='print-image' data-aos="zoom-in" data-aos-duration="3000">
                    <img src={image} alt="" />
                </div>
                <div className='my-2'>
                    <p className='text-center m-0 second-font fs-3'>{name}</p>
                    <p className='text-center m-0'>Starting at $150.00</p>
                </div>
            </div>
            <div className='text-center mb-2'>
                <button onClick={() => handleRemove(_id)} type="button" className="btn btn-outline-danger">Remove</button>
            </div>
        </div>
    );
};

export default Wishlist;