import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import { CUSTOMER_INFORMATION_CONTEXT } from '../../../../context/CustomerInformation';
import useShoppingCart from '../../../../hooks/useShoppingCart';
import { json, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import auth from '../../../../firebase.init';
import { toast } from 'react-toastify';
import './CheckoutForm.css';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const { details, setDetails } = useContext(CUSTOMER_INFORMATION_CONTEXT);
    const { cartData, grandTotal } = useShoppingCart();
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    const navigate = useNavigate('');
    useEffect(() => {
        if (!grandTotal || !details?.email) {
            navigate('/cart');
        } else {
            fetch(`http://localhost:5000/create-payment-intent`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({ grandTotal })
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        signOut(auth);
                        localStorage.removeItem('accessToken');
                        navigate('/login');
                    }
                    return res.json()
                })
                .then(data => {
                    if (data.clientSecret) {
                        setClientSecret(data.clientSecret);
                    }
                })
        }
    }, [details, grandTotal, navigate])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        };

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message);
        } else {
            setCardError("")
        }

        setProcessing(true);
        // confirm card payments 
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: details?.name,
                        email: details?.email
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message)
            console.log(error);
        }
        setProcessing(false);
        if (paymentIntent.status === "succeeded") {
            setTransactionId(paymentIntent.id);
            details.transactionId = paymentIntent.id;
            details.amount = grandTotal;
            details.order = cartData;
            details.date = new Date();
            details.status = 'Pending'

            // save the order to the database 
            fetch(`http://localhost:5000/orders`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(details)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        toast.info('Payment successful!');

                        fetch(`http://localhost:5000/temporaryData/${details.email}`, {
                            method: 'DELETE',
                        })
                            .then(res => res.json())
                            .then(data => {
                                // console.log(data);
                            })

                        setTimeout(() => {
                            navigate('/myOrders');
                        }, 10000);
                    }
                })
        }
    };

    return (
        <>
            <form className='p-2 border border-2 border-primary' onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-outline-dark mt-3' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>

            {cardError && <p className='text-danger'>{cardError}</p>}
            {transactionId && <p className='text-primary'>Transaction Id: {transactionId}</p>}
        </>
    );
};

export default CheckoutForm;