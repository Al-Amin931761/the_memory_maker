import React from 'react';
import './Checkout.css';

const Checkout = () => {

    const handleSubmit = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const phone = event.target.phone.value;
        const address = event.target.address.value;
        const date = event.target.date.value;
        // console.log(name, phone, address, date);
    }
    return (
        <div className='checkout-container mt-5'>
            <h3 className='text-center'>Welcome to Checkout Page</h3>

            <form className='checkout-form' onSubmit={handleSubmit}>
                <input type="text" name="name" id="" placeholder='Name' />
                <input type="text" name="phone" id="" placeholder='Phone Number' />
                <input type="text" name="address" id="" placeholder='Address' />
                <input type="date" name="date" id="" />
                <input type="submit" value="Submit" />

            </form>
        </div>
    );
};

export default Checkout;