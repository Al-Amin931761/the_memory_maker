import React from 'react';
import './Checkout.css';

const Checkout = () => {
    return (
        <div className='checkout-container mt-5'>
            <h3 className='text-center'>Welcome to Checkout Page</h3>

            <form className='checkout-form'>
                <input type="text" name="name" id="" placeholder='Name' />
                <input type="text" name="phone" id="" placeholder='Phone Number' />
                <input type="text" name="address" id="" placeholder='Address' />
                <input type="date" name="" id="" />
                <input type="submit" value="Submit" />

            </form>
        </div>
    );
};

export default Checkout;