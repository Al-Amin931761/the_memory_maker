import React from 'react';
import './Checkout.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {

    const handleSubmit = event => {
        event.preventDefault();
        let name = event.target.name.value;
        const phone = event.target.phone.value;
        const address = event.target.address.value;
        const date = event.target.date.value;
        toast("Thank You");
    }

    return (
        <div className='checkout-container mt-5'>
            <h3 className='text-center fw-bold mb-5'>Welcome to Checkout Page</h3>

            <form className='checkout-form' onSubmit={handleSubmit}>
                <input type="text" name="name" id="" placeholder='Name' required />
                <input type="text" name="phone" id="" placeholder='Phone Number' required />
                <input type="text" name="address" id="" placeholder='Address' required />
                <input type="date" name="date" id="" required />
                <input id='button' type="submit" className='btn btn-outline-dark' value="Submit" />
                <ToastContainer />
            </form>
        </div>
    );
};

export default Checkout;