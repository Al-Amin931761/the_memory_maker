import React from 'react';
import PageTitle from '../../Shared/PageTitle/PageTitle';
import CheckoutForm from './CheckoutForm/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import OrderSummary from '../OrderSummary/OrderSummary';
import './Checkout.css';

const Checkout = () => {
    const stripePromise = loadStripe('pk_test_51L4PWfLjrmUqnITL4TDtVJQQb9fne5taAj6AYMgv1WRYo6WqERdQ2bxlLgMjNTV3HQQq2fAcBpDPi4GbYkLLlQCa00Tltuz0Tl');

    return (
        <div className='common-styles'>
            <PageTitle title='Checkout'></PageTitle>

            <div className='checkout'>
                <div className='checkout-form'>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                </div>

                <div className='summary'>
                    <OrderSummary></OrderSummary>
                </div>
            </div>
        </div>
    );
};

export default Checkout;