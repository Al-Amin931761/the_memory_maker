import React from 'react';
import PageTitle from '../../Shared/PageTitle/PageTitle';
import CheckoutForm from './CheckoutForm/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import OrderSummary from '../OrderSummary/OrderSummary';

const Checkout = () => {
    const stripePromise = loadStripe('pk_test_51L4PWfLjrmUqnITL4TDtVJQQb9fne5taAj6AYMgv1WRYo6WqERdQ2bxlLgMjNTV3HQQq2fAcBpDPi4GbYkLLlQCa00Tltuz0Tl');

    return (
        <div>
            <PageTitle title='Checkout'></PageTitle>
            <h2 className='text-center'>Checkout page</h2>

            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>

                <div>
                    <OrderSummary></OrderSummary>
                </div>
            </div>
        </div>
    );
};

export default Checkout;