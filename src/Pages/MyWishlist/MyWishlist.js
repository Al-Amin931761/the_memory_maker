import React from 'react';
import PageTitle from '../Shared/PageTitle/PageTitle';
import useWishlist from '../../hooks/useWishlist';
import Wishlist from './Wishlist/Wishlist';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const MyWishlist = () => {
    const { myWishlistArray } = useWishlist();

    let wishlist = []
    if (myWishlistArray?.length > 0 && myWishlistArray[0]?._id) {
        wishlist = <div className='prints-container'>
            {
                myWishlistArray?.map(data => <Wishlist key={data._id} data={data}></Wishlist>)
            }
        </div>
    } else {
        wishlist = <div className='d-flex flex-column align-items-center justify-content-center vh-100'>
            <p className='fs-4 mb-3'>You have nothing in your wishlist.</p>
            <Link to='/prints' className='btn btn-outline-dark'><BsArrowLeft className='me-1' style={{ marginBottom: '2px' }} />Back to Prints</Link>
        </div>
    }

    return (
        <div className='common-styles'>
            <PageTitle title="My Wishlist"></PageTitle>
            <h1 className='text-center second-font fw-bold mb-3'>My Wishlist ({myWishlistArray.length})</h1>

            {wishlist}
        </div>
    );
};

export default MyWishlist;