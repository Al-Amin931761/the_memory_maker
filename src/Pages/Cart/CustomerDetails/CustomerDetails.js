import React, { useContext, useRef } from 'react';
import PageTitle from '../../Shared/PageTitle/PageTitle';
import auth from '../../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { CUSTOMER_INFORMATION_CONTEXT } from '../../../context/CustomerInformation';
import { HiOutlineArrowRight } from 'react-icons/hi';
import './CustomerDetails.css';
import OrderSummary from '../OrderSummary/OrderSummary';
import { toast } from 'react-toastify';

const CustomerDetails = () => {
    const [user] = useAuthState(auth);
    const { details, setDetails } = useContext(CUSTOMER_INFORMATION_CONTEXT);

    // continue button 
    let button;
    if (details?.name) {
        button = <Link to='/checkout' className='btn btn-outline-dark'>Continue <HiOutlineArrowRight /></Link>
    } else {
        button = <button className='btn btn-outline-dark' disabled>Continue <HiOutlineArrowRight /></button>
    }

    // form 
    const countryRef = useRef('');
    const addressRef = useRef('');
    const cityRef = useRef('');
    const stateOrProvinceRef = useRef('');
    const postalCodeRef = useRef('');
    const phoneNumberRef = useRef('');
    const handleCustomerDetails = (event) => {
        event.preventDefault();
        const customerInfo = {
            name: user?.displayName,
            email: user?.email,
            country: countryRef.current.value,
            address: addressRef.current.value,
            city: cityRef.current.value,
            state: stateOrProvinceRef.current.value,
            postalCode: postalCodeRef.current.value,
            phoneNumber: phoneNumberRef.current.value
        }
        setDetails(customerInfo);
        event.target.reset();
        toast.success('Details submitted successfully');
    };

    return (
        <div className='common-styles'>
            <PageTitle title="Customer Details"></PageTitle>
            <h1 className="second-font text-center fw-bold mb-3">Customer Details</h1>

            <div className='customer-details-container'>
                <form onSubmit={handleCustomerDetails}>
                    {/* name */}
                    <div className="form-floating">
                        <input value={user?.displayName} type="text" className="form-control" id="name" placeholder="Name" required readOnly />
                        <label htmlFor="name">Name</label>
                    </div>

                    {/* email */}
                    <div className="form-floating my-3">
                        <input value={user?.email} type="email" className="form-control" id="email-address" placeholder="Email" required readOnly />
                        <label htmlFor="email-address">Email Address</label>
                    </div>

                    {/* country */}
                    <div className="form-floating">
                        <input ref={countryRef} type="text" className="form-control" id="country" placeholder="Country" required />
                        <label htmlFor="country">Country</label>
                    </div>

                    {/* address */}
                    <div className="form-floating my-3">
                        <input ref={addressRef} type="text" className="form-control" id="address" placeholder="Address" required />
                        <label htmlFor="address">Address</label>
                    </div>

                    {/* city */}
                    <div className="form-floating my-3">
                        <input ref={cityRef} type="text" className="form-control" id="city" placeholder="City" required />
                        <label htmlFor="city">City</label>
                    </div>

                    {/* state / province */}
                    <div className="form-floating my-3">
                        <input ref={stateOrProvinceRef} type="text" className="form-control" id="state-or-province" placeholder="State / Province" required />
                        <label htmlFor="state-or-province">State / Province</label>
                    </div>

                    {/* zip / postal code */}
                    <div className="form-floating my-3">
                        <input ref={postalCodeRef} type="number" className="form-control" id="postal-code" placeholder="zip / postal code" required />
                        <label htmlFor="postal-code">Zip / Postal Code</label>
                    </div>

                    {/* phone Number */}
                    <div className="form-floating my-3">
                        <input ref={phoneNumberRef} type="number" className="form-control" id="phone-number" placeholder="Phone Number" required />
                        <label htmlFor="phone-number">Phone Number</label>
                    </div>
                    <input type="submit" value="Submit" className='btn btn-outline-dark' />
                </form>

                <div className='inline-block order-summary'>
                    <div>
                        <OrderSummary></OrderSummary>
                    </div>
                </div>
            </div>

            <div className='d-flex justify-content-center mt-3'>
                {button}
            </div >
        </div >
    );
};

export default CustomerDetails;